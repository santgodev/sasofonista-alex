"use client";

import Image from "next/image";
import { Button } from "@/components/Button";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export function EventCatalog() {
    const events = [
        {
            title: "Bodas Exclusivas",
            description: "Desde la ceremonia hasta el cóctel. Música que acompaña cada emoción del día más importante.",
            image: "/iloveimg-converted/portada_boda.jpg",
            tags: ["Ceremonia", "Cóctel", "Banquete"],
            imagePosition: "20% center",
            messageKey: WHATSAPP_MESSAGES.wedding
        },
        {
            title: "Eventos Corporativos",
            description: "Sofisticación para su marca. Un ambiente distinguido para lanzamientos, galas y networking.",
            image: "/iloveimg-converted/portada_evento_coorporativo.jpg",
            tags: ["Galas", "Lanzamientos", "Cenas"],
            imagePosition: "85% top",
            messageKey: WHATSAPP_MESSAGES.corporate
        },
        {
            title: "Dúo Saxo & Piano",
            description: "La combinación perfecta de elegancia y ritmo. Un diálogo musical que cautiva a todos.",
            image: "/iloveimg-converted/portada_duo.jpg",
            tags: ["Exclusivo", "Duet", "Jazz Lounge"],
            imagePosition: "100% 20%",
            messageKey: WHATSAPP_MESSAGES.duo
        },
        {
            title: "Pedidas de Mano",
            description: "El 'Sí, quiero' merece una banda sonora inolvidable. Intimidad y romanticismo puro.",
            image: "/iloveimg-converted/bodas.jpg",
            tags: ["Romántico", "Sorpresa", "Íntimo"],
            imagePosition: "40% center",
            messageKey: WHATSAPP_MESSAGES.proposal
        },
        {
            title: "Cumpleaños y Grados",
            description: "Eleva tu celebración con la energía del saxo en vivo. Pop, House, y éxitos actuales.",
            image: "/iloveimg-converted/portada_cumpleaños.jpg",
            tags: ["Fiesta", "Grados", "Rooftops"],
            imagePosition: "center center",
            messageKey: WHATSAPP_MESSAGES.birthday
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(4);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Responsive visible items
    useEffect(() => {
        const handleResize = () => {
            let newVisibleItems = 4;
            if (window.innerWidth < 768) {
                newVisibleItems = 1;
            } else if (window.innerWidth < 1024) {
                newVisibleItems = 2;
            }

            setVisibleItems(prev => prev !== newVisibleItems ? newVisibleItems : prev);
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, events.length - visibleItems);

    const nextSlide = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    // Touch handlers for Swipe
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && currentIndex < maxIndex) {
            nextSlide();
        }
        if (isRightSwipe && currentIndex > 0) {
            prevSlide();
        }
    };

    return (
        <div className="relative group px-4 md:px-12">
            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-white transition-all hover:bg-primary hover:text-black disabled:opacity-0 disabled:pointer-events-none ${currentIndex > 0 ? 'opacity-100' : 'opacity-0'}`}
                aria-label="Anterior"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-white transition-all hover:bg-primary hover:text-black disabled:opacity-0 disabled:pointer-events-none ${currentIndex < maxIndex ? 'opacity-100' : 'opacity-0'}`}
                aria-label="Siguiente"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slider Container */}
            <div
                className="overflow-hidden rounded-2xl touch-pan-y"
                ref={containerRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                        // Simplified math: Shift by calculated percentage per item (100% / visibleItems)
                        transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
                    }}
                >
                    {events.map((event, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 relative h-[550px] md:h-[500px] pr-4 last:pr-0"
                            style={{
                                width: `${100 / visibleItems}%`,
                            }}
                        >
                            {/* Inner Card handles the visual separation */}
                            <div className="relative w-full h-full overflow-hidden rounded-2xl cursor-pointer group/card border border-white/5">
                                <Image
                                    src={event.image}
                                    alt={`${event.title} - Saxofonista Alex Galindo Bogotá`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    quality={90}
                                    className="object-cover transition-transform duration-700 md:group-hover/card:scale-110"
                                    style={{ objectPosition: event.imagePosition || 'center' }}
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 md:opacity-80 md:group-hover/card:opacity-90 transition-opacity" />

                                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 md:translate-y-4 md:group-hover/card:translate-y-0 transition-transform duration-500">
                                    <div className="flex flex-wrap gap-2 mb-3 opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-500 delay-100">
                                        {event.tags.map((tag, tIdx) => (
                                            <span key={tIdx} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white border border-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2 leading-tight">
                                        {event.title}
                                    </h3>
                                    <p className="text-zinc-200 text-xs md:text-sm mb-4 opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3 md:line-clamp-none">
                                        {event.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-500 delay-300">
                                        <Link href={getWhatsAppLink(event.messageKey)} target="_blank" className="flex items-center gap-2 hover:underline">
                                            Cotizar <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
