import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://alexsaxofonista.com'}/sitemap.xml`,

    }
}
