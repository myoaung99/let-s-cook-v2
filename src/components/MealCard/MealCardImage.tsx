import { useMealCard } from '@/components/MealCard/MealCardContext';
import Image from 'next/image';
import React from 'react';

export const MealCardImage = () => {
    const { strMealThumb } = useMealCard();
    return (
        <Image
            fill
            src={strMealThumb}
            className="object-cover mx-auto rounded"
            alt="meal suggestion"
        />
    );
};
