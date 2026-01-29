
"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Calendar, Check, X, AlertCircle, Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

// Mock busy dates (YYYY-MM-DD)
// Using dynamic dates relative to current month to ensure relevance
const getBusyDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return [
        `${year}-${month}-05`,
        `${year}-${month}-12`,
        `${year}-${month}-15`,
        `${year}-${month}-20`,
        `${year}-${month}-25`,
        `${year}-${month}-28`,
    ];
};

const BUSY_DATES = getBusyDates();

interface FormData {
    name: string;
    email: string;
    phone: string;
    date: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    date?: string;
}

type CheckStatus = 'idle' | 'checking' | 'available' | 'unavailable';

export function AvailabilityChecker() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        date: ""
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<CheckStatus>('idle');
    const [alternatives, setAlternatives] = useState<string[]>([]);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (formData.name.trim().length < 3) {
            newErrors.name = "El nombre debe tener al menos 3 caracteres.";
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Ingresa un email válido.";
            isValid = false;
        }

        if (!/^\d{7,}$/.test(formData.phone)) {
            newErrors.phone = "El teléfono debe tener al menos 7 números.";
            isValid = false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(formData.date);

        if (!formData.date || isNaN(selectedDate.getTime())) {
            newErrors.date = "Selecciona una fecha válida.";
            isValid = false;
        } else if (selectedDate < today) {
            newErrors.date = "La fecha no puede ser en el pasado.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const checkAvailability = async () => {
        if (!validate()) return;

        setStatus('checking');
        setAlternatives([]);

        // Simulate API delay
        setTimeout(() => {
            if (BUSY_DATES.includes(formData.date)) {
                setStatus('unavailable');
                // Generate detailed alternatives
                const dateObj = new Date(formData.date);
                const nextDays = [];
                for (let i = 1; i <= 5; i++) {
                    const nextDate = new Date(dateObj);
                    nextDate.setDate(dateObj.getDate() + i);
                    const dateStr = nextDate.toISOString().split('T')[0];
                    if (!BUSY_DATES.includes(dateStr)) {
                        nextDays.push(dateStr);
                    }
                }
                setAlternatives(nextDays.slice(0, 3));
            } else {
                setStatus('available');
            }
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
        // Reset status if user changes date
        if (name === 'date' && status !== 'idle') {
            setStatus('idle');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-zinc-900 border border-white/10 rounded-2xl p-8 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <div className="text-center mb-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-2 flex items-center justify-center gap-3">
                    <Calendar className="w-6 h-6 text-primary" />
                    Verifica Disponibilidad
                </h3>
                <p className="text-zinc-400 text-sm">
                    Consulta si tu fecha está libre antes de agendar.
                    <span className="block text-zinc-500 text-xs mt-1">(La protección de tu evento comienza con la reserva)</span>
                </p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-zinc-300">Nombre Completo</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={twMerge(
                                "w-full bg-zinc-950 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all",
                                errors.name
                                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                                    : "border-white/10 focus:border-primary focus:ring-primary/20"
                            )}
                            placeholder="Tu nombre"
                        />
                        {errors.name && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={twMerge(
                                "w-full bg-zinc-950 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all",
                                errors.email
                                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                                    : "border-white/10 focus:border-primary focus:ring-primary/20"
                            )}
                            placeholder="correo@ejemplo.com"
                        />
                        {errors.email && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-zinc-300">Teléfono</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={twMerge(
                                "w-full bg-zinc-950 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all",
                                errors.phone
                                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                                    : "border-white/10 focus:border-primary focus:ring-primary/20"
                            )}
                            placeholder="Ej: 3001234567"
                        />
                        {errors.phone && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-medium text-zinc-300">Fecha del Evento</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            className={twMerge(
                                "w-full bg-zinc-950 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all [color-scheme:dark]",
                                errors.date
                                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                                    : "border-white/10 focus:border-primary focus:ring-primary/20"
                            )}
                        />
                        {errors.date && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.date}</p>}
                    </div>
                </div>

                <div className="pt-4 flex flex-col items-center">
                    <Button
                        onClick={checkAvailability}
                        size="lg"
                        disabled={status === 'checking'}
                        className="min-w-[200px]"
                    >
                        {status === 'checking' ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Verificando...
                            </>
                        ) : (
                            "Consultar Fecha"
                        )}
                    </Button>
                </div>
            </div>

            {/* Results */}
            {status !== 'idle' && status !== 'checking' && (
                <div className="mt-8 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
                    {status === 'available' ? (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                <Check className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <strong className="text-emerald-400 block text-lg">¡Excelente Noticia!</strong>
                                <p className="text-emerald-200/70 text-sm">
                                    La fecha <strong>{formData.date}</strong> está disponible. Te recomiendo reservarla cuanto antes.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                                    <X className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                    <strong className="text-red-400 block text-lg">Lo sentimos</strong>
                                    <p className="text-red-200/70 text-sm">
                                        Esa fecha ya está reservada para otro evento.
                                    </p>
                                </div>
                            </div>

                            {alternatives.length > 0 && (
                                <div className="ml-14">
                                    <p className="text-zinc-400 text-sm mb-3">Fechas cercanas disponibles:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {alternatives.map(altDate => (
                                            <span key={altDate} className="px-3 py-1 bg-zinc-800 border border-white/5 rounded-full text-xs text-zinc-300">
                                                {altDate}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
