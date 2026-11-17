/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '', // No prefixs
    trailingSlash: false,
    poweredByHeader: false,
    
    // Asset optimization
    images: {
        unoptimized: true, // Temp
    },

    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), geolocation=(), microphone=()' },
                    { key: 'Content-Security-Policy', value: "object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'" },
                ],
            },
        ];
    },
}

module.exports = nextConfig
