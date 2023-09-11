import {useRouter} from "next/router";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {FILTER_VALUES, formSchema} from "@/features/Recipes/utils";


export const useInitialFilterValues = () => {
    const router = useRouter();
    const filter = router.query.filter as string;
    const value = router.query.value as string;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {}
    })

    useEffect(() => {
        if (!!filter && !!value) {
            form.setValue('filterBy', filter)
            if (filter === FILTER_VALUES.Country) {
                form.setValue('countrySelector', value)
            }

            if (filter === FILTER_VALUES.Ingredient) {
                form.setValue('ingredientSelector', value)
            }

            if (filter === FILTER_VALUES.Category) {
                form.setValue('categorySelector', value)
            }
        }
    }, [filter, value]);

    useEffect(() => {
        form.setValue("ingredientSelector", 'Chicken')
        form.setValue("categorySelector", 'Beef')
        form.setValue("countrySelector", 'American')
    }, [])

    return [form]
}