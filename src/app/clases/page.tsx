
import { Section } from "@/components/Section";
import { COURSES } from "@/mocks/courses.mock";
import { CourseCard } from "@/features/clases/components/CourseCard";
import { InquiryCTA } from "@/features/clases/components/InquiryCTA";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import Image from "next/image";

export default function ClasesPage() {
    return (
        <>
            <section className="relative py-24 bg-zinc-900 border-b border-white/5 overflow-hidden min-h-[75vh] flex items-center justify-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/iloveimg-converted/saxo_venta_3.jpg"
                        alt="Clases de Saxofón Alex Galindo"
                        fill
                        className="object-cover opacity-60"
                        style={{ objectPosition: 'center 15%' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Academia de Música</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        Descubre Tu Propia Voz
                    </h1>
                    <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
                        Clases personalizadas diseñadas para desbloquear tu potencial musical, sin importar tu nivel actual.
                    </p>
                </div>
            </section>

            <Section>
                <div className="space-y-6">
                    {COURSES.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>

                <InquiryCTA />
            </Section>

            {/* Methodology/Philosophy */}
            <Section className="bg-zinc-950 border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
                            <Image
                                src="/iloveimg-converted/portada_clases.jpg"
                                alt="Profesor Alex en clase"
                                fill
                                className="object-cover"
                                style={{ objectPosition: "center top" }}
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-white mb-6">Mi Enfoque Pedagógico</h2>
                        <div className="space-y-6 text-zinc-400">
                            <p>
                                Creo firmemente que la música es un lenguaje que todos podemos aprender. Mi método se basa en:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="w-1 h-full min-h-[1.5em] bg-primary rounded-full" />
                                    <div>
                                        <strong className="block text-white">Adaptabilidad</strong>
                                        Cada alumno es único. Adaptamos el repertorio a tus gustos y el ritmo a tus necesidades.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1 h-full min-h-[1.5em] bg-primary rounded-full" />
                                    <div>
                                        <strong className="block text-white">Práctica Real</strong>
                                        Menos teoría aburrida, más tocar. Aprendemos la teoría aplicándola directamente a canciones.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1 h-full min-h-[1.5em] bg-primary rounded-full" />
                                    <div>
                                        <strong className="block text-white">Confianza</strong>
                                        Un espacio seguro para equivocarse, experimentar y crecer como artista.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}
