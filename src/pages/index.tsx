import { Hero } from '@/features/Hero';
import { NextSeo } from 'next-seo';
import Script from 'next/script';
import dynamic from 'next/dynamic';

const Benefits = dynamic(() => import('../features/Benefits'));
const MealPreviewList = dynamic(
    () => import('../features/MealPreview/MealPreviewList')
);

export default function Home() {
    return (
        <>
            <NextSeo
                title="Let's Cook"
                description="Explore a world of recipes on our Next.js site. From savory dishes to sweet treats, find culinary inspiration here!"
                canonical="https://lets-cook-v2.vercel.app/"
                openGraph={{
                    url: 'https://lets-cook-v2.vercel.app/',
                    title: "Let's Cook - Open Graph",
                    description:
                        'This is a recipe finder website built by Next.js - Open Graph Description',
                    images: [
                        {
                            url: 'https://lets-cook-v2.vercel.app/static/home-preview-800-600.png',
                            width: 800,
                            height: 600,
                            alt: "Let's Cook page - Og Image Alt",
                        },
                        {
                            url: 'https://lets-cook-v2.vercel.app/static/home-preview-900-800.png',
                            width: 900,
                            height: 800,
                            alt: "Let's Cook page - Og Image Alt",
                        },
                        {
                            url: 'https://lets-cook-v2.vercel.app/static/home-preview.png',
                        },
                    ],
                }}
                additionalMetaTags={[
                    {
                        name: 'keywords',
                        content:
                            'aung, browse, cake, cheesecake, chicken, cook, crafted, creating, culinary, delightful, designed, developed, discover, dishes, embark, expertly, finest, flavors, fried, general, home, honey, join, journey, kentucky, madeira, meals, memories, menu, myint, popular, recipes, reserved, rights, savoring, secrets, tastes, today, unforgettable, view, world, yogurt',
                    },
                ]}
            />

            <section className="mb-16">
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=G-5P4C2YF2MT`}
                />
                <Script id="google-analytics">
                    {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5P4C2YF2MT');
        `}
                </Script>
                <div className="relative mt-8 md:mt-7 lg:mt-12 h-[550px] overflow-hidden">
                    <Hero />
                </div>
                <Benefits />
                <MealPreviewList />
            </section>
        </>
    );
}
