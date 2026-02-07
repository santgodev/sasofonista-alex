
import { Event } from "@/types/event";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export const EVENTS: Event[] = [
    {
        id: "bodas",
        title: "Bodas Exclusivas",
        description: "Desde la ceremonia hasta el cóctel. Música que acompaña cada emoción del día más importante.",
        image: "/iloveimg-converted/portada_boda.jpg",
        features: [
            "Repertorio personalizado",
            "Música para Ceremonia",
            "Música para Cóctel",
            "Música para Banquete"
        ],
        imagePosition: "center 20%",
        messageKey: WHATSAPP_MESSAGES.wedding
    },
    {
        id: "corporativos",
        title: "Eventos Corporativos",
        description: "Sofisticación para su marca. Un ambiente distinguido para lanzamientos, galas y networking.",
        image: "/iloveimg-converted/portada_evento_coorporativo.jpg",
        features: [
            "Galas de Premiación",
            "Lanzamientos de Marca",
            "Cenas Empresariales",
            "Networking"
        ],
        imagePosition: "85% top",
        messageKey: WHATSAPP_MESSAGES.corporate
    },
    {
        id: "duo",
        title: "Dúo Saxo & Piano",
        description: "La combinación perfecta de elegancia y ritmo. Un diálogo musical que cautiva a todos.",
        image: "/iloveimg-converted/portada_duo.jpg",
        features: [
            "Formato Exclusivo",
            "Jazz Lounge",
            "Repertorio Internacional",
            "Ideal para Cenas"
        ],
        imagePosition: "center 20%",
        messageKey: WHATSAPP_MESSAGES.duo
    },
    {
        id: "pedidas",
        title: "Pedidas de Mano",
        description: "El 'Sí, quiero' merece una banda sonora inolvidable. Intimidad y romanticismo puro.",
        image: "/iloveimg-converted/bodas.jpg",
        features: [
            "Momento Sorpresa",
            "Canción Especial",
            "Ambiente Romántico",
            "Video del Momento"
        ],
        messageKey: WHATSAPP_MESSAGES.proposal
    },
    {
        id: "cumpleanos",
        title: "Cumpleaños y Grados",
        description: "Eleva tu celebración con la energía del saxo en vivo. Pop, House, y éxitos actuales.",
        image: "/iloveimg-converted/saxo_venta.jpg",
        features: [
            "Fiesta y Energía",
            "Show en Vivo",
            "Interacción con invitados",
            "Repertorio Moderno"
        ],
        imagePosition: "center top",
        messageKey: WHATSAPP_MESSAGES.birthday
    }
];
