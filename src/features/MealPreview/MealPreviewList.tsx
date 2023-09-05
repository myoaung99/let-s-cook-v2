import React from 'react';
import * as meals from '@/data/meals.json'
import {MealCard} from "@/components/Meal";
import {SuggestionMeal} from "@/types";
import {Button} from "@/components/ui/button";

export const MealPreviewList = ()=> {


    return (
        <section className='mt-6'>
                <div className='flex justify-between items-center mb-2'>
                    <h4 className="text-xl mb-5 lg:pl-10 xl:pl-0">
                        Today's Popular Meals
                    </h4>
                    {/*<Button variant='secondary'>View All</Button>*/}
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <PopularMeals />
                </div>
        </section>
    );
}

const PopularMeals = () => {
    return meals.popularMeals.map((meal: SuggestionMeal) => (
        <MealCard key={meal.id} title={meal.title} id={meal.id} imgUrl={meal.imgUrl}/>
    ));
};