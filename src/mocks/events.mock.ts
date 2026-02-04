
import { Event } from "@/types/event";

export const EVENTS: Event[] = [
    {
        id: "weddings",
        title: "Bodas y Ceremonias",
        description: "Música elegante y emotiva para tu día especial. Desde la entrada hasta el cóctel.",
        priceRange: "Desde $300",
        image: "/iloveimg-converted/bodas.jpg",
        features: [
            "Repertorio personalizado",
            "Equipo de sonido propio",
            "Vestimenta formal",
            "Hasta 2 horas de música"
        ]
    },
    {
        id: "cocktails",
        title: "Cócteles y Cenas",
        description: "Ambiente sofisticado con Jazz, Bossa Nova y Pop suave.",
        priceRange: "Desde $250",
        image: "/iloveimg-converted/saxo_venta_2.jpg",
        features: [
            "Música de fondo ideal",
            "Adaptable al ambiente",
            "Jazz Standards & Pop Cover",
            "Perfecto para restaurantes"
        ]
    },
    {
        id: "private",
        title: "Eventos Privados",
        description: "Cumpleaños, aniversarios o reuniones exclusivas.",
        priceRange: "A consultar",
        features: [
            "Show interactivo opcional",
            "Flexibilidad de horarios",
            "Canciones a petición"
        ]
    }
];
