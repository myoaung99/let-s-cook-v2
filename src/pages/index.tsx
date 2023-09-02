import {Counter} from '@/features/counter';
import {Inter} from 'next/font/google';

const inter = Inter({subsets: ['latin']});

export default function Home() {
    return (
        <section className="container">
            <Counter/>
        </section>
    );
}
