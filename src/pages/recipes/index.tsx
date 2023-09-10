import React from 'react';
import { wrapper } from '@/app/store';
import { getRunningQueriesThunk } from '@/services/controller';
import { RecipeList } from '@/features/Recipes';
import {
    getAllCountries, getAllIngredient,
    getCategories,
    getMealsByCategory, getMealsByCountry, getMealsByIngredient,
} from '@/features/Recipes/components/recipesService';
import {NextSeo} from "next-seo";

const Recipes = () => {
    return (
        <section className="mb-16">
            <NextSeo
                title="Find recipes"
                description="Explore a world of recipes on our Next.js site. From savory dishes to sweet treats, find culinary inspiration here!"
                canonical="https://lets-cook-v2.vercel.app/recipes"
                openGraph={{
                    url: 'https://lets-cook-v2.vercel.app/recipes',
                    title: 'Get Recipes',
                    description: 'This is a recipe finder website built by Next.js - Open Graph Description',
                    images: [
                        {
                            url: 'https://lets-cook-v2.vercel.app/static/home-preview-800-600.png',
                            width: 800,
                            height: 600,
                            alt: 'Let\'s Cook page - Og Image Alt',
                        },
                        {
                            url: 'https://lets-cook-v2.vercel.app/static/home-preview-900-800.png',
                            width: 900,
                            height: 800,
                            alt: 'Let\'s Cook page - Og Image Alt',
                        },
                        {url: 'https://lets-cook-v2.vercel.app/static/home-preview.png'},
                    ],
                }}
                additionalMetaTags={[
                    {
                        name: 'keywords',
                        content:
                            'aung, browse, cake, cheesecake, chicken, cook, crafted, creating, culinary, delightful, designed, developed, discover, dishes, embark, expertly, finest, flavors, fried, general, home, honey, join, journey, kentucky, madeira, meals, memories, menu, myint, popular, recipes, reserved, rights, savoring, secrets, tastes, today, unforgettable, view, world, yogurt',
                    },
                ]}
            />            <RecipeList />
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
