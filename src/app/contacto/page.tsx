"use client";

import { useState } from "react";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Mail, Phone, MapPin, MessageSquare, Loader2 } from "lucide-react";

export default function ContactoPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "Interés en Clases",
        message: "",
        date: "",
        time: ""
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setResponseMessage("");

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Error al enviar');
            }

            setStatus('success');
            setResponseMessage(data.message);

            // Should we reset form? Maybe not date if they want to try another?
            // If success (confirmed or busy-but-sent), we might want to clear sensitive fields?
            if (data.status === 'confirmed') {
                setFormData({ name: "", email: "", subject: "Interés en Clases", message: "", date: "", time: "" });
            }

        } catch (error) {
            console.error(error);
            setStatus('error');
            setResponseMessage("Hubo un error al procesar tu solicitud. Por favor intenta de nuevo o escríbeme directo.");
        }
    };

    return (
        <>
            <Section className="pt-24 pb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                    Hablemos
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    ¿Tienes un proyecto en mente o quieres empezar clases?
                    Cuéntame más y te responderé en menos de 24 horas.
                </p>
            </Section>

            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-6">Información Directa</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4 text-zinc-300">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <strong className="block text-white mb-1">WhatsApp</strong>
                                        <p className="text-sm text-zinc-400 mb-2">Respuesta rápida para consultas breves.</p>
                                        <a href="#" className="text-primary hover:underline">Iniciar chat</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 text-zinc-300">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <strong className="block text-white mb-1">Email</strong>
                                        <a href="mailto:info@alexsax.com" className="hover:text-white transition-colors">info@alexsax.com</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 text-zinc-300">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <strong className="block text-white mb-1">Ubicación</strong>
                                        <p>Disponible para eventos en toda la región.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-zinc-900 p-8 rounded-2xl border border-white/10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-zinc-300">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder="tucorreo@ejemplo.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="date" className="text-sm font-medium text-zinc-300">Fecha Deseada</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors [color-scheme:dark]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="time" className="text-sm font-medium text-zinc-300">Hora de Inicio Aproximada</label>
                                <input
                                    type="time"
                                    id="time"
                                    value={formData.time} // We need to add this to state
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors [color-scheme:dark]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-zinc-300">Asunto</label>
                                <select
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
                                >
                                    <option>Interés en Clases</option>
                                    <option>Cotización Evento (Boda)</option>
                                    <option>Cotización Evento (Corporativo)</option>
                                    <option>Otro</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-zinc-300">Mensaje</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                                    placeholder="Cuéntame más sobre tu evento o tus objetivos musicales..."
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full justify-center"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    "Enviar Mensaje"
                                )}
                            </Button>

                            {responseMessage && (
                                <div className={`p-4 rounded-lg text-sm ${status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    {responseMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </Section>
        </>
    );
}
