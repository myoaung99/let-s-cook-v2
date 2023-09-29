/** @type {import('next').NextConfig} */
// @ts-check
const withOffline = require('next-offline')
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    const apiUrl = isDev
        ? process.env.DEV_API_ROUTE
        : process.env.PRODUCTION_API_ROUTE;

    const env = {
       API_URL: apiUrl,
    };

    return {
        reactStrictMode: true,
        env,
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
};

