import React from 'react';
import {wrapper} from "@/app/store";
import {getRunningQueriesThunk} from "@/services/controller";
import {RecipeList} from "@/features/Recipes";
import {getCategories} from "@/features/Recipes/recipesService";

const Recipes = () => {
    return (
        <>
            <RecipeList/>
        </>
    );
}

export default Recipes;

export const getStaticProps = wrapper.getStaticProps(
    (store) => async (context) => {
        store.dispatch(getCategories.initiate(''))
        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {},
            revalidate: 24 * 60 * 60 * 10
        };
    }
);
