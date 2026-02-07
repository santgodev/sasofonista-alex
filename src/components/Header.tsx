
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Music } from "lucide-react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const NAV_ITEMS = [
    { label: "Inicio", href: "/" },
    { label: "Eventos", href: "/eventos" },
    { label: "Clases", href: "/clases" },
    { label: "Contacto", href: "/contacto" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    // Close mobile menu on route change
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setIsOpen(false), 0);
            return () => clearTimeout(timer);
        }
    }, [pathname, isOpen]);

    return (
        <header
            className={twMerge(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-background/95 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Music className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xl font-serif font-bold tracking-tight">
                            Alex Galindo
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={twMerge(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-zinc-400"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/contacto"
                            className="px-5 py-2 rounded-full bg-primary text-background text-sm font-bold hover:brightness-110 transition-all"
                        >
                            Contratar
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-zinc-400 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-white/5 p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={twMerge(
                                "py-2 px-4 rounded-lg text-base font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/contacto"
                        className="mt-2 w-full py-3 rounded-lg bg-primary text-background text-center font-bold"
                    >
                        Contratar
                    </Link>
                </div>
            )}
        </header>
    );
}
