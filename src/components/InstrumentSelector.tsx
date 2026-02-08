"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Music2, Mic2 } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export function InstrumentSelector() {
    interface Level {
        title: string;
        subtitle: string;
        description: string;
        image: string;
        icon: React.ReactNode;
        imagePosition: string;
    }

    const [activeTab, setActiveTab] = useState("saxo");

    interface Instrument {
        title: string;
        subtitle: string;
        description: string;
        image: string;
        icon: React.ReactNode;
        imagePosition: string;
    }

    const instruments: Record<string, Instrument> = {
        saxo: {
            title: "Saxofón",
            subtitle: "Tu Voz Melódica",
            description: "El instrumento más expresivo y cercano a la voz humana. Aprende técnica, improvisación y estilística en diferentes géneros.",
            image: "/iloveimg-converted/portada_clases.webp",
            icon: <Music2 className="w-5 h-5" />,
            imagePosition: "center 12%"
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Navigation - Left Side */}
            <div className="lg:col-span-4 space-y-4">
                <div className="hidden sm:block text-xl md:text-2xl font-serif font-bold text-white mb-6 md:mb-8 text-center lg:text-left">Elige tu instrumento</div>
                <div className="flex flex-col gap-3">
                    {Object.entries(instruments).map(([key, data]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`group flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${activeTab === key
                                ? "bg-zinc-800 border-l-4 border-primary shadow-lg"
                                : "bg-zinc-900/50 border-l-4 border-transparent hover:bg-zinc-900"
                                }`}
                        >
                            <div className={`p-3 rounded-lg ${activeTab === key ? "bg-primary text-black" : "bg-zinc-800 text-zinc-300 group-hover:text-white"}`}>
                                {data.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className={`font-bold transition-colors ${activeTab === key ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                                    {data.title}
                                </h3>
                                <p className="hidden sm:block text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">{data.subtitle}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="hidden sm:block mt-8 p-6 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-xl text-center">
                    <p className="text-zinc-300 text-sm mb-3">¿Buscas otro instrumento?</p>
                    <Link href={getWhatsAppLink(WHATSAPP_MESSAGES.general)} target="_blank" className="inline-flex items-center gap-2 text-primary text-sm font-bold cursor-pointer hover:underline">
                        Escríbeme y lo organizamos <Mic2 className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Content Display - Right Side */}
            <div className="lg:col-span-8 relative min-h-[450px] md:h-[500px] rounded-3xl overflow-hidden bg-zinc-950 border border-white/5 shadow-2xl mt-4 lg:mt-0">
                {Object.entries(instruments).map(([key, data]) => (
                    <div
                        key={key}
                        className={`absolute inset-0 transition-opacity duration-700 ${activeTab === key ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    >
                        <Image
                            src={data.image}
                            alt={`${data.title} - Clases de Música Alex Galindo Bogotá`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                            quality={60}
                            className="object-cover"
                            style={{ objectPosition: data.imagePosition || 'center' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/20 lg:bg-gradient-to-r lg:from-zinc-950 lg:via-zinc-950/80 lg:to-transparent" />

                        <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-8 lg:p-16 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                            <span className="text-primary text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 sm:mb-4 animate-in fade-in slide-in-from-bottom lg:slide-in-from-left duration-700 delay-100">Academia Musical</span>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                                {data.title}
                            </h3>
                            <p className="text-zinc-300 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
                                {data.description}
                            </p>
                            <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-400 mb-2 lg:mb-0">
                                <Link href={getWhatsAppLink(WHATSAPP_MESSAGES.academy)} target="_blank" className="block sm:inline-block">
                                    <Button as="div" className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 py-4">
                                        Quiero mi clase de prueba
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
