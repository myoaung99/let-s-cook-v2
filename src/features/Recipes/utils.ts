import * as z from "zod";

export enum FILTER_VALUES {Ingredient = 'Ingredient', Country = 'Country', Category = 'Category'}

export const formSchema = z.object({
    filterBy: z.string().min(1),
    ingredientSelector: z.string().min(1),
    countrySelector: z.string().min(1),
    categorySelector: z.string().min(1)
})
