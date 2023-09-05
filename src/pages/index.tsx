import ParticlesComponent from '@/components/animations/Particles';
import { Hero } from '@/features/Hero';
import { MealPreviewList } from '@/features/MealPreview/MealPreviewList';
import {NextSeo} from "next-seo";

export default function Home() {
    return (
        <>
            <NextSeo
                title="Let's Cook"
                description="This is recipe finder website built by Next.js"
                canonical="https://lets-cook-v2.vercel.app/"
                openGraph={{
                    url: 'https://lets-cook-v2.vercel.app/',
                    title: 'Let\'s Cook - Open Graph',
                    description: 'This is recipe finder website built by Next.js - Open Graph Description',
                    images: [
                        {
                            url: '/home-preview-800-600.png',
                            width: 800,
                            height: 600,
                            alt: 'Let\'s Cook page - Og Image Alt',
                        },
                        {
                            url: '/home-preview-900-800.png',
                            width: 900,
                            height: 800,
                            alt: 'Let\'s Cook page - Og Image Alt',
                        },
                        { url: '/home-preview.png' },
                    ],
                }}
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
