import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useInitialFilterValues } from '@/features/Recipes/hook/useInitialFilterValues';
import { FILTER_VALUES, formSchema } from '@/features/Recipes/utils';
import { IngredientSelector } from '@/features/Recipes/components/IngredientSelector';
import { CountrySelector } from '@/features/Recipes/components/CountrySelector';
import { FilterBySelect } from '@/features/Recipes/components/FilterBySelect';
import { CategorySelector } from '@/features/Recipes/components/CategorySelector';
import { FormProvider } from 'react-hook-form';

const RecipeFilters = () => {
    const router = useRouter();
    const [form] = useInitialFilterValues();
    const { watch, handleSubmit } = form;
    const watchFilterBy = watch('filterBy');

    const handleOnSearch = (values: z.infer<typeof formSchema>) => {
        if (values.filterBy === FILTER_VALUES.Country) {
            router.push(
                `/recipes?filter=${values.filterBy}&value=${values.countrySelector}`
            );
        }

        if (values.filterBy === FILTER_VALUES.Ingredient) {
            router.push(
                `/recipes?filter=${values.filterBy}&value=${values.ingredientSelector}`
            );
        }

        if (values.filterBy === FILTER_VALUES.Category) {
            router.push(
                `/recipes?filter=${values.filterBy}&value=${values.categorySelector}`
            );
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(handleOnSearch)}>
                <FormProvider {...form}>
                    <section className="md:flex md:justify-between md:items-end py-4 mb-5">
                        <div
                            className={
                                'flex flex-col md:flex-row gap-2 md:items-center md:gap-4'
                            }
                        >
                            <Label htmlFor={'filterBy'}>Filter by</Label>
                            <div
                                key={watchFilterBy}
                                className="flex items-center gap-3 mb-3 md:mb-0"
                            >
                                <FilterBySelect />
                            </div>
                        </div>

                        <div className="space-y-3 md:space-y-0 md:flex md:items-center md:space-x-2">
                            {watchFilterBy === FILTER_VALUES.Ingredient ? (
                                <IngredientSelector />
                            ) : null}

                            {watchFilterBy === FILTER_VALUES.Country ? (
                                <CountrySelector />
                            ) : null}

                            {watchFilterBy === FILTER_VALUES.Category ? (
                                <CategorySelector />
                            ) : null}

                            <div className="flex justify-end">
                                <Button type="submit">Search</Button>
                            </div>
                        </div>
                    </section>
                </FormProvider>
            </form>
        </Form>
    );
};

export default RecipeFilters;
