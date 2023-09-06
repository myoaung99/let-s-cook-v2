import {useRouter} from "next/router";
import {useGetMealByIdQuery} from "@/features/Recipes/recipesService";
import {skipToken} from "@reduxjs/toolkit/query";
import {Button} from "@/components/ui/button";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {MealDetailPDF} from "@/features/MealDetail/MealDetailPDF";
import {useEffect, useState} from "react";

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

    return <section className='md:container'>
        <div className="mt-6 flex justify-between items-center">
            <Button size='sm' variant='secondary' onClick={handlGoBack}>
                Go back
            </Button>
            {!!mealDetailData && isClient ?
                <PDFDownloadLink document={<MealDetailPDF title={mealDetailData.strMeal}
                                                          description={mealDetailData.strInstructions}
                                                          image={mealDetailData.strMealThumb}
                                                          video={mealDetailData.strYoutube}
                />}
                                 fileName={`${mealDetailData?.strMeal}.pdf`}>
                    <Button size='sm'>
                        Download Recipe
                    </Button>
                </PDFDownloadLink>
                : null}
        </div>

        <h4 className="mt-6 md:mt-6 text-xl text-center">
            <span className='block md:inline'>Instructions for cooking{" "}</span>
            <span className="font-semibold underline underline-offset-2">{mealDetailData?.strMeal}</span>
        </h4>

        <div className="py-12 flex justify-center" id="vd">
            <iframe
                width="600"
                height="400"
                src={
                    "https://www.youtube.com/embed/" + getYoutubeId(mealDetailData?.strYoutube)
                }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>

        <div className="md:columns-2 md:w-1/2 mx-auto md:gap-10 text-justify mb-6">
            {transformPara(mealDetailData?.strInstructions)}
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