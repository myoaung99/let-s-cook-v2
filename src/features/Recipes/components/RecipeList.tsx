import React from 'react';
import RecipeFilters from "@/features/Recipes/components/RecipeFilters";
import {MealCard, MealCardLoadingList} from "@/components/MealCard";
import {useGetMealsByCountryQuery, useGetMealsByIngredientQuery} from "@/features/Recipes/components/recipesService";
import {useRouter} from "next/router";
import {skipToken} from "@reduxjs/toolkit/query";
import {Meal} from "@/types";
import { motion } from "framer-motion"
export const RecipeList = () => {
    return (
        <section>
            <RecipeFilters/>
            <MealList/>
        </section>
    );
}

const mealCardVariants = {
    hidden: {
        opacity: 0,
        translateX: -20
    },
    animate: {
        opacity: 1,
        translateX: 0
    }
}

const MealList = () => {
    const STAGGER_DELAY_IN_MILLISECOND = 0.08;
    const VIEWPORT_MARGIN_FROM_ALL_DIRECTIONS = '250px';

    const router = useRouter();
    const filter = router.query.filter;
    const value = router.query.value;

    const {data: countryMeals, isLoading: countryMealsLoading} = useGetMealsByCountryQuery(
        typeof value === "string" ? value : skipToken,
        {skip: router.isFallback})

    const {data: ingredientMeals, isLoading: ingredientMealsLoading} = useGetMealsByIngredientQuery(
        typeof value === "string" ? value : skipToken,
        {skip: router.isFallback})

    let mealsList = [];

    if (filter === "Country") {
        mealsList = countryMeals
    }
    if (filter === "Ingredient") {
        mealsList = ingredientMeals
    }

    return <>
        <section className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {countryMealsLoading || ingredientMealsLoading ? (<>
                <MealCardLoadingList count={8}/>
            </>) : null}

            {mealsList?.meals?.map((meal: Meal, index: number) => (
                <motion.div
                    variants={mealCardVariants}
                    initial={'hidden'}
                    whileInView={'animate'}
                    transition={{delay: STAGGER_DELAY_IN_MILLISECOND * index}}
                    viewport={{ once: true, margin: VIEWPORT_MARGIN_FROM_ALL_DIRECTIONS }}
                >
                    <MealCard
                        mealData={meal}
                        title={<MealCard.Title/>}
                        image={<MealCard.Image/>}
                        action={<MealCard.Button/>}
                    />
                </motion.div>
            ))}
        </section>
    </>;
};