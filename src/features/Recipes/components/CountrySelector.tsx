import {useRouter} from "next/router";
import {useGetAllCountriesQuery} from "@/features/Recipes/components/recipesService";
import {Area} from "@/types";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ScrollArea} from "@/components/ui/scroll-area";
import React from "react";
import {UseFormReturn} from "react-hook-form";

export const CountrySelector = ({form}: { form:  UseFormReturn<{ categorySelector: string, filterBy: string, ingredientSelector: string, countrySelector: string}, any, undefined> }) => {
    const router = useRouter();
    const {data: countryData} = useGetAllCountriesQuery({skip: router.isFallback})
    const countries = countryData?.meals as Array<Area> | undefined

    return (
        <FormField
            control={form.control}
            name="countrySelector"
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
                                    {countries?.map(country => (
                                        <SelectItem key={country.strArea}
                                                    value={country.strArea}>{country.strArea}
                                        </SelectItem>
                                    ))}
                                </ScrollArea>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}