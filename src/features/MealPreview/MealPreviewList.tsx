import React from 'react';
import * as meals from '@/data/meals.json'
import {SuggestionMeal} from "@/types";
import {MealCard} from "@/components/MealCard";

const MealPreviewList = () => {
    return (
        <section className='md:pt-8'>
            <div className='flex justify-between items-center mb-2'>
                <p className="text-xl mb-2 lg:pl-10 xl:pl-0 font-bold">
                    Today's Popular Meals
                </p>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <PopularMeals/>
            </div>
        </section>
    );
}

export default MealPreviewList

const PopularMeals = () => {
    return meals.popularMeals.map((meal: SuggestionMeal) => (
        <MealCard
            key={meal.idMeal}
            mealData={meal}
            title={<MealCard.Title/>}
            image={<MealCard.Image/>}
            action={<MealCard.Button/>}
        />
    ));
};