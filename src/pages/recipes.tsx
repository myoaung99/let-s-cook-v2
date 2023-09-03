import React from 'react';
import { wrapper } from '@/app/store';
import { getRunningQueriesThunk } from '@/services/controller';
import { RecipeList } from '@/features/Recipes';
import {
    getCategories,
    getMealsByCategory,
} from '@/features/Recipes/recipesService';

const Recipes = () => {
    return (
        <>
            <RecipeList />
        </>
    );
};

export default Recipes;

export const getStaticProps = wrapper.getStaticProps(
    (store) => async (context) => {
        const value = context.params?.value;
        store.dispatch(getCategories.initiate(''));
        if (typeof value === 'string') {
            store.dispatch(getMealsByCategory.initiate(value));
        }
        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {},
            revalidate: 24 * 60 * 60 * 30,
        };
    }
);
