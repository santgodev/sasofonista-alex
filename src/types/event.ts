
export interface Event {
    id: string;
    title: string;
    description: string;
    icon?: string; // Icon identifier
    priceRange?: string;
    image?: string;
    features: string[];
}
