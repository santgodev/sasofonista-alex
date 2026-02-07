"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { HeroImageSequence } from "@/components/HeroImageSequence";
import { EventCatalog } from "@/components/EventCatalog";
import { InstrumentSelector } from "@/components/InstrumentSelector";
import { ArrowDown } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export default function Home() {
  const whatsappHeroLink = getWhatsAppLink(WHATSAPP_MESSAGES.hero);

  return (
    <>
      {/* Hero Section - Cinematic */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <HeroImageSequence />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center h-full justify-center pt-20">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-block px-3 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-md mb-4 animate-in fade-in slide-in-from-top-8 duration-1000">
              <span className="text-zinc-200 text-sm tracking-[0.2em] font-medium uppercase">Experience Excellence</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-none animate-in fade-in scale-95 duration-1000 delay-200">
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-400">
                Elegancia
              </span>
              <span className="block text-primary italic font-light mt-2">
                En Cada Nota
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-zinc-200 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              Saxofonista internacional especializado en crear atmósferas sonoras inolvidables para eventos de alto nivel.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
              <Link href={whatsappHeroLink} target="_blank">
                <Button
                  as="div"
                  size="lg"
                  className="min-w-[220px] h-14 text-lg bg-primary hover:bg-primary/90 text-black font-bold tracking-wide"
                >
                  Cotizar Show en Vivo
                </Button>
              </Link>
              <span className="text-zinc-400 text-sm hidden sm:block">o</span>
              <Link href="#academia">
                <Button as="div" variant="outline" size="lg" className="min-w-[220px] h-14 text-lg border-white/20 text-white hover:bg-white/10">
                  Ver Academia
                </Button>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce duration-[2000ms] text-zinc-400">
            <ArrowDown className="w-6 h-6 opacity-50" />
          </div>
        </div>
      </section>

      {/* Intro - Storytelling */}
      <Section className="bg-zinc-950 py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="md:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden transition-all duration-700">
              <Image src="/images/saxo.webp" alt="Saxofonista Alex Galindo Bogotá Colombia" fill className="object-cover object-top" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-xl hidden md:block">
              <div className="h-full flex flex-col justify-center items-center text-center">
                <span className="text-4xl font-serif font-bold text-primary mb-1">30+</span>
                <span className="text-sm text-zinc-300 uppercase tracking-widest text-[10px]">Años de<br />Trayectoria</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
              No es solo música,<br /> es <span className="text-zinc-300 italic">Arquitectura Emocional</span>.
            </h2>
            <div className="space-y-6 text-lg text-zinc-300 font-light leading-relaxed max-w-2xl">
              <p>
                Creo firmemente que el saxofón es una extensión de la voz humana. Mi misión no es simplemente &quot;tocar canciones&quot;, sino diseñar el paisaje sonoro perfecto para cada momento.
              </p>
              <p>
                Desde el silencio expectante de una ceremonia hasta la euforia de una fiesta privada, mi enfoque combina la elegancia del Jazz clásico con la energía de los ritmos modernos, siempre con una estética visual impecable.
              </p>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-zinc-950 bg-zinc-800 relative overflow-hidden">
                    {/* Placeholder avatars */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-zinc-300">
                <div className="flex text-primary mb-1">★★★★★</div>
                <span className="font-bold text-white">500+</span> Eventos realizados
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Services - Event Catalog */}
      <Section className="bg-black py-24 border-y border-zinc-900">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Servicios Exclusivos</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Diseñado para cada ocasión</h2>
          <p className="text-zinc-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Cada evento tiene su propia personalidad. Adapto mi repertorio y mi puesta en escena para mimetizarme con tu visión.
          </p>
        </div>
        <EventCatalog />

      </Section>

      {/* Academy - Instrument Selector */}
      <Section className="bg-zinc-950 py-24" id="academia">
        <div className="mb-16">
          <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Mentoria & Educación</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white max-w-2xl">
            Descubre tu propia voz musical
          </h2>
        </div>
        <InstrumentSelector />
      </Section>

      {/* Lead Capture / Footer CTA */}
      <section className="relative py-32 bg-primary overflow-hidden">
        {/* <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay" /> */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-zinc-950 mb-8 leading-tight">
            ¿Listo para elevar tu evento?
          </h2>
          <p className="text-xl text-zinc-950/90 mb-10 max-w-2xl mx-auto font-medium">
            Las fechas para la temporada 2026 se están cerrando. Consulta disponibilidad hoy mismo y asegúrate de tener la mejor música en tu día especial.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={getWhatsAppLink(WHATSAPP_MESSAGES.general)} target="_blank">
              <Button as="div" className="h-16 px-10 text-xl bg-black text-white hover:bg-black/90 shadow-2xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
                Reservar Fecha Ahora
              </Button>
            </Link>
            <span className="text-zinc-900 font-bold text-sm uppercase tracking-wider mt-4 sm:mt-0 sm:ml-4">
              O llámame al: +57 3132863989
            </span>
          </div>
        </div>
      </section>


    </>
  );
}
