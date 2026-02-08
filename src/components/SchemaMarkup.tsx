"use client";

import Script from "next/script";

export function SchemaMarkup() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Alex Galindo Saxofonista",
        "image": "https://alexsaxofonista.com/images/saxo.png",
        "@id": "https://alexsaxofonista.com",
        "url": "https://alexsaxofonista.com",
        "telephone": "+573132863989",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Colombia",
            "addressLocality": "Bogotá",
            "addressRegion": "Colombia",
            "postalCode": "110111",
            "addressCountry": "CO"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 4.6097,
            "longitude": -74.0817
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            "https://www.instagram.com/saxofonistaalexgalindo/"
        ],
        "description": "Saxofonista profesional en Bogotá especializado en bodas, eventos corporativos y clases de música."
    };

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
