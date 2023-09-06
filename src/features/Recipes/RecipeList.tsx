import React from 'react';
import RecipeFilters from "@/features/Recipes/RecipeFilters";
import {MealCard, MealCardLoadingList} from "@/components/Meal";
import {useGetMealsByCategoryQuery, useGetMealsByCountryQuery} from "@/features/Recipes/recipesService";
import {useRouter} from "next/router";
import {skipToken} from "@reduxjs/toolkit/query";
import {Meal} from "@/types";

export const RecipeList = () => {
    return (
        <section>
            <RecipeFilters/>
            <MealList/>
        </section>
    );
}

const MealList = () => {
    const router = useRouter();
    const filter = router.query.filter;
    const value = router.query.value;

    const {data: countryMeals, isLoading: countryMealsLoading} = useGetMealsByCountryQuery(
        typeof value === "string" ? value : skipToken,
        {skip: router.isFallback})

    let mealsList = [];

    if(filter === "Country"){
        mealsList = countryMeals
    }

    return <section className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {countryMealsLoading ? (<>
            <MealCardLoadingList count={8}/>
        </>) : null}

        {mealsList?.meals?.map((meal: Meal) => (
            <MealCard key={meal.idMeal} title={meal.strMeal} id={meal.idMeal} imgUrl={meal.strMealThumb}/>
        ))}
    </section>;
};