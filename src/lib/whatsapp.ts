export const PHONE_NUMBER = "573132863989";

export const getWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
};

export const WHATSAPP_MESSAGES = {
    hero: "Hola Alex, estoy interesado en tus servicios de saxofón en vivo.",
    wedding: "Hola Alex, estoy interesado en tus servicios para una Boda.",
    corporate: "Hola Alex, estoy interesado en tus servicios para un Evento Corporativo.",
    birthday: "Hola Alex, estoy interesado en tus servicios para un Cumpleaños.",
    proposal: "Hola Alex, estoy interesado en tus servicios para una Pedida de Mano.",
    duo: "Hola Alex, estoy interesado en tus servicios de Dúo Saxo & Piano.",
    academy: "Hola Alex, estoy interesado en tus servicios de clases de música.",
    general: "Hola Alex, estoy interesado en tus servicios."
};
