import emailjs from '@emailjs/browser';

// Tip: Move these to .env.local for development, but they need to be public in the code 
// for a truly static site (or configured in the Dashboard of EmailJS and just referenced here).
// Since this is a client-side library, keys ARE exposed. 
// EmailJS has "Whitelisting" features to protect usage.

const SERVICE_ID = 'YOUR_SERVICE_ID'; // Reemplazar con ID de EmailJS
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Reemplazar con ID de Template
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Reemplazar con Public Key

interface EmailParams {
  to_name: string;
  to_email: string;
  message: string;
  date?: string;
  subject?: string;
}

export const sendEmail = async ({ to_name, to_email, message, date = '', subject = 'Nuevo Mensaje' }: EmailParams) => {
  try {
    const templateParams = {
      to_name,
      to_email,
      message,
      date,
      subject,
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    return response;
  } catch (error) {
    console.error('Error sending email via EmailJS:', error);
    throw error;
  }
};
