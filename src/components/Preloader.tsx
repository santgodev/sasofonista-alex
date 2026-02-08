"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
    isReady: boolean;
}

export function Preloader({ isReady }: PreloaderProps) {
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (isReady) {
            const timeout = setTimeout(() => {
                setShouldRender(false);
            }, 400); // Wait for fade out animation
            return () => clearTimeout(timeout);
        }

        // Safety timeout in case video loading fails or takes too long
        const safetyTimeout = setTimeout(() => {
            setShouldRender(false);
        }, 2500);

        return () => clearTimeout(safetyTimeout);
    }, [isReady]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${isReady ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >
            <div className="flex flex-col items-center">
                {/* Minimalist Logo/Name Animation */}
                <div className="relative">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-[0.3em] uppercase animate-pulse">
                        Alex Galindo
                    </h2>
                    <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />
                </div>
                <div className="mt-8">
                    <div className="w-12 h-[2px] bg-zinc-800 overflow-hidden rounded-full">
                        <div className="w-full h-full bg-primary origin-left animate-loading-bar" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: scaleX(0); opacity: 0; }
                    50% { transform: scaleX(1); opacity: 1; }
                    100% { transform: scaleX(0); opacity: 0; }
                }
                @keyframes loading-bar {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2.5s infinite;
                }
                .animate-loading-bar {
                    animation: loading-bar 1.5s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
}
