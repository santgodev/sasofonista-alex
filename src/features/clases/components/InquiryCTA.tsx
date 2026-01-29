
import { Button } from "@/components/Button";
import Link from "next/link";
import { Mail } from "lucide-react";

export function InquiryCTA() {
    return (
        <div className="border-t border-white/10 pt-16 mt-16 text-center">
            <h3 className="text-2xl font-serif font-medium text-white mb-4">
                ¿Tienes dudas sobre qué nivel elegir?
            </h3>
            <p className="text-zinc-400 mb-8">
                Escríbeme para una evaluación gratuita y te orientaré sobre el mejor camino para ti.
            </p>
            <Link href="/contacto">
                <Button variant="outline" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Contactar Profesor
                </Button>
            </Link>
        </div>
    );
}
