"use client";

import { useState, useRef } from "react";


interface HeroVideoProps {
    videoUrl?: string;
    desktopVideoUrl?: string;
    mobileVideoUrl?: string;
    posterUrl?: string;
    onReady?: () => void;
}

export function HeroVideo({
    videoUrl,
    desktopVideoUrl,
    mobileVideoUrl,
    posterUrl = "/hero/frame_000.jpg",
    onReady
}: HeroVideoProps) {
    const [isReady, setIsReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleReady = () => {
        if (!isReady) {
            setIsReady(true);
            onReady?.();
        }
    };

    // Check if video is already ready (cached)
    useState(() => {
        if (typeof window !== 'undefined' && videoRef.current?.readyState && videoRef.current.readyState >= 3) {
            handleReady();
        }
    });

    return (
        <div className="absolute inset-0 bg-black">
            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                // @ts-ignore - fetchPriority is supported but might not be in all TS types yet
                fetchPriority="high"
                preload="auto"
                poster={posterUrl}
                onLoadedData={handleReady}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ${isReady ? "opacity-100" : "opacity-0"
                    }`}
            >
                {/* Desktop: Screens >= 768px */}
                <source src={desktopVideoUrl} media="(min-width: 768px)" type="video/mp4" />
                {/* Mobile: Default fallback */}
                <source src={mobileVideoUrl} type="video/mp4" />
                <track kind="captions" src="data:text/vtt;base64,V0VCVlRU" label="Sin sonido" />
            </video>


            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10" />
        </div>
    );
}
