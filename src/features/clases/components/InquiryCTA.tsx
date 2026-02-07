
import { Button } from "@/components/Button";
import { Mail } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import Link from "next/link";

export function InquiryCTA() {
    return (
        <div className="border-t border-white/10 pt-16 mt-16 text-center">
            <h3 className="text-2xl font-serif font-medium text-white mb-4">
                ¿Tienes dudas sobre qué nivel elegir?
            </h3>
            <p className="text-zinc-400 mb-8">
                Escríbeme para una evaluación gratuita y te orientaré sobre el mejor camino para ti.
            </p>
            <Link href={getWhatsAppLink(WHATSAPP_MESSAGES.academy)} target="_blank">
                <Button as="div" variant="outline" className="gap-2 hover:bg-primary hover:text-black hover:border-primary transition-all">
                    <Mail className="w-4 h-4" />
                    Agendar Evaluación Gratuita
                </Button>
            </Link>
        </div>
    );
}
