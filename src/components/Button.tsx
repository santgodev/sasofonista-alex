import { ButtonHTMLAttributes, ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    as?: ElementType;
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    className,
    as: Component = "button",
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-full transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-background hover:brightness-110 active:scale-95 focus:ring-primary",
        outline: "border border-primary text-primary hover:bg-primary/10 active:scale-95 focus:ring-primary",
        ghost: "text-white hover:bg-white/10 active:scale-95 focus:ring-white",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <Component
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            {...props as any}
        >
            {children}
        </Component>
    );
}
