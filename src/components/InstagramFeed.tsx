"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Play, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";

const instagramItems = [
    {
        id: 1,
        type: "video",
        image: "/iloveimg-converted/bio.jpg",
        likes: "1.2k",
        comments: "48",
        size: "large", // Bento size
    },
    {
        id: 2,
        type: "image",
        image: "/iloveimg-converted/bodas.jpg",
        likes: "850",
        comments: "24",
        size: "small",
    },
    {
        id: 3,
        type: "video",
        image: "/iloveimg-converted/portada_cumpleaños.jpg",
        likes: "2.5k",
        comments: "112",
        size: "medium",
    },
    {
        id: 4,
        type: "video",
        image: "/iloveimg-converted/duo_pianista.jpg",
        likes: "1.8k",
        comments: "65",
        size: "small",
    },
    {
        id: 5,
        type: "image",
        image: "/iloveimg-converted/portada_boda.jpg",
        likes: "920",
        comments: "31",
        size: "medium",
    },
    {
        id: 6,
        type: "video",
        image: "/iloveimg-converted/saxo_venta_2.jpg",
        likes: "3.1k",
        comments: "156",
        size: "small",
    }
];

export function InstagramFeed() {
    return (
        <Section className="bg-black py-24 md:py-32 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16 md:mb-24 space-y-6">
                    <div className="flex items-center justify-center gap-2 text-primary animate-in fade-in slide-in-from-bottom duration-1000">
                        <Instagram className="w-5 h-5" />
                        <span className="text-xs font-bold tracking-[0.3em] uppercase">Vívelo en Directo</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                        Más allá de la <span className="text-primary italic font-light">Pantalla</span>
                    </h2>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
                        Únete a miles de seguidores y descubre el detrás de escena, nuevos lanzamientos y la energía de cada evento minuto a minuto.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:grid-rows-2 lg:h-[800px]">
                    {instagramItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`group relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 transition-all duration-700 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] animate-in fade-in zoom-in duration-1000 ${item.size === "large" ? "col-span-2 row-span-2 aspect-square md:aspect-auto" :
                                    item.size === "medium" ? "col-span-2 aspect-[16/9] md:aspect-auto" :
                                        "col-span-1 aspect-square md:aspect-auto"
                                }`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <Image
                                src={item.image}
                                alt={`Instagram content ${item.id}`}
                                fill
                                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 group-hover:rotate-1"
                            />

                            {/* Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                            {/* Type Indicator */}
                            {item.type === "video" && (
                                <div className="absolute top-4 right-4 z-10 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white">
                                    <Play className="w-3 h-3 fill-current" />
                                </div>
                            )}

                            {/* Hover Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                <div className="flex items-center gap-6 text-white font-medium">
                                    <div className="flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-primary fill-primary" />
                                        <span>{item.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5" />
                                        <span>{item.comments}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Branding Overlay (Subtle) */}
                            <div className="absolute top-4 left-4 z-10 opacity-40 group-hover:opacity-100 transition-opacity">
                                <Instagram className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final CTA */}
                <div className="mt-16 md:mt-24 text-center">
                    <Link
                        href="https://www.instagram.com/saxofonistaalexgalindo/"
                        target="_blank"
                        className="inline-block group"
                    >
                        <Button
                            as="div"
                            size="lg"
                            className="h-16 px-10 text-lg bg-white text-black hover:bg-primary hover:text-black transition-all duration-500 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                        >
                            Ver contenido real en Instagram
                        </Button>
                    </Link>
                    <p className="mt-6 text-zinc-500 text-sm font-medium uppercase tracking-widest">
                        @saxofonistaalexgalindo
                    </p>
                </div>
            </div>
        </Section>
    );
}
