import {useRouter} from "next/router";
import {useGetMealByIdQuery} from "@/features/Recipes/recipesService";
import {skipToken} from "@reduxjs/toolkit/query";
import {Button} from "@/components/ui/button";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {MealDetailPDF} from "@/features/MealDetail/MealDetailPDF";
import {useEffect, useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area"

export interface Measurement {
    sequence: string;
    name: string;
    measure: string;
}

export const MealDetail = () => {
    const router = useRouter()
    const recipeId = router.query?.recipeId;
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const {data, isLoading} = useGetMealByIdQuery(
        typeof recipeId === "string" ? recipeId : skipToken,
        {skip: router.isFallback})

    const mealDetailData = data?.meals[0]

    if (isLoading) {
        return <p>loading...</p>
    }

    const handlGoBack = () => {
        router.back()
    }

    const mealIngredientMeasures = getRecipeIngredientMeasures(mealDetailData) as Array<Measurement> | undefined | null

    const IngredientMeasurements = () => (
        <>
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
        </>
    )

    return <section className='md:container md:pb-16'>
        <div className="mt-6 flex justify-between items-center">
            <div className="w-[150px]">
                <Button size='sm' variant='secondary' onClick={handlGoBack}>
                    Go back
                </Button>
            </div>

            <p className="hidden md:block font-semibold underline md:text-2xl underline-offset-2">{mealDetailData?.strMeal}</p>

            {!!mealDetailData && isClient ?
                <PDFDownloadLink className='w-[150px]' document={<MealDetailPDF title={mealDetailData.strMeal}
                                                          description={mealDetailData.strInstructions}
                                                          image={mealDetailData.strMealThumb}
                                                          ingredients={mealIngredientMeasures}
                />}
                                 fileName={`${mealDetailData?.strMeal}.pdf`}>
                    <Button size='sm'>
                        Download Recipe
                    </Button>
                </PDFDownloadLink>
                : <div className='w-[150px]'/>}
        </div>

        <p className="visible md:hidden pb-1 pt-8 font-semibold underline text-2xl text-center underline-offset-2">{mealDetailData?.strMeal}</p>

        <div className='flex flex-col-reverse lg:flex-row justify-between gap-4 md:gap-8 py-8'>
            <div className='h-[300px] md:h-[330px] lg:h-[300px] xl:[h-500px] w-full lg:w-[300px]'>
                <p className='text-lg md:text-xl font-semibold'>Ingredients</p>
                <ScrollArea className="h-full rounded-md py-4 pe-4">
                    <IngredientMeasurements/>
                </ScrollArea>
            </div>
            <div className="flex-grow" id="vd">
                <span className='text-lg md:text-xl font-semibold'>Cooking Tutorial</span>
                <iframe
                    src={
                        "https://www.youtube.com/embed/" + getYoutubeId(mealDetailData?.strYoutube)
                    }
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className='py-3 aspect-video w-full h-auto'
                ></iframe>
            </div>
        </div>

        <div>
            <p className='text-lg md:text-xl font-semibold pb-2'>Instructions</p>
            <div className="md:columns-2 lg:columns-3 md:gap-10 text-justify mb-6 indent-20">
                {transformPara(mealDetailData?.strInstructions)}
            </div>
        </div>
    </section>
}

export const transformPara = (str: string) => {
    const paraArray = str?.split("STEP");
    return paraArray?.map((p) => {
        if (p && p.length > 20) {
            const firstL = p.charAt(1);

            return (
                <p className="mb-6 text-lg" key={firstL}>
                    {p}
                </p>
            );
        }
        return null;
    });
};

const getYoutubeId = (url: string) => {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    let match = url?.match(regExp);

    if (match && match[2].length === 11) {
        return match[2];
    } else {
        return "error";
    }
}


const getRecipeIngredientMeasures = (mealDetail: any) => {
    const mealIngredientMeasures: any = []

    for (const [key, value] of Object.entries(mealDetail)) {
        const ingredientKey = 'strIngredient'
        const measureKey = 'strMeasure'

        if (key.includes(ingredientKey) && !!value) {
            mealIngredientMeasures.push({sequence: extractNumberFromString(key), name: value})
        }

        if (key.includes(measureKey) && !!value && value !== ' ') {
            const sequence = extractNumberFromString(key)
            const ingredientMeasure = mealIngredientMeasures.find((ingredrent: any) => ingredrent.sequence === sequence)
            if (ingredientMeasure) {
                ingredientMeasure.measure = value
            }
        }
    }
    return mealIngredientMeasures
}

const extractNumberFromString = (str: string): string => {
    const result = str.match(/\d+/g)
    if (result) {
        return result[0]
    }
    return '0'
}
