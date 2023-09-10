import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";
import {UseFormReturn} from "react-hook-form";

export const FilterBySelect = ({form}: { form:  UseFormReturn<{filterBy: string, ingredientSelector: string, countrySelector: string}, any, undefined> }) => (
    <FormField
        control={form.control}
        name="filterBy"
        render={({field}) => (
            <FormItem className='w-full md:w-[200px]'>
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value={'Ingredient'}>{'Ingredient'}</SelectItem>
                            <SelectItem value={'Country'}>{'Country'}</SelectItem>
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )
        }
    />
)