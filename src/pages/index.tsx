import {Counter} from '@/features/counter';
import {Inter} from 'next/font/google';
import {MealPreviewList} from "@/features/MealPreview/MealPreviewList";

const inter = Inter({subsets: ['latin']});

export default function Home() {
    return (
        <section>
            <MealPreviewList/>
        </section>
    );
}
