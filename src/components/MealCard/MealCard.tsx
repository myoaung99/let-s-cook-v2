import React, {ReactNode} from 'react';
import {Card, CardContent, CardFooter, CardHeader,} from "@/components/ui/card"
import MealCardProvider from "@/components/MealCard/MealCardContext";
import {SuggestionMeal} from "@/types";
import {MealCardTitle, MealCardButton, MealCardImage} from "@/components/MealCard";

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

MealCard.Title = MealCardTitle
MealCard.Image = MealCardImage
MealCard.Button = MealCardButton

