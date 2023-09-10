import {Button} from "@/components/ui/button";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {MealDetailPDF} from "@/features/MealDetail/components/MealDetailPDF";
import {useIsClient} from "@/hooks";
import {useFetchMealDetail} from "@/features/MealDetail/hooks/useFetchMealDetail";

export const MealDetailHeader = () => {
    const [isClient] = useIsClient()
    const {router, mealDetailData, getMealIngredientMeasures} = useFetchMealDetail()
    const handlGoBack = () => {
        router.back()
    }

    const mealIngredientMeasures = getMealIngredientMeasures()

    return (
        <>
            <section className="mt-6 flex justify-between items-center">
                <div className="w-[150px]">
                    <Button size='sm' variant='secondary' onClick={handlGoBack}>
                        Go back
                    </Button>
                </div>

                <p className="hidden md:block font-semibold underline md:text-2xl underline-offset-2">{mealDetailData?.strMeal}</p>

                {!!mealDetailData && isClient ?
                    <PDFDownloadLink className='w-[150px]'
                                     document={<MealDetailPDF
                                         title={mealDetailData.strMeal}
                                         description={mealDetailData.strInstructions}
                                         image={mealDetailData.strMealThumb}
                                         ingredients={mealIngredientMeasures}
                                     />}
                                     fileName={`${mealDetailData?.strMeal}.pdf`}
                    >
                        <Button size='sm'>
                            Download Recipe
                        </Button>
                    </PDFDownloadLink>
                    : <div className='w-[150px]'/>}
            </section>
            <p className="visible md:hidden pb-1 pt-8 font-semibold underline text-2xl text-center underline-offset-2">{mealDetailData?.strMeal}</p>
        </>
    )
}