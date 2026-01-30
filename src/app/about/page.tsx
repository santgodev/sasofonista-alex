"use client";

import Image from "next/image";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Star } from "lucide-react";

export default function AboutPage() {
    return (
        <>
            {/* Hero / Header */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-zinc-950">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/saxo.png"
                        alt="Alex Galindo Saxofonista"
                        fill
                        className="object-cover opacity-40 blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                        Alex Galindo
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-300 font-light tracking-wide">
                        Arquitectura Emocional a través del Saxofón
                    </p>
                </div>
            </section>

            {/* Bio Content */}
            <Section className="bg-zinc-950 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="space-y-8 order-2 md:order-1">
                        <h2 className="text-3xl md:text-4xl font-serif text-white">
                            Más que un músico,<br />un creador de atmósferas.
                        </h2>
                        <div className="space-y-6 text-lg text-zinc-300 font-light leading-relaxed">
                            <p>
                                Con más de 30 años de trayectoria, mi vida ha estado dedicada a entender el lenguaje de la música y cómo este puede transformar un momento ordinario en un recuerdo imborrable.
                            </p>
                            <p>
                                Desde mis inicios en la formación clásica hasta mi evolución hacia el Jazz, el Pop y los ritmos electrónicos, he buscado siempre la elegancia en la interpretación. No se trata solo de tocar notas, sino de dialogar con el entorno y las emociones de los asistentes.
                            </p>
                            <p>
                                He tenido el privilegio de acompañar cientos de historias de amor, éxitos corporativos y celebraciones íntimas, aportando siempre un sello de distinción y profesionalismo que va más allá de la música misma.
                            </p>
                        </div>

                        <div className="pt-8">
                            <Link href="/contacto">
                                <Button className="bg-white text-black hover:bg-zinc-200 px-8 h-12">
                                    Hablemos de tu Evento
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                        <Image
                            src="/images/profesor.png"
                            alt="Alex Galindo en presentación"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </Section>

            {/* Stats / Credentials */}
            <Section className="bg-zinc-900/50 py-20 border-y border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <div className="text-4xl md:text-5xl font-serif text-primary mb-2">30+</div>
                        <div className="text-sm text-zinc-400 uppercase tracking-widest">Años de Experiencia</div>
                    </div>
                    <div className="p-6">
                        <div className="text-4xl md:text-5xl font-serif text-primary mb-2">500+</div>
                        <div className="text-sm text-zinc-400 uppercase tracking-widest">Eventos Realizados</div>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-center items-center gap-1 text-primary text-4xl md:text-5xl mb-2">
                            5.0 <Star className="w-8 h-8 fill-primary" />
                        </div>
                        <div className="text-sm text-zinc-400 uppercase tracking-widest">Calificación Clientes</div>
                    </div>
                </div>
            </Section>
        </>
    );
}
