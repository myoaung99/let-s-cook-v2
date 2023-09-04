import React from 'react';
import RecipeFilters from "@/features/Recipes/RecipeFilters";
import {MealCard, MealCardLoadingList} from "@/components/Meal";
import {useGetMealsByCategoryQuery} from "@/features/Recipes/recipesService";
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
    const value = router.query.value;

    const {data, isLoading} = useGetMealsByCategoryQuery(
        typeof value === "string" ? value : skipToken,
        {skip: router.isFallback})

    return <section className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {isLoading ? (<>
            <MealCardLoadingList count={8}/>
        </>) : null}

        {data?.meals?.map((meal: Meal) => (
            <MealCard key={meal.idMeal} title={meal.strMeal} id={meal.idMeal} imgUrl={meal.strMealThumb}/>
        ))}
    </section>;
};