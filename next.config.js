/** @type {import('next').NextConfig} */
// @ts-check
const withOffline = require('next-offline')

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['www.themealdb.com', 'www.themealdb.com/images/media/meals', 'img.clerk.com']
    },
    workboxOpts: {
        swDest: process.env.NEXT_EXPORT
            ? 'service-worker.js'
            : 'static/service-worker.js',
        runtimeCaching: [
            {
                urlPattern: /^https?.*/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'offlineCache',
                    expiration: {
                        maxEntries: 200,
                    },
                },
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/service-worker.js',
                destination: '/_next/static/service-worker.js',
            },
        ]
    },
};

module.exports = nextConfig;
