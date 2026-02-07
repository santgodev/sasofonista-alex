
import { Section } from "@/components/Section";
import { EVENTS } from "@/mocks/events.mock";
import { EventCard } from "@/features/eventos/components/EventCard";
import { BookingCTA } from "@/features/eventos/components/BookingCTA";
import { CalendarPlaceholder } from "@/features/eventos/components/CalendarPlaceholder";

export default function EventosPage() {
    return (
        <>
            {/* Header Events */}
            <section className="bg-zinc-900 border-b border-white/5 py-24 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        Eventos Inolvidables
                    </h1>
                    <p className="text-xl text-zinc-400">
                        Aporta elegancia y emoción a tu celebración con música en vivo de alta calidad.
                    </p>

                </div>
            </section>

            {/* Services List */}
            <Section>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
                    {EVENTS.map((event) => (
                        <div key={event.id} className="min-w-[85vw] snap-center sm:min-w-[400px] md:min-w-0">
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            </Section>

            {/* Process Steps */}
            <Section className="bg-zinc-950 border-y border-white/5">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif font-bold text-white mb-4">Proceso de Contratación</h2>
                    <p className="text-zinc-400">Simple, claro y sin sorpresas.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-zinc-900 border border-primary/20 text-primary text-2xl font-bold flex items-center justify-center mx-auto mb-6 z-10 relative">1</div>
                        <h3 className="text-xl font-bold text-white mb-3">Consulta</h3>
                        <p className="text-zinc-400 text-sm">Verificamos disponibilidad y definimos el repertorio ideal para tu evento.</p>
                    </div>
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-zinc-900 border border-primary/20 text-primary text-2xl font-bold flex items-center justify-center mx-auto mb-6 z-10 relative">2</div>
                        <h3 className="text-xl font-bold text-white mb-3">Reserva</h3>
                        <p className="text-zinc-400 text-sm">Aseguras la fecha con un anticipo del 30%. Recibes contrato formal.</p>
                    </div>
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-primary text-background text-2xl font-bold flex items-center justify-center mx-auto mb-6 z-10 relative">3</div>
                        <h3 className="text-xl font-bold text-white mb-3">¡Música!</h3>
                        <p className="text-zinc-400 text-sm">Todo listo. Yo me encargo del montaje y la música. Tú disfruta.</p>
                    </div>
                </div>
            </Section>



            {/* Calendar & CTA */}
            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <CalendarPlaceholder />
                    <BookingCTA />
                </div>
            </Section>
        </>
    );
}
