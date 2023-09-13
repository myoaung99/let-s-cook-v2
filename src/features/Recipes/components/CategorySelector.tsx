import {useGetCategoriesQuery} from "@/features/Recipes/components/recipesService";
import {skipToken} from "@reduxjs/toolkit/query";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ScrollArea} from "@/components/ui/scroll-area";
import React from "react";
import {UseFormReturn} from "react-hook-form";
import { Category} from "@/types";

const CategorySelector = ({form}: {
    form: UseFormReturn<{ filterBy: string, ingredientSelector: string, countrySelector: string, categorySelector: string }, any, undefined>
}) => {
    const {data} = useGetCategoriesQuery({skip: skipToken})
    const categories = data?.categories as Array<Category> | undefined

    return <FormField
        control={form.control}
        name="categorySelector"
        render={({field}) => (
            <FormItem className='w-full md:w-[250px]'>
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <ScrollArea
                                className="sm:h-[300px] md:h-[500px] w-auto rounded-md p-4 ">
                                {categories ? categories.map( category => (
                                    <SelectItem key={category.idCategory}
                                                value={category.strCategory}>{category.strCategory}
                                    </SelectItem>
                                )) : null}
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
    />
}

export {CategorySelector}