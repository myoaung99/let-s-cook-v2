import {ScrollArea} from "@/components/ui/scroll-area";
import {useGetMealData} from "@/features/MealDetail/hooks/useGetMealData";

export interface Measurement {
    sequence: string;
    name: string;
    measure: string;
}

export const MealIngredients = () => {
    const {getMealIngredientMeasures} = useGetMealData()
    const mealIngredientMeasures = getMealIngredientMeasures()

    return (
        <article className='w-full lg:w-[300px]'>
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
        </article>
    )
}
