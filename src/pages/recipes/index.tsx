import React from 'react';
import { wrapper } from '@/app/store';
import { getRunningQueriesThunk } from '@/services/controller';
import { RecipeList } from '@/features/Recipes';
import {
    getAllCountries, getAllIngredient,
    getCategories,
    getMealsByCategory, getMealsByCountry, getMealsByIngredient,
} from '@/features/Recipes/recipesService';

const Recipes = () => {
    return (
        <section className="mb-16">
            <RecipeList />
        </section>
    );
};

export default Recipes;

export const getStaticProps = wrapper.getStaticProps(
    (store) => async (context) => {
        store.dispatch(getCategories.initiate(''));
        store.dispatch(getAllCountries.initiate(''));
        store.dispatch(getAllIngredient.initiate(''));

        const value = context.params?.value;
        const filterBy = context.params?.filter;

        if (typeof value === 'string' && filterBy === 'category') {
            store.dispatch(getMealsByCategory.initiate(value));
        }

        if (typeof value === 'string' && filterBy === 'Country') {
            store.dispatch(getMealsByCountry.initiate(value));
        }

        if (typeof value === 'string' && filterBy === 'Ingredient') {
            store.dispatch(getMealsByIngredient.initiate(value));
        }

        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {},
            revalidate: 24 * 60 * 60 * 90,
        };
    }
);
