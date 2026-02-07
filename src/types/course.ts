
export interface Course {
    id: string;
    title: string;
    instrument: 'Saxofón';
    level: 'Principiante' | 'Intermedio' | 'Avanzado';
    description: string;
    image?: string;
    features: string[];
}
