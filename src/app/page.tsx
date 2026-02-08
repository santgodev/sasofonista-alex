"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { HeroVideo } from "@/components/HeroVideo";
import { ArrowDown } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { HeroImageSequence } from "@/components/HeroImageSequence";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Preloader } from "@/components/Preloader";

// Dynamic imports for improved performance
const EventCatalog = dynamic(() => import("@/components/EventCatalog").then(mod => mod.EventCatalog), {
  loading: () => <div className="h-[500px] animate-pulse bg-zinc-900/50 rounded-2xl" />
});

const InstrumentSelector = dynamic(() => import("@/components/InstrumentSelector").then(mod => mod.InstrumentSelector), {
  loading: () => <div className="h-[600px] animate-pulse bg-zinc-900/50 rounded-2xl" />
});

const InstagramReel = dynamic(() => import("@/components/InstagramReel").then(mod => mod.InstagramReel), {
  loading: () => <div className="h-[400px] animate-pulse bg-zinc-900/50 rounded-2xl" />
});



export default function Home() {
  const [isHeroReady, setIsHeroReady] = useState(false);
  const whatsappHeroLink = getWhatsAppLink(WHATSAPP_MESSAGES.hero);

  // No longer using isMobile for conditional rendering to avoid flicker (CLS)


  return (
    <>
      <Preloader isReady={isHeroReady} />

      {/* Hero Section - Cinematic */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Responsive Hero Video (Bucket R2) */}
        <div className="absolute inset-0">
          <HeroVideo
            desktopVideoUrl="https://pub-894a082164c648aabd3e99a6d36e8f49.r2.dev/alex-hero-pc.mp4"
            mobileVideoUrl="https://pub-894a082164c648aabd3e99a6d36e8f49.r2.dev/alex.mp4"
            posterUrl="/hero/frame_000.jpg"
            onReady={() => setIsHeroReady(true)}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center h-full justify-center pt-20">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-block px-3 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-md mb-4 animate-in fade-in slide-in-from-top-8 duration-1000">
              <span className="text-zinc-200 text-sm tracking-[0.2em] font-medium uppercase">Experience Excellence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.1] sm:leading-none animate-in fade-in scale-95 duration-1000 delay-200">
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-400">
                Saxofonista Profesional
              </span>
              <span className="block text-primary italic font-light mt-1 sm:mt-2">
                en Colombia
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-zinc-200 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              Saxofonista internacional especializado en crear atmósferas sonoras inolvidables para eventos de alto nivel.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-6 sm:pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 w-full max-w-xs sm:max-w-none mx-auto">
              <Button
                as={Link}
                href={whatsappHeroLink}
                target="_blank"
                size="lg"
                className="w-full sm:min-w-[220px] h-14 text-lg bg-primary hover:bg-primary/90 text-black font-bold tracking-wide"
              >
                Cotizar Show en Vivo
              </Button>

              <span className="text-zinc-400 text-sm hidden sm:block">o</span>
              <Button
                as={Link}
                href="#academia"
                variant="ghost"
                size="lg"
                className="w-full sm:min-w-[220px] h-14 text-lg text-white/70 hover:text-white"
              >
                Ver Academia
              </Button>

            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce duration-[2000ms] text-zinc-400">
            <ArrowDown className="w-6 h-6 opacity-50" />
          </div>
        </div>
      </section>

      {/* Intro - Storytelling */}
      <Section className="bg-zinc-950 py-20 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-20 items-center">
          <div className="md:col-span-5 relative order-2 md:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden transition-all duration-700 shadow-2xl">
              <Image
                src="/images/saxo.webp"
                alt="Saxofonista Alex Galindo Bogotá Colombia"
                fill
                priority={true}
                quality={75}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
            </div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-32 h-32 sm:w-48 sm:h-48 bg-zinc-900 p-4 sm:p-6 rounded-xl border border-zinc-800 shadow-xl">
              <div className="h-full flex flex-col justify-center items-center text-center">
                <span className="text-2xl sm:text-4xl font-serif font-bold text-primary mb-1">30+</span>
                <span className="text-[8px] sm:text-sm text-zinc-300 uppercase tracking-widest leading-tight">Años de<br />Trayectoria</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6 md:space-y-8 order-1 md:order-2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
              No es solo música,<br /> es <span className="text-zinc-300 italic">Arquitectonía Emocional</span>.
            </h2>
            <div className="space-y-4 md:space-y-6 text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto md:mx-0">
              <p>
                Creo firmemente que el saxofón es una extensión de la voz humana. Mi misión no es simplemente &quot;tocar canciones&quot;, sino diseñar el paisaje sonoro perfecto para cada momento.
              </p>
              <p>
                Desde el silencio expectante de una ceremonia hasta la euforia de una fiesta privada, mi enfoque combina la elegancia del Jazz clásico con la energía de los ritmos modernos, siempre con una estética visual impecable.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 pt-4 border-t border-white/5">
              <div className="text-sm sm:text-lg text-zinc-300">
                <div className="flex justify-center md:justify-start text-primary mb-1 tracking-tighter">★★★★★</div>
                <span className="font-bold text-white text-xl">500+</span>
                <span className="ml-2 text-zinc-400 text-sm italic">Sueños Musicales Cumplidos</span>
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
            Cada evento tiene su propia identidad. Ajusto mi repertorio y mi puesta en escena para alinearlos con tu visión.            </p>
        </div>
        <EventCatalog />

      </Section>

      {/* Academy - Instrument Selector */}
      <Section className="bg-zinc-950 py-24" id="academia">
        <div className="mb-16 text-center md:text-left">
          <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Mentoria & Educación</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white max-w-2xl mx-auto md:mx-0">
            Descubre tu propia voz musical
          </h2>
        </div>
        <InstrumentSelector />
      </Section>

      {/* Social Proof - Single Lazy-Loaded Reel */}
      <InstagramReel />

      {/* Lead Capture / Footer CTA */}
      <section className="relative py-20 md:py-32 bg-primary overflow-hidden">
        {/* <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay" /> */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-zinc-950 mb-6 sm:mb-8 leading-tight">
            ¿Listo para elevar tu evento?
          </h2>
          <p className="text-lg sm:text-xl text-zinc-950/90 mb-8 sm:mb-10 max-w-2xl mx-auto font-medium">
            Las fechas para la temporada 2026 se están cerrando. Consulta disponibilidad hoy mismo y asegúrate de tener la mejor música en tu día especial.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6">
            <Button
              as={Link}
              href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
              target="_blank"
              className="h-16 px-10 text-xl bg-black text-white hover:bg-black/90 shadow-2xl hover:scale-105 transition-transform duration-300 w-full"
            >
              Reservar Fecha Ahora
            </Button>

            <span className="text-zinc-900 font-bold text-xs sm:text-sm uppercase tracking-wider">
              O llámame al: +57 3132863989
            </span>
          </div>
        </div>
      </section>


    </>
  );
}
