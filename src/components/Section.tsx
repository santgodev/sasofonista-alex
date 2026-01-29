
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    fullWidth?: boolean;
}

export function Section({ children, className, id, fullWidth = false }: SectionProps) {
    return (
        <section
            id={id}
            className={twMerge("py-16 md:py-24 relative overflow-hidden", className)}
        >
            <div className={twMerge("mx-auto px-4 sm:px-6 lg:px-8", !fullWidth && "max-w-7xl")}>
                {children}
            </div>
        </section>
    );
}
