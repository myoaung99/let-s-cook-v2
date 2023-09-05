import ParticlesComponent from '@/components/animations/Particles';
import { Hero } from '@/features/Hero';
import { MealPreviewList } from '@/features/MealPreview/MealPreviewList';
import {NextSeo} from "next-seo";

export default function Home() {
    return (
        <>
            <NextSeo
                title="Let's Cook"
                description="Explore a world of recipes on our Next.js site. From savory dishes to sweet treats, find culinary inspiration here!"
                canonical="https://lets-cook-v2.vercel.app/"
                openGraph={{
                    url: 'https://lets-cook-v2.vercel.app/',
                    title: 'Let\'s Cook - Open Graph',
                    description: 'This is a recipe finder website built by Next.js - Open Graph Description',
                    images: [
                        {
                            url: 'https://lets-cook-v2.vercel.app/home-preview-800-600.png',
                            width: 800,
                            height: 600,
                            alt: 'Let\'s Cook page - Og Image Alt',
                        },
                        {
                            url: 'https://lets-cook-v2.vercel.app/home-preview-900-800.png',
                            width: 900,
                            height: 800,
                            alt: 'Let\'s Cook page - Og Image Alt',
                        },
                        { url: 'https://lets-cook-v2.vercel.app/home-preview.png' },
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
                <div className="relative h-[600px] overflow-hidden">
                    <Hero />
                    <ParticlesComponent />
                </div>
                <MealPreviewList />
            </section>
        </>

    );
}
