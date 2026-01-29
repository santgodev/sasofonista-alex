"use client";

import Image from "next/image";
import { Button } from "@/components/Button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function EventCatalog() {
    const events = [
        {
            title: "Bodas Exclusivas",
            description: "Desde la ceremonia hasta el cóctel. Música que acompaña cada emoción del día más importante.",
            image: "/images/matrimonio.png",
            tags: ["Ceremonia", "Cóctel", "Banquete"]
        },
        {
            title: "Eventos Corporativos",
            description: "Sofisticación para su marca. Un ambiente distinguido para lanzamientos, galas y networking.",
            image: "/images/piano.png",
            tags: ["Galas", "Lanzamientos", "Cenas"]
        },
        {
            title: "Fiestas Privadas",
            description: "Eleva tu celebración con la energía del saxo en vivo. Pop, House, Jazz y éxitos actuales.",
            image: "/images/saxo.png",
            tags: ["Cumpleaños", "Aniversarios", "Rooftops"]
        },
        {
            title: "Pedidas de Mano",
            description: "El 'Sí, quiero' merece una banda sonora inolvidable. Intimidad y romanticismo puro.",
            image: "/images/canto.png",
            tags: ["Romántico", "Sorpresa", "Íntimo"]
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {events.map((event, idx) => (
                <div key={idx} className="group relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl cursor-pointer">
                    <Image
                        src={event.image}
                        alt={`${event.title} - Saxofonista Alex Galindo Bogotá`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={90}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {event.tags.map((tag, tIdx) => (
                                <span key={tIdx} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white border border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight">
                            {event.title}
                        </h3>
                        <p className="text-zinc-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3">
                            {event.description}
                        </p>
                        <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                            Ver Detalles <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
