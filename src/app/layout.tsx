import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Saxofonista Alex Galindo | Bodas y Eventos en Bogotá - Colombia",
    template: "%s | Saxofonista Alex Galindo",
  },
  description: "Saxofonista Alex Galindo - Músico profesional en Bogotá, Colombia. Especialista en bodas, eventos corporativos y fiestas privadas. Elegancia y experiencia musical.",
  keywords: ["Saxofonista Bogotá", "Saxofonista Colombia", "Alex Galindo", "Bodas Bogotá", "Música en vivo Colombia", "Saxofonista Eventos", "Jazz", "House", "DJ Sax"],
  authors: [{ name: "Alex Galindo" }],
  creator: "Alex Galindo",
  metadataBase: new URL("https://alexsaxofonista.com"), // Placeholder domain
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    title: "Saxofonista Alex | Experiencia Musical Premium",
    description: "Eleva tu evento con la mejor música en vivo. Saxofón, elegancia y atmósfera inolvidable.",
    siteName: "Saxofonista Alex",
    images: [
      {
        url: "/images/saxo.png",
        width: 1200,
        height: 630,
        alt: "Saxofonista Alex Actuación en Vivo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saxofonista Alex | Eventos Exclusivos",
    description: "Música en vivo para bodas y eventos premium. Saxofón y elegancia.",
    images: ["/images/saxo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${lato.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
