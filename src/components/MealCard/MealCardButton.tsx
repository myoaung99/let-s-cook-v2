import {useMealCard} from "@/components/MealCard/MealCardContext";
import {useRouter} from "next/router";
import {Button} from "@/components/ui/button";
import React from "react";

export const MealCardButton = () => {
    const {idMeal} = useMealCard()
    const router = useRouter()
    const handleOnClick = () => {
        router.push(`/recipes/${idMeal}`)
    }
    return (
        <Button className='w-full' onClick={handleOnClick} variant='default'>View Detail</Button>
    );
}