
import { NextResponse } from 'next/server';
import { sendEmail, templates as emailTemplates } from '@/lib/email';
import { checkAvailability, createTentativeEvent, getAlternativeDates } from '@/lib/google';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message, date, time } = body;

        // Basic validation
        if (!name || !email || !message || !date || !time) {
            return NextResponse.json(
                { success: false, message: 'Todos los campos son requeridos, incluyendo fecha y hora.' },
                { status: 400 }
            );
        }

        // 1. Check Availability with time logic
        const availability = await checkAvailability(date, time);

        if (!availability.available) {
            const alternativeDates = await getAlternativeDates(date);

            // Send email suggesting alternatives
            await sendEmail({
                to: email,
                subject: 'Fecha no disponible - Alex Saxofonista',
                html: emailTemplates.dateUnavailable(name, date, alternativeDates)
            });

            // Notify admin about rejection
            await sendEmail({
                to: process.env.EMAIL_USER!,
                subject: 'Nueva Solicitud RECHAZADA (Agenda llena o conflicto)',
                html: emailTemplates.musicianNotification(name, email, `${date} ${time}`, subject, `[RECHAZADO AUTOMÁTICAMENTE: ${availability.reason}]\n\n${message}`, 'NO_ID')
            });

            return NextResponse.json({
                success: false,
                status: 'busy',
                message: `Lo sentimos, esa fecha/hora no está disponible: ${availability.reason}`,
                alternatives: alternativeDates
            });
        }
        // 2. Create Tentative Event
        // It returns the event object, which contains the ID
        const event = await createTentativeEvent(date, { name, email, subject, message, time });

        // 3. Send Confirmation Email to Client
        await sendEmail({
            to: email,
            subject: 'Solicitud Recibida - Alex Saxofonista',
            html: emailTemplates.clientConfirmation(name, date)
        });

        // 4. Send Notification to Musician (Admin) with Management Links
        if (event.id) {
            await sendEmail({
                to: process.env.EMAIL_USER!,
                subject: 'Nueva Solicitud de Reserva',
                html: emailTemplates.musicianNotification(name, email, `${date} ${time}`, subject, message, event.id)
            });
        }

        return NextResponse.json({
            success: true,
            status: 'confirmed',
            message: 'Solicitud recibida. Hemos bloqueado tu horario tentativamente mientras revisamos.'
        });

    } catch (error) {
        console.error('API Contact Error:', error);
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor al procesar la solicitud.' },
            { status: 500 }
        );
    }
}
