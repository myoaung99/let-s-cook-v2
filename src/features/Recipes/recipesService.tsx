import { baseApi } from "@/services/controller";
import {Category} from "@/types";

export const recipesService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => `categories.php`,
        }),
    }),
    overrideExisting: false,
});

export const { getCategories } = recipesService.endpoints;
export const { useGetCategoriesQuery } = recipesService;
