"use client";

import { Button } from "@/components/Button";
import { X, Calendar, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { sendEmail } from "@/lib/email";

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultEventType?: string;
}

export function LeadCaptureModal({ isOpen, onClose, defaultEventType = "" }: LeadCaptureModalProps) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        eventType: defaultEventType || "wedding",
        date: "",
        details: "",
    });

    // Prevent scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await sendEmail({
                to_name: "Alex",
                to_email: "tucorreo@ejemplo.com",
                message: `Detalles: ${formData.details}\nTeléfono: ${formData.phone}`,
                date: formData.date,
                subject: `Verificar Disponibilidad: ${formData.eventType} - ${formData.name}`,
            });
            setStep(2); // Success step
        } catch (error) {
            console.error("Error sending lead:", error);
            alert("Hubo un error al enviar. Por favor intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                    <X className="w-5 h-5" />
                </button>

                {step === 1 ? (
                    <div className="p-8 md:p-10">
                        <div className="mb-8 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-4 border border-primary/20">
                                <Calendar className="w-3 h-3" /> Agenda 2024-2025
                            </div>
                            <h2 className="text-3xl font-serif font-bold text-white mb-2">Verificar Disponibilidad</h2>
                            <p className="text-zinc-400 text-sm">
                                Selecciona tu fecha para asegurar tu evento. Las fechas exclusivas se agotan rápido.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-500 uppercase">Nombre</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                        placeholder="Tu nombre"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-500 uppercase">Teléfono</label>
                                    <input
                                        required
                                        type="tel"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                        placeholder="+34 ..."
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-zinc-500 uppercase">Email</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                    placeholder="tu@email.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-500 uppercase">Tipo de Evento</label>
                                    <select
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none"
                                        value={formData.eventType}
                                        onChange={e => setFormData({ ...formData, eventType: e.target.value })}
                                    >
                                        <option value="wedding">Boda</option>
                                        <option value="corporate">Evento Corporativo</option>
                                        <option value="party">Fiesta Privada</option>
                                        <option value="proposal">Pedida de Mano</option>
                                        <option value="other">Otro</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-500 uppercase">Fecha Estimada</label>
                                    <input
                                        type="date"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all [color-scheme:dark]"
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-primary text-zinc-950 font-bold text-lg hover:bg-primary/90 h-12 mt-4"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Consultando..." : "Verificar Disponibilidad"}
                            </Button>

                            <p className="text-center text-zinc-600 text-xs mt-4">
                                Respuesta garantizada en menos de 24 horas.
                            </p>
                        </form>
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-4">¡Solicitud Recibida!</h3>
                        <p className="text-zinc-400 mb-8">
                            Gracias, {formData.name}. He recibido los detalles de tu evento. Te contactaré al email <strong>{formData.email}</strong> lo antes posible para confirmar disponibilidad y presupuestos.
                        </p>
                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="px-8"
                        >
                            Volver al sitio
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
