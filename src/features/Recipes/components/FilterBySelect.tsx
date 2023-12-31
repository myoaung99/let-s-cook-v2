import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { UseFormReturn, useFormContext } from 'react-hook-form';
import { FILTER_VALUES } from '@/features/Recipes/utils';

export const FilterBySelect = () => {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name="filterBy"
            render={({ field }) => (
                <FormItem className="w-full md:w-[200px]">
                    <FormControl>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Object.keys(FILTER_VALUES).map((value) => (
                                    <SelectItem key={value} value={value}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
