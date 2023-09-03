import { baseApi } from "@/services/controller";
import {Category} from "@/types";

export const recipesService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => `categories.php`,
        }),
        getMealsByCategory: build.query({
            query: (categoryId) => `filter.php?c=${categoryId}`
        }),
        getMealById: build.query({
            query: (mealId)=> `lookup.php?i=${mealId}`
        })
    }),
    overrideExisting: false,
});

export const { getCategories, getMealsByCategory, getMealById } = recipesService.endpoints;
export const { useGetCategoriesQuery,
    useGetMealsByCategoryQuery,
    useGetMealByIdQuery
} = recipesService;
