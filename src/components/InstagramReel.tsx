"use client";

import { useState } from "react";
import { Instagram, Play, Quote, Sparkles } from "lucide-react";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
/**
 * InstagramReel (Premium Edition)
 * 
 * Strategy:
 * 1. Visual Storytelling: A compelling side text emphasizing quality and emotion.
 * 2. Interaction: Seamless in-place video playback for better engagement.
 * 3. Centered Layout: Maximizing focus on the recommendation content.
 */
export function InstagramReel() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoUrl = "https://pub-894a082164c648aabd3e99a6d36e8f49.r2.dev/alex-recomendacion.mp4";



    return (
        <Section className="bg-zinc-950 py-12 md:py-20 overflow-hidden border-t border-white/5 relative">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none opacity-50" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 items-center">

                    {/* Video Column */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center order-2 md:order-1">
                        <div className="relative w-full max-w-[280px]">
                            <div
                                className={`relative w-full aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-zinc-900 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8)] group border border-white/10 ring-1 ring-white/5 ring-inset transition-all duration-700 ${!isPlaying ? "cursor-pointer" : ""}`}
                                onClick={() => !isPlaying && setIsPlaying(true)}
                            >
                                {!isPlaying ? (
                                    <>
                                        {/* Cinematic Cover Image */}
                                        <div className="absolute inset-0 z-10 overflow-hidden">
                                            <img
                                                src="/portada-recomendacion.jpg"
                                                alt="Alex Galindo Saxofonista"
                                                className="w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-90 transition-all duration-[1.5s] ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                                        </div>

                                        {/* Play Interaction Overlay */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                                            <div className="relative">
                                                <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-20 group-hover:opacity-40" />
                                                <div className="relative p-5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 text-white transform group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-2xl">
                                                    <Play className="w-8 h-8 fill-current translate-x-0.5" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                                            <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2">
                                                <Play className="w-3 h-3 text-primary fill-current" />
                                                <span className="text-[8px] font-bold tracking-widest text-white uppercase">Video</span>
                                            </div>
                                        </div>

                                        <div className="absolute top-6 left-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 group-hover:translate-x-0">
                                            <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                                                <Instagram className="w-4.5 h-4.5" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 bg-black animate-in fade-in duration-1000">
                                        <video
                                            src={videoUrl}
                                            className="w-full h-full object-cover"
                                            controls
                                            autoPlay
                                            playsInline
                                            poster="/portada-recomendacion.jpg"
                                            title="Video de recomendación - Alex Galindo"
                                        >
                                            <track kind="captions" src="data:text/vtt;base64,V0VCVlRU" label="Sin sonido" />
                                        </video>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Instagram Button */}
                        <div className="mt-8 md:hidden w-full">
                            <Button
                                onClick={() => window.open(`https://www.instagram.com/saxofonistaalexgalindo/`, '_blank')}
                                size="lg"
                                variant="outline"
                                className="w-full rounded-full border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all duration-700 h-14 px-10 text-[10px] font-bold tracking-[0.3em]"
                            >
                                <Instagram className="w-3.5 h-3.5 mr-2.5" />
                                EXPLORAR INSTAGRAM
                            </Button>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="md:col-span-7 space-y-6 md:space-y-8 text-center md:text-left order-1 md:order-2">
                        <div className="space-y-3 md:space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/70">Recomendaciones</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
                                Momentos que <br />
                                <span className="text-primary italic font-light">Permanecen</span>
                            </h2>

                        </div>

                        {/* Testimonial */}
                        <div className="hidden md:block relative group">
                            <Quote className="absolute -top-6 -left-4 w-10 h-10 text-primary/10 transition-transform duration-700 group-hover:scale-110" />
                            <blockquote className="text-lg md:text-xl font-light text-zinc-300 leading-relaxed italic border-l-[2px] border-primary/40 pl-6 py-1">
                                &quot;La calidad y la elegancia que Alex aporta es insuperable. Su música no solo se escucha, se siente en todo el ambiente.&quot;
                            </blockquote>
                            <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
                                <div className="h-px w-6 bg-primary/30" />
                                <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Testimonio Real</span>
                            </div>
                        </div>

                        <div className="pt-2 hidden md:block">
                            <Button
                                onClick={() => window.open(`https://www.instagram.com/saxofonistaalexgalindo/`, '_blank')}
                                size="lg"
                                variant="outline"
                                className="rounded-full border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all duration-700 h-14 px-10 text-[10px] font-bold tracking-[0.3em]"
                            >
                                <Instagram className="w-3.5 h-3.5 mr-2.5" />
                                EXPLORAR INSTAGRAM
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}

