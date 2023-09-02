import React from 'react';
import * as meals from '@/data/meals.json'
import {MealCard} from "@/components/Meal";
import {SuggestionMeal} from "@/types";

const dummyData = [
    {name: 'abc', imgUrl: 'http://abc.com', id: 'abc'}
]

export const MealPreviewList = ()=> {
    const PopularMeals = () => {
        return meals.popularMeals.map((meal: SuggestionMeal) => (
            <MealCard key={meal.id} title={meal.title} id={meal.id} imgUrl={meal.imgUrl}/>
        ));
    };

    const SuggestionMeals = () => {
        return meals.suggestionMeals.map((meal) => (
            <MealCard key={meal.id} title={meal.title} id={meal.id} imgUrl={meal.imgUrl}/>
        ));
    };
    return (
        <section className="mx-auto pt-24 h-screen max-h-screen">
            <h1 className="text-center text-4xl">What's is on your mind?</h1>

            <div className="my-14">
                <h4 className="text-2xl mb-5 lg:pl-10 xl:pl-0">
                    Today's Popular Meals
                </h4>
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                    {<PopularMeals />}
                </div>
            </div>
        </section>
    );
}

