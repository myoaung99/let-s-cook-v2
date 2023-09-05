import ParticlesComponent from '@/components/animations/Particles';
import { Hero } from '@/features/Hero';
import { MealPreviewList } from '@/features/MealPreview/MealPreviewList';

export default function Home() {
    return (
        <section className="mb-16">
            <div className="relative h-[600px] overflow-hidden">
                <Hero />
                <ParticlesComponent />
            </div>
            <MealPreviewList />
        </section>
    );
}
