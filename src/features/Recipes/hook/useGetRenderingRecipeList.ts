import {useRouter} from "next/router";
import {
    useGetMealsByCategoryQuery,
    useGetMealsByCountryQuery,
    useGetMealsByIngredientQuery
} from "@/features/Recipes/components/recipesService";
import {skipToken} from "@reduxjs/toolkit/query";
import {FILTER_VALUES} from "@/features/Recipes/utils";

export const useGetRenderingRecipeList = ()=>{
    const router = useRouter();
    const filter = router.query.filter;
    const value = router.query.value;

    const {data: countryMeals, isLoading: countryMealsLoading} = useGetMealsByCountryQuery(
        typeof value === "string" ? value : skipToken,
        {skip: router.isFallback})

    const {data: ingredientMeals, isLoading: ingredientMealsLoading} = useGetMealsByIngredientQuery(
        typeof value === "string" ? value : skipToken,
        {skip: router.isFallback})

    const {data: categoryMeals, isLoading: categoryMealsLoading} = useGetMealsByCategoryQuery(
        typeof value === "string" ? value : skipToken,
        {skip: router.isFallback})

    let recipesList = [];

    if (filter === FILTER_VALUES.Country) {
        recipesList = countryMeals
    }
    if (filter === FILTER_VALUES.Ingredient) {
        recipesList = ingredientMeals
    }

    if (filter === FILTER_VALUES.Category) {
        recipesList = categoryMeals
    }

    const isLoading = countryMealsLoading || ingredientMealsLoading || categoryMealsLoading

    return {
        recipesList,
        isLoading
    }
}