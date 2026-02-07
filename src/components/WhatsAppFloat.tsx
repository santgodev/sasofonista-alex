"use client";

import Link from "next/link";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export function WhatsAppFloat() {
    const whatsappLink = getWhatsAppLink(WHATSAPP_MESSAGES.general);

    return (
        <Link
            href={whatsappLink}
            target="_blank"
            className="fixed bottom-6 right-6 z-50 animate-in fade-in zoom-in duration-500 delay-1000"
            aria-label="Chat en WhatsApp"
        >
            <div className="relative group">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75 group-hover:opacity-100 duration-1000" />
                <div className="relative flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg ring-1 ring-white/20 hover:bg-green-600 transition-colors">
                    <svg
                        viewBox="0 0 24 24"
                        width="28"
                        height="28"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                    >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
