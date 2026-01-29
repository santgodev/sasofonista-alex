
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'];

// Helper to get authenticated client
const getAuth = () => {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    // Handle literal \n or actual newlines just in case
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!clientEmail || !privateKey || !calendarId) {
        throw new Error('Google Calendar credentials missing in environment');
    }

    // Extract project ID from email to help GoogleAuth
    const projectId = clientEmail.split('@')[1].split('.')[0];

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: clientEmail,
            private_key: privateKey,
            project_id: projectId
        },
        projectId: projectId,
        scopes: SCOPES,
    });

    return { auth, calendarId };
};


export const checkAvailability = async (dateStr: string, timeStr?: string): Promise<{ available: boolean; reason?: string; type?: 'tentative' | 'confirmed' }> => {
    try {
        const { auth, calendarId } = getAuth();
        const calendar = google.calendar({ version: 'v3', auth });

        // Use a fixed offset for Colombia/Peru (UTC-5) to align logic
        //Ideally this should be an env var (TIMEZONE_OFFSET='-05:00')
        const TZ_OFFSET = '-05:00';

        // Widen the search window to catch events that shift to next day in UTC
        // Start from yesterday 12pm to tomorrow 12pm to cover all shifts
        const searchStart = new Date(dateStr);
        searchStart.setDate(searchStart.getDate() - 1);

        const searchEnd = new Date(dateStr);
        searchEnd.setDate(searchEnd.getDate() + 2);

        const response = await calendar.events.list({
            calendarId,
            timeMin: searchStart.toISOString(),
            timeMax: searchEnd.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items || [];
        const activeEvents = events.filter(e => e.status === 'confirmed' || e.status === 'tentative');
        // activeEvents contains yesterday, today, tomorrow (due to widened search)
        // We need to Count ONLY events that start on the requested date for the "Max 3" rule.

        const targetDateStart = new Date(dateStr);
        targetDateStart.setHours(0, 0, 0, 0);
        const targetDateEnd = new Date(dateStr);
        targetDateEnd.setHours(23, 59, 59, 999);

        // Filter for counting: Events that START within the target day (Local Time approx)
        // Since we get ISO strings, we need to be careful with TimeZones.
        // If the event string has offset (e.g. -05:00), we can trust it.
        // Let's rely on string comparison of the date part IF the format is YYYY-MM-DDT...
        // Or compare timestamps.
        const eventsOnTargetDay = activeEvents.filter(e => {
            if (e.start?.date) return e.start.date === dateStr; // All day check
            if (e.start?.dateTime) {
                const d = new Date(e.start.dateTime);
                return d >= targetDateStart && d <= targetDateEnd;
            }
            return false;
        });

        // RULE 1: Max 3 events per day (Strictly for THIS day)
        if (eventsOnTargetDay.length >= 3) {
            return { available: false, reason: 'La agenda para este día está llena (máximo 3 eventos permitidos).', type: 'confirmed' };
        }

        if (!timeStr) {
            return { available: true };
        }

        // RULE 2 & 3: Time Buffer (1.5 hours) & Overlaps
        const EVENT_DURATION_HOURS = 2;
        const BUFFER_HOURS = 1.5;

        // Construct Date objects for the NEW event with Explicit Offset
        // This creates an absolute time correctly aligned to -05:00
        // "2025-12-17" + "T" + "21:21" + ":00" + "-05:00"
        const newEventStart = new Date(`${dateStr}T${timeStr}:00${TZ_OFFSET}`);
        const newEventEnd = new Date(newEventStart.getTime() + EVENT_DURATION_HOURS * 60 * 60 * 1000);

        let conflictReason = '';
        let conflictType: 'tentative' | 'confirmed' | undefined = undefined;

        const hasConflict = activeEvents.some(event => {
            // Assume all-day events block the whole day - BUT only if they are on the same day!
            if (event.start?.date) {
                if (event.start.date === dateStr) {
                    conflictReason = 'Hay un evento de día completo reservado para esta fecha.';
                    conflictType = event.status as 'tentative' | 'confirmed';
                    return true;
                }
                // If it's an all-day event on another day (yesterday/tomorrow), it doesn't block TODAY.
                return false;
            }

            if (!event.start?.dateTime || !event.end?.dateTime) return false;

            const existingStart = new Date(event.start.dateTime);
            const existingEnd = new Date(event.end.dateTime);

            // 1. Strict Overlap
            if (newEventStart < existingEnd && newEventEnd > existingStart) {
                conflictReason = `Se cruza con otro horario reservado (${event.status === 'tentative' ? 'Tentativo' : 'Confirmado'}).`;
                conflictType = event.status as 'tentative' | 'confirmed';
                return true;
            }

            // 2. Buffer Check
            // If New is AFTER Existing
            if (newEventStart >= existingEnd) {
                const gapMs = newEventStart.getTime() - existingEnd.getTime();
                const gapHours = gapMs / (1000 * 60 * 60); // Convert ms to hours
                if (gapHours < BUFFER_HOURS) {
                    const requiredTime = new Date(existingEnd.getTime() + BUFFER_HOURS * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    conflictReason = `Debe haber 1.5h de espacio entre eventos. (${event.status === 'tentative' ? 'Hay una tentativa cercana' : 'Hay una reserva cercana'}).`;
                    conflictType = event.status as 'tentative' | 'confirmed';
                    return true;
                }
            }

            // If New is BEFORE Existing
            if (newEventEnd <= existingStart) {
                const gapMs = existingStart.getTime() - newEventEnd.getTime();
                const gapHours = gapMs / (1000 * 60 * 60);
                if (gapHours < BUFFER_HOURS) {
                    conflictReason = `Debe haber 1.5h de espacio antes del siguiente evento. (${event.status === 'tentative' ? 'Hay una tentativa cercana' : 'Hay una reserva cercana'}).`;
                    conflictType = event.status as 'tentative' | 'confirmed';
                    return true;
                }
            }

            return false;
        });

        if (hasConflict) {
            // Construct user friendly message based on type
            const statusMsg = conflictType === 'tentative'
                ? 'Ya existe una SOLICITUD TENTATIVA'
                : 'Ya existe una RESERVA CONFIRMADA';

            return {
                available: false,
                reason: `${statusMsg} que impide este horario. ${conflictReason}`,
                type: conflictType
            };
        }

        return { available: true };

    } catch (error) {
        console.error('Error checking availability:', error);
        return { available: false, reason: 'Error verificando disponibilidad' };
    }
};

export const createTentativeEvent = async (dateStr: string, details: { name: string; email: string; subject: string; message: string; time?: string }) => {
    const { auth, calendarId } = getAuth();
    const calendar = google.calendar({ version: 'v3', auth });

    let eventBody: any = {
        summary: `[TENTATIVO] ${details.subject} - ${details.name}`,
        description: `Estado: Pendiente\nCliente: ${details.name}\nEmail: ${details.email}\nMensaje: ${details.message}`,
        transparency: 'opaque',
    };

    if (details.time) {
        // Create Time-Based Event with Offset
        // "2025-12-17T21:21:00-05:00"
        // Google assumes implicit timezone if not provided, but sending Offset is safer.
        // Actually Google API 'dateTime' field accepts full ISO with offset.
        const TZ_OFFSET = '-05:00';
        const start = new Date(`${dateStr}T${details.time}:00${TZ_OFFSET}`);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours

        eventBody.start = { dateTime: start.toISOString() };
        eventBody.end = { dateTime: end.toISOString() };
    } else {
        // Fallback to All Day if no time provided (shouldn't happen with valid form)
        eventBody.start = { date: dateStr };
        eventBody.end = { date: dateStr };
    }

    try {
        const res = await calendar.events.insert({
            calendarId,
            requestBody: eventBody,
        });
        return res.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};


export const getAlternativeDates = async (dateStr: string): Promise<string[]> => {
    const alternatives: string[] = [];
    const targetDate = new Date(dateStr);
    // Helper to format YYYY-MM-DD
    const toISODate = (d: Date) => d.toISOString().split('T')[0];

    // We want to find closest 3 dates. We can check radius 1, radius 2, etc.
    // i.e. check target+1, target-1, target+2, target-2...
    let offset = 1;
    const maxOffset = 60; // Don't look further than 2 months
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    while (alternatives.length < 3 && offset <= maxOffset) {
        // Check Future (+offset)
        const futureDate = new Date(targetDate);
        futureDate.setDate(targetDate.getDate() + offset);

        // Check Past (-offset), but only if >= today
        const pastDate = new Date(targetDate);
        pastDate.setDate(targetDate.getDate() - offset);

        // Try Future
        if (alternatives.length < 3) {
            const dateString = toISODate(futureDate);
            try {
                // Check general availability for the day (no specific time)
                const result = await checkAvailability(dateString);
                if (result.available) {
                    alternatives.push(dateString);
                }
            } catch (e) {
                // Ignore error
            }
        }

        // Try Past
        if (alternatives.length < 3 && pastDate >= today) {
            const dateString = toISODate(pastDate);
            // Ensure we don't duplicate (unlikely with offset logic but good practice)
            if (!alternatives.includes(dateString)) {
                try {
                    const result = await checkAvailability(dateString);
                    if (result.available) {
                        alternatives.push(dateString);
                    }
                } catch (e) {
                    // Ignore
                }
            }
        }

        offset++;
    }

    // Sort slightly to make sure they look ordered? 
    // Usually people prefer "closest" first. The loop naturally finds closest.
    // But maybe mixing future/past looks chaotic? 
    // e.g. [Dec 21, Dec 19, Dec 22] 
    // It's fine, it shows "cercanas".
    return alternatives.sort(); // Sort chronologically for better reading
}

