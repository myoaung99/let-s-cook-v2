import { baseApi } from "@/services/controller";

export const recipesService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => `categories.php`,
        }),
        getAllCountries: build.query({
            query: () => `list.php?a=list`
        }),
        getMealsByCategory: build.query({
            query: (categoryId) => `filter.php?c=${categoryId}`
        }),
        getMealsByCountry: build.query({
            query: (country) => `filter.php?a=${country}`
        }),
        getMealById: build.query({
            query: (mealId)=> `lookup.php?i=${mealId}`
        })
    }),
    overrideExisting: false,
});

export const { getCategories, getMealsByCategory, getMealById, getAllCountries, getMealsByCountry } = recipesService.endpoints;
export const { useGetCategoriesQuery,
    useGetMealsByCategoryQuery,
    useGetMealByIdQuery,
    useGetAllCountriesQuery,
    useGetMealsByCountryQuery
} = recipesService;
