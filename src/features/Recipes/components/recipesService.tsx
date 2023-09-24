import { baseApi } from '@/services/controller';

export const recipesService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => `categories.php`,
        }),
        getAllCountries: build.query({
            query: () => `list.php?a=list`,
        }),
        getAllIngredient: build.query({
            query: () => `list.php?i=list`,
        }),
        getMealsByCategory: build.query({
            query: (categoryId) => `filter.php?c=${categoryId}`,
        }),
        getMealsByCountry: build.query({
            query: (country) => `filter.php?a=${country}`,
        }),
        getMealById: build.query({
            query: (mealId) => `lookup.php?i=${mealId}`,
        }),
        getMealsByIngredient: build.query({
            query: (ingredient) => `filter.php?i=${ingredient}`,
        }),
    }),
    overrideExisting: false,
});

export const {
    getCategories,
    getMealsByCategory,
    getMealById,
    getAllCountries,
    getMealsByCountry,
    getAllIngredient,
    getMealsByIngredient,
} = recipesService.endpoints;
export const {
    useGetCategoriesQuery,
    useGetMealsByCategoryQuery,
    useGetMealByIdQuery,
    useGetAllCountriesQuery,
    useGetMealsByCountryQuery,
    useGetAllIngredientQuery,
    useGetMealsByIngredientQuery,
} = recipesService;
