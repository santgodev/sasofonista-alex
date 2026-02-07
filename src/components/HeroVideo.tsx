"use client";

import { useEffect, useState, useRef } from "react";

interface HeroVideoProps {
    desktopVideoUrl?: string;
    mobileVideoUrl?: string;
    posterUrl?: string;
}

export function HeroVideo({
    desktopVideoUrl = "https://your-bucket.com/hero-desktop.mp4", // Placeholder
    mobileVideoUrl = "https://your-bucket.com/hero-mobile.mp4",   // Placeholder
    posterUrl = "/images/saxo.webp"                               // Placeholder
}: HeroVideoProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [videoSrc, setVideoSrc] = useState("");
    const [isReady, setIsReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.matchMedia("(max-width: 768px)").matches;
            setIsMobile(mobile);
            setVideoSrc(mobile ? mobileVideoUrl : desktopVideoUrl);
            setIsReady(false); // Reset ready state when source changes
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [desktopVideoUrl, mobileVideoUrl]);

    return (
        <div className="absolute inset-0 bg-black">
            {/* Background Video */}
            {videoSrc && (
                <video
                    ref={videoRef}
                    key={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={posterUrl}
                    onCanPlay={() => setIsReady(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${isReady ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
            )}

            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10" />
        </div>
    );
}
