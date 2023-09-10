import {MealIngredients} from "@/features/MealDetail/components/MealIngredients";
import {MealDetailHeader} from "@/features/MealDetail/components/MealDetailHeader";
import {MealDetailTutorial} from "@/features/MealDetail/components/MealDetailTutorial";
import {MealDetailInstructions} from "@/features/MealDetail/components/MealDetailInstructions";
import {useGetMealData} from "@/features/MealDetail/hooks/useGetMealData";

export const MealDetail = () => {
    const {isLoading} = useGetMealData()

    if (isLoading) {
        return <p>loading...</p>
    }

    return <section className='md:container md:pb-16'>
        <MealDetailHeader/>
        <div className='flex flex-col-reverse lg:flex-row justify-between gap-4 md:gap-8 py-8'>
            <MealIngredients/>
            <MealDetailTutorial/>
        </div>
        <MealDetailInstructions/>
    </section>
}


