"use client";

import { useEffect, useState } from "react";
import { X, Instagram, Play } from "lucide-react";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    reelId?: string;
    videoUrl?: string;
}

export function VideoModal({ isOpen, onClose, reelId, videoUrl }: VideoModalProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);


    if (!isOpen && !isMounted) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            {/* Backdrop with extreme blur and dark glass effect */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`relative w-full max-w-sm aspect-[9/16] bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 transition-transform duration-500 ease-out ${isOpen ? "scale-100 translate-y-0" : "scale-90 translate-y-10"
                    }`}
            >
                {/* Header Controls */}
                <div className="absolute top-6 right-6 z-50">
                    <button
                        onClick={onClose}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="absolute top-8 left-8 z-50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 backdrop-blur-md">
                        {videoUrl ? (
                            <Play className="w-4 h-4 text-primary fill-current" />
                        ) : (
                            <Instagram className="w-4 h-4 text-primary" />
                        )}
                    </div>
                </div>


                {/* Video Container */}
                <div className="absolute inset-0 bg-black">
                    {videoUrl ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <video
                                src={videoUrl}
                                className="w-full h-full object-cover"
                                controls
                                autoPlay
                                playsInline
                                title="Video en pantalla completa"
                            >
                                <track kind="captions" src="data:text/vtt;base64,V0VCVlRU" label="Sin sonido" />
                            </video>
                        </div>
                    ) : reelId ? (
                        <div className="absolute top-[-52px] bottom-[-162px] left-[-2px] right-[-2px]">
                            <iframe
                                src={`https://www.instagram.com/reel/${reelId}/embed/?captioned=0`}
                                className="w-full h-full border-0"
                                allowTransparency={true}
                                scrolling="no"
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            />
                        </div>
                    ) : null}
                    {/* Hard Blocks to prevent any UI leaks during scroll/load */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                    {/* Corner branding disguise / Loading */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10 bg-zinc-950">
                        <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                    </div>
                </div>
            </div>
        </div>
    );
}
