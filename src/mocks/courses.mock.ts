
import { Course } from "@/types/course";

export const COURSES: Course[] = [
    {
        id: "sax-beginner",
        title: "Saxofón - Iniciación",
        instrument: "Saxofón",
        level: "Principiante",
        description: "Aprende desde cero: embocadura, respiración y tus primeras melodías.",
        image: "/images/saxofonista.png",
        features: ["Lectura musical básica", "Técnica de respiración", "Material incluido"]
    },
    {
        id: "piano-basic",
        title: "Piano Funcional",
        instrument: "Piano",
        level: "Principiante",
        description: "Piano para acompañamiento y comprensión armónica.",
        image: "/images/piano.png",
        features: ["Acordes básicos", "Acompañamiento de canciones", "Teoría aplicada"]
    },
    {
        id: "vocals-tech",
        title: "Técnica Vocal",
        instrument: "Canto",
        level: "Intermedio",
        description: "Mejora tu proyección, afinación y salud vocal.",
        image: "/images/canto.png",
        features: ["Ejercicios de calentamiento", "Repertorio moderno", "Salud vocal"]
    }
];
