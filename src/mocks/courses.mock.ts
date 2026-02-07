
import { Course } from "@/types/course";

export const COURSES: Course[] = [
    {
        id: "sax-beginner",
        title: "Saxofón - Iniciación",
        instrument: "Saxofón",
        level: "Principiante",
        description: "Aprende desde cero: embocadura, respiración y tus primeras melodías. Ideal para quienes nunca han tocado.",
        image: "/iloveimg-converted/clases_saxo.jpg",
        features: ["Lectura musical básica", "Técnica de respiración", "Material incluido"]
    },
    {
        id: "sax-intermediate",
        title: "Saxofón - Intermedio",
        instrument: "Saxofón",
        level: "Intermedio",
        description: "Perfecciona tu sonido, improvisación y técnica. Expande tu repertorio con standars de Jazz y Pop.",
        image: "/iloveimg-converted/saxo_venta_2.jpg",
        features: ["Improvisación Básica", "Escalas y Modos", "Repertorio Moderno"]
    },
    {
        id: "sax-advanced",
        title: "Saxofón - Avanzado",
        instrument: "Saxofón",
        level: "Avanzado",
        description: "Domina el altísimo, la técnica extendida y encuentra tu propio estilo musical profesional.",
        image: "/iloveimg-converted/portada_cumpleaños.jpg", // Using updated high-quality asset
        features: ["Técnica Extendida", "Lenguaje de Jazz", "Preparación Profesional"]
    }
];
