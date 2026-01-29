
import { Calendar } from "lucide-react";

export function CalendarPlaceholder() {
    return (
        <div className="bg-zinc-900 rounded-2xl border border-white/10 p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Agenda Online</h3>
            <p className="text-zinc-400 max-w-sm">
                Próximamente podrás ver mi disponibilidad en tiempo real aquí. Por ahora, por favor contáctame directamente para consultar fechas.
            </p>
        </div>
    );
}
