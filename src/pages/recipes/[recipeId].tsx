import {wrapper} from "@/app/store";
import {getRunningQueriesThunk} from "@/services/controller";
import {getMealById, useGetMealByIdQuery} from "@/features/Recipes/components/recipesService";
import {MealDetail} from "@/features/MealDetail";
import {NextSeo} from "next-seo";
import React from "react";
import {skipToken} from "@reduxjs/toolkit/query";
import {useRouter} from "next/router";

const RecipeDetail = () => {
    const router = useRouter()
    const recipeId = router.query?.recipeId;

    const {data} = useGetMealByIdQuery(
        typeof recipeId === "string" ? recipeId : skipToken,
        {skip: router.isFallback})

    const mealDetailData = data?.meals[0]

    return <>
        <NextSeo
            title={mealDetailData?.strMeal}
            description={`${mealDetailData?.strArea}, ${mealDetailData?.strCategory}, ${mealDetailData?.strArea}`}
            canonical="https://lets-cook-v2.vercel.app/recipes/*"
            openGraph={{
                url: 'https://lets-cook-v2.vercel.app/recipes/*',
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
                    content: mealDetailData?.strTags
                },
            ]}
        />
        <MealDetail/>
    </>
}

export default RecipeDetail;

export const getStaticPaths = async () => {
    return {
        paths: [
            {params:{recipeId: '53007'}},
            {params:{recipeId: '53007'}},
            {params:{recipeId: '52900'}},
            {params:{recipeId: '52813'}},
        ],
        fallback: 'blocking', // false or "blocking"
    }
}

export const getStaticProps = wrapper.getStaticProps(
    (store) => async (context) => {
        const recipeId = context.params?.recipeId;
        if (typeof recipeId === 'string') {
            store.dispatch(getMealById.initiate(recipeId))
        }
        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {},
            revalidate: 24 * 60 * 60 * 90,
        };
    }
);
