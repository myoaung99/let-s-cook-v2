import {useRouter} from "next/router";
import {useGetMealByIdQuery} from "@/features/Recipes/recipesService";
import {skipToken} from "@reduxjs/toolkit/query";
import {getRecipeIngredientMeasures} from "@/features/MealDetail/utils";
import {ScrollArea} from "@/components/ui/scroll-area";

export interface Measurement {
    sequence: string;
    name: string;
    measure: string;
}


export const MealIngredients = () => {
    const router = useRouter()
    const recipeId = router.query?.recipeId;

    const {data, } = useGetMealByIdQuery(
        typeof recipeId === "string" ? recipeId : skipToken,
        {skip: router.isFallback})
    const mealDetailData = data?.meals[0]

    const mealIngredientMeasures = getRecipeIngredientMeasures(mealDetailData) as Array<Measurement> | undefined | null

    return (
        <div className='w-full lg:w-[300px]'>
            <p className='text-lg md:text-xl font-semibold'>Ingredients</p>
            <ScrollArea className="h-[300px] md:h-fit rounded-md py-4 pe-4">
                {
                    mealIngredientMeasures?.map((measurement) => (
                        <div
                            key={measurement.sequence}
                            className='flex justify-between items-baseline border-b last:border-b-0 border-b-slate-400 border-dashed flex-grow mb-1 last:mb-0'>
                            <p className='text-sm'>{measurement.name} :</p>
                            <p className='text-sm font-semibold'>{measurement.measure}</p>
                        </div>
                    ))
                }
            </ScrollArea>
        </div>
    )
}
