import {useRouter} from "next/router";
import {useEffect, useMemo} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {formSchema} from "@/features/Recipes/utils";


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
            if (filter === 'Country') {
                form.setValue('countrySelector', value)
            }

            if (filter === 'Ingredient') {
                form.setValue('ingredientSelector', value)
            }
        }
    }, [filter, value]);

    useEffect(() => {
        form.setValue("ingredientSelector", 'Chicken')
    }, [])

    return [form]
}