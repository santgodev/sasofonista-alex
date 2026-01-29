
import Link from "next/link";
import { Instagram, Youtube, Mail, Phone } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-900 border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-serif font-bold text-white mb-4 block">
                            Saxofonista Alex
                        </Link>
                        <p className="text-zinc-400 max-w-sm mb-6">
                            Música profesional para eventos inolvidables y enseñanza musical personalizada.
                            Lleva tu evento al siguiente nivel.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="https://www.instagram.com/saxofonistaalexgalindo/" icon={Instagram} label="Instagram Saxofonista Alex Galindo" />
                            <SocialLink href="#" icon={Youtube} label="YouTube" />
                            <SocialLink href="mailto:info@alexsax.com" icon={Mail} label="Email" />
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-serif font-bold text-white mb-4">Servicios</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/eventos">Bodas y Eventos</FooterLink>
                            <FooterLink href="/clases">Clases de Saxofón</FooterLink>
                            <FooterLink href="/clases">Clases de Piano</FooterLink>
                            <FooterLink href="/clases">Clases de Canto</FooterLink>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-serif font-bold text-white mb-4">Contacto</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-zinc-400">
                                <Mail className="w-4 h-4" />
                                info@alexsax.com
                            </li>
                            <li className="flex items-center gap-2 text-zinc-400">
                                <Phone className="w-4 h-4" />
                                +57 3132863989
                            </li>
                            <li className="text-zinc-400 text-sm mt-4">
                                Disponible para eventos en toda la región.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-400 text-sm">
                        © {currentYear} Saxofonista Alex. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6 text-sm text-zinc-400">
                        <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
                        <Link href="#" className="hover:text-white transition-colors">Términos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-background transition-all"
            aria-label={label}
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="text-zinc-400 hover:text-primary transition-colors">
                {children}
            </Link>
        </li>
    );
}
