import {useRouter} from "next/router";
import {useGetMealByIdQuery} from "@/features/Recipes/components/recipesService";
import {skipToken} from "@reduxjs/toolkit/query";
import {useCallback, useMemo} from "react";
import {Measurement} from "@/features/MealDetail/components/MealIngredients";
import {getRecipeIngredientMeasures} from "@/features/MealDetail/utils";

export const useGetMealData = () => {
    const router = useRouter()
    const recipeId = router.query?.recipeId;
    const {data, isLoading} = useGetMealByIdQuery(
        typeof recipeId === "string" ? recipeId : skipToken,
        {skip: router.isFallback})

    const mealDetailData = useMemo(() => data?.meals[0], [data])

    const getMealIngredientMeasures = useCallback(() => {
        return getRecipeIngredientMeasures(mealDetailData) as Array<Measurement> | undefined | null
    }, [mealDetailData])

    return {data, isLoading, getMealIngredientMeasures, mealDetailData, router, recipeId}
}