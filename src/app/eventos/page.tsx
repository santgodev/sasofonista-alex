
import { Section } from "@/components/Section";
import { EVENTS } from "@/mocks/events.mock";
import { EventCard } from "@/features/eventos/components/EventCard";
import { BookingCTA } from "@/features/eventos/components/BookingCTA";
import { CalendarPlaceholder } from "@/features/eventos/components/CalendarPlaceholder";
import { AvailabilityChecker } from "@/features/eventos/components/AvailabilityChecker";

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
                    <div className="mt-8 flex justify-center gap-4">
                        <a href="#availability" className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8">
                            Verificar Fecha
                        </a>
                    </div>
                </div>
            </section>

            {/* Services List */}
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {EVENTS.map((event) => (
                        <EventCard key={event.id} event={event} />
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

            {/* Availability Checker Section */}
            <Section id="availability" className="bg-zinc-900/50 border-y border-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <AvailabilityChecker />
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
