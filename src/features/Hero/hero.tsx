import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import React from 'react';

export const Hero = () => {
    const router = useRouter();

    const handleOnBrowse = () => {
        return router.push('/recipes?filter=category&value=chicken');
    };

    return (
        <div className="relative z-10 flex flex-col md:items-center justify-center h-full lg:pb-10 space-y-4">
            <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight md:text-center mb-2 md:mb-0">
                Embark on a Culinary Journey.&trade;
            </h1>
            <p className="md:w-3/5 md:text-center text-slate-600">
                Discover the finest flavors, expertly crafted dishes, and
                culinary secrets from around the world. Join us in savoring
                unforgettable tastes and creating delightful memories
            </p>
            <div className="pt-6 md:pt-4">
                <Button size="sm" onClick={handleOnBrowse}>
                    Browse Recipes
                </Button>
            </div>
        </div>
    );
};
