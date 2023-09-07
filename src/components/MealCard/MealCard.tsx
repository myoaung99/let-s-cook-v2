import React, {ReactNode} from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader, CardTitle,
} from "@/components/ui/card"
import MealCardProvider, {useMealCard} from "@/components/MealCard/MealCardContext";
import {SuggestionMeal} from "@/types";
import Image from "next/image";
import {useRouter} from "next/router";
import {Button} from "@/components/ui/button";

interface MealCardProps {
    title?: ReactNode;
    image?: ReactNode;
    action?: ReactNode;
    mealData: SuggestionMeal
}

export function MealCard({mealData, title, image, action}: MealCardProps) {
    return (
        <MealCardProvider value={mealData}>
            <Card>
                <CardHeader>
                    {title}
                </CardHeader>
                <CardContent className="mx-6 relative aspect-square">
                    {image}
                </CardContent>
                <br/>
                <CardFooter>
                    {action}
                </CardFooter>
            </Card>
        </MealCardProvider>
    );
}

const MealCardTitle = () => {
    const {strMeal} = useMealCard();
    return (
        <CardTitle className='text-lg line-clamp-1'>{strMeal}</CardTitle>
    );
}


const MealCardImage = () => {
    const {strMealThumb} = useMealCard()
    return (
        <Image
            fill
            src={strMealThumb}
            className="object-cover mx-auto rounded"
            alt="meal suggestion"
        />
    );
}

const MealCardButton = () => {
    const {idMeal} = useMealCard()
    const router = useRouter()
    const handleOnClick = () => {
        router.push(`/recipes/${idMeal}`)
    }
    return (
        <Button className='w-full' onClick={handleOnClick} variant='default'>View Detail</Button>
    );
}

MealCard.Title = MealCardTitle
MealCard.Image = MealCardImage
MealCard.Button = MealCardButton

