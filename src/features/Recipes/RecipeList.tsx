import React from 'react';
import RecipeFilters from "@/features/Recipes/RecipeFilters";
import {MealCard} from "@/components/Meal";
import {useGetMealsByCategoryQuery} from "@/features/Recipes/recipesService";
import {useRouter} from "next/router";
import {skipToken} from "@reduxjs/toolkit/query";
import {Meal} from "@/types";

export const RecipeList = () => {
    return (
        <div>
            <RecipeFilters/>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                <MealList/>
            </div>
        </div>
    );
}

const MealList = () => {
    const router = useRouter();
    const value = router.query.value;

    const {data, isLoading} = useGetMealsByCategoryQuery(
        typeof value === "string" ? value : skipToken,
        {skip: router.isFallback})

    return data?.meals?.map((meal: Meal) => (
        <MealCard key={meal.idMeal} title={meal.strMeal} id={meal.idMeal} imgUrl={meal.strMealThumb}/>
    ));
};