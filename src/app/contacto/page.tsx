"use client";

import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Briefcase, GraduationCap, Mail, MessageSquare } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import Link from "next/link";

export default function ContactoPage() {
    return (
        <>
            <Section className="min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-12 text-center bg-zinc-950">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                    Contacto Directo
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-16">
                    Sin formularios. Conecta directamente conmigo vía WhatsApp para una respuesta más rápida.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full px-4">
                    {/* Eventos / Contrataciones */}
                    <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Briefcase className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-3">Contrataciones</h3>
                        <p className="text-zinc-400 mb-8">
                            Para bodas, eventos corporativos y celebraciones privadas.
                        </p>
                        <Link href={getWhatsAppLink(WHATSAPP_MESSAGES.general)} target="_blank">
                            <Button as="div" className="w-full gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Cotizar Evento
                            </Button>
                        </Link>
                    </div>

                    {/* Academia / Clases */}
                    <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <GraduationCap className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-3">Clases y Academia</h3>
                        <p className="text-zinc-400 mb-8">
                            Información sobre cursos de saxofón, piano y técnica vocal.
                        </p>
                        <Link href={getWhatsAppLink(WHATSAPP_MESSAGES.academy)} target="_blank">
                            <Button as="div" variant="outline" className="w-full gap-2 hover:bg-primary hover:text-black">
                                <MessageSquare className="w-4 h-4" />
                                Consultar Clases
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="mt-16 flex items-center justify-center gap-2 text-zinc-500">
                    <Mail className="w-4 h-4" />
                    <span>O envíame un correo a:</span>
                    <a href="mailto:info@alexsax.com" className="text-primary hover:underline">info@alexsax.com</a>
                </div>
            </Section>
        </>
    );
}
