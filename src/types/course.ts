
export interface Course {
    id: string;
    title: string;
    instrument: 'Saxofón' | 'Piano' | 'Canto';
    level: 'Principiante' | 'Intermedio' | 'Avanzado';
    description: string;
    image?: string;
    price?: string; // Optional price to show or 'Consultar'
    features: string[];
}
