
import { Button } from "@/components/Button";
import Link from "next/link";

export function BookingCTA() {
    return (
        <div className="bg-primary/10 rounded-3xl p-8 md:p-12 text-center border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                ¿Listo para elevar tu evento?
            </h2>
            <p className="text-zinc-300 max-w-2xl mx-auto mb-8 text-lg">
                Asegura la fecha para tu boda o evento privado. La agenda suele llenarse con meses de antelación.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contacto">
                    <Button size="lg" className="w-full sm:w-auto">
                        Consultar Disponibilidad
                    </Button>
                </Link>
                <Link href="/contacto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        Hablemos por WhatsApp
                    </Button>
                </Link>
            </div>
        </div>
    );
}
