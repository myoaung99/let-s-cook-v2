import {useMealCard} from "@/components/MealCard/MealCardContext";
import {CardTitle} from "@/components/ui/card";
import React from "react";

export const MealCardTitle = () => {
    const {strMeal} = useMealCard();
    return (
        <CardTitle className='text-lg line-clamp-1'>{strMeal}</CardTitle>
    );
}