
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Reusing auth from env
const getAuth = () => {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    // Safety check
    if (!clientEmail || !privateKey) {
        throw new Error('Manage Route: Credentials missing');
    }

    const auth = new google.auth.GoogleAuth({
        credentials: { client_email: clientEmail, private_key: privateKey },
        scopes: ['https://www.googleapis.com/auth/calendar.events'],
    });
    return auth;
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('id');
    const action = searchParams.get('action'); // 'confirm' | 'reject'
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!eventId || !action || !calendarId) {
        return new NextResponse('Error: Faltan parámetros (id, action o configuration)', { status: 400 });
    }

    try {
        const auth = getAuth();
        const calendar = google.calendar({ version: 'v3', auth });

        if (action === 'confirm') {
            const currentEvent = await calendar.events.get({ calendarId, eventId });
            if (!currentEvent.data) {
                return new NextResponse('Evento no encontrado (ya eliminado?)', { status: 404 });
            }

            await calendar.events.patch({
                calendarId,
                eventId,
                requestBody: {
                    status: 'confirmed',
                    summary: currentEvent.data.summary?.replace('[TENTATIVO]', '[CONFIRMADO]') || 'Evento Confirmado',
                    colorId: '10', // Basil (Green)
                    transparency: 'opaque'
                }
            });

            return new NextResponse(`
            <html>
                <body style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #f0fdf4;">
                    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                        <h1 style="color: #166534; margin-bottom: 20px;">¡Evento Confirmado! ✅</h1>
                        <p style="color: #374151; font-size: 18px;">El evento ha sido marcado exitosamente como <strong>confirmado</strong> en tu calendario.</p>
                        <p style="margin-top: 30px; color: #6b7280;">Ya puedes cerrar esta ventana.</p>
                    </div>
                </body>
            </html>
        `, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        }

        else if (action === 'reject') {
            await calendar.events.delete({
                calendarId,
                eventId
            });

            return new NextResponse(`
            <html>
                <body style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #fef2f2;">
                    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                        <h1 style="color: #991b1b; margin-bottom: 20px;">Evento Eliminado 🗑️</h1>
                        <p style="color: #374151; font-size: 18px;">La reserva tentativa ha sido eliminada del calendario correctamente.</p>
                        <p style="margin-top: 30px; color: #6b7280;">Ya puedes cerrar esta ventana.</p>
                    </div>
                </body>
            </html>
        `, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        }

        return new NextResponse('Acción no reconocida', { status: 400 });

    } catch (error) {
        console.error('Manage Route Error:', error);
        // @ts-ignore
        const msg = error.message || 'Error desconocido';
        return new NextResponse(`Error procesando solicitud: ${msg}`, { status: 500 });
    }
}
