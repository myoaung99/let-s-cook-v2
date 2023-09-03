import { baseApi } from "@/services/controller";
import {Category} from "@/types";

export const recipesService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => `categories.php`,
        }),
        getMealsByCategory: build.query({
            query: (payload) => {
                console.log(payload)
                return `filter.php?c=${payload}`
            }
        })
    }),
    overrideExisting: false,
});

export const { getCategories, getMealsByCategory } = recipesService.endpoints;
export const { useGetCategoriesQuery, useGetMealsByCategoryQuery } = recipesService;
