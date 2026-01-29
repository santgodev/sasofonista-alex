"use client";

import { useEffect, useRef, useState } from "react";

export function HeroCinematic() {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="absolute inset-0 bg-black">
            <video
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                autoPlay
                muted
                loop
                playsInline
                poster="/hero/frame_000.jpg"
                onLoadedData={() => setIsLoaded(true)}
            >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Fallback/Poster overlay while video loads (fade out) */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-1000 z-10 ${isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                style={{
                    backgroundImage: "url('/hero/frame_000.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />

            <div className="absolute inset-0 bg-black/40 z-20" />
        </div>
    );
}
