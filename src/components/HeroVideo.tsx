
"use client";

import { useRef, useEffect } from "react";

export function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            // Loop back to start if we exceed 18 seconds
            if (video.currentTime >= 18) {
                video.currentTime = 0;
                video.play();
            }
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
        >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
    );
}
