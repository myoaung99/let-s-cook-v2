import * as z from "zod";

export const formSchema = z.object({
    filterBy: z.string().min(1),
    ingredientSelector: z.string().min(1),
    countrySelector: z.string().min(1),
})
