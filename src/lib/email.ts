
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Or generic SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailParams) => {
  try {
    const info = await transporter.sendMail({
      from: `"Alex Saxofonista" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw for email failures to avoid crashing the whole user flow if possible, 
    // but knowing it failed is important. 
    // Let's log and rethrow so the API handles it.
    throw error;
  }
};

export const templates = {
  clientConfirmation: (name: string, date: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>¡Solicitud Recibida!</h1>
      <p>Hola ${name},</p>
      <p>He recibido tu solicitud para la fecha <strong>${date}</strong>.</p>
      <p>He marcado esta fecha como <strong>TENTATIVA</strong> en mi calendario mientras reviso los detalles.</p>
      <p>En breve me pondré en contacto contigo para confirmar disponibilidad final y detalles.</p>
      <br>
      <p>Gracias por tu interés en mi música.</p>
      <p>Atte. Alex Saxofonista</p>
    </div>
  `,

  musicianNotification: (name: string, email: string, date: string, subject: string, message: string, eventId: string) => `
    <div style="font-family: sans-serif;">
      <h2>Nueva Solicitud de Evento</h2>
      <p><strong>Fecha:</strong> ${date}</p>
      <p><strong>Cliente:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <p><strong>Mensaje:</strong></p>
      <blockquote style="background: #f4f4f4; padding: 10px; border-left: 4px solid #ccc;">
        ${message}
      </blockquote>
      <div style="margin-top: 20px; padding: 15px; background: #eef; border-radius: 5px;">
        <h3>Acciones Rápidas:</h3>
        <p>¿Qué quieres hacer con este evento?</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/events/manage?id=${eventId}&action=confirm" 
           style="background: green; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; margin-right: 10px;">
           Confirmar Evento
        </a>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/events/manage?id=${eventId}&action=reject" 
           style="background: red; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
           Rechazar/Eliminar
        </a>
      </div>
    </div>
  `,

  dateUnavailable: (name: string, date: string, alternatives: string[]) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Fecha No Disponible</h1>
      <p>Hola ${name},</p>
      <p>Lamentablemente, la fecha que solicitaste (<strong>${date}</strong>) ya está reservada.</p>
      ${alternatives.length > 0 ? `
        <p>Sin embargo, aquí tengo algunas fechas cercanas disponibles este mismo mes:</p>
        <ul>
          ${alternatives.map(d => `<li>${d}</li>`).join('')}
        </ul>
      ` : '<p>Por favor contáctame directamente para buscar otras opciones.</p>'}
      <p>Espero que podamos encontrar otro momento.</p>
      <p>Atte. Alex Saxofonista</p>
    </div>
  `
};
