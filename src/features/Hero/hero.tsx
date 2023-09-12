import {Button} from '@/components/ui/button';
import {useRouter} from 'next/router';
import React, {useRef} from 'react';
import Image from "next/image";
import Background from '/public/static/hero-bg-2.jpg'
import {motion, useScroll, useTransform} from "framer-motion";

export const Hero = () => {
    const router = useRouter();
    const ref = useRef(null)
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
    const textY = useTransform(scrollYProgress, [0, 1], ['-5%', '60%'])

    const handleOnBrowse = () => {
        return router.push('/recipes?filter=Country&value=American');
    };

    return (
        <div
            ref={ref}
            className='h-full'
        >
            <motion.section
                id='hero'
                style={{y: textY}}
                className="relative z-10 flex flex-col md:items-center justify-center h-full space-y-4 px-4 md:px-0">
                <h2 className="text-slate-900 font-extrabold text-3xl lg:text-5xl tracking-tight md:text-center mb-2 md:mb-0">
                    Embark on a Culinary Journey.&trade;
                </h2>
                <p className="md:w-3/5 md:text-center text-slate-600">
                    {HeroDescription}
                </p>
                <div className="pt-2 md:pt-4">
                    <Button size="sm" onClick={handleOnBrowse}>
                        Browse Recipes
                    </Button>
                </div>
            </motion.section>

            <motion.div
                style={{y: backgroundY}}
                className="relative"
            >
                <Image
                    src={Background}
                    alt={'background image'}
                    layout={'fill'}
                    objectFit={'cover'}
                    objectPosition={'center'}
                    className={'absolute -z-10'}
                    priority={true}
                    placeholder={'blur'}
                />
            </motion.div>
            <Image
                src={Background}
                alt={'background image'}
                layout={'fill'}
                objectFit={'cover'}
                objectPosition={'center'}
                className={'absolute -z-10'}
                priority={true}
                placeholder={'blur'}
            />
        </div>

    );
};

const HeroDescription = "Discover the finest flavors, expertly crafted dishes, and culinary secrets from around the world. Join us in savoring unforgettable tastes and creating delightful memories"