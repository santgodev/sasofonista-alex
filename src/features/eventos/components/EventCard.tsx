
import { Event } from "@/types/event";
import { Check } from "lucide-react";
import { Button } from "@/components/Button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import Link from "next/link";
import Image from "next/image";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 hover:border-primary/50 transition-all duration-500">
            <div className="aspect-[3/4] relative overflow-hidden">
                {event.image ? (
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        style={{ objectPosition: event.imagePosition || "center" }}
                    />
                ) : (
                    <ImagePlaceholder
                        className="w-full h-full bg-zinc-800 group-hover:scale-105 transition-transform duration-700"
                        type="image"
                        text={event.title}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90" />
            </div>

            <div className="p-6 relative">
                <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                </h3>
                <p className="text-zinc-400 mb-6 line-clamp-2">
                    {event.description}
                </p>

                <ul className="space-y-3 mb-8">
                    {event.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                            <Check className="w-5 h-5 text-primary shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="text-sm text-zinc-500">
                        Agenda tu fecha
                    </div>
                    <Link href={getWhatsAppLink(event.messageKey || WHATSAPP_MESSAGES.general)} target="_blank">
                        <Button as="div" variant="outline" size="sm" className="hover:bg-primary hover:text-black hover:border-primary transition-all">
                            Cotizar Ahora
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
