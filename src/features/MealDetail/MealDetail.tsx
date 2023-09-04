import {useRouter} from "next/router";
import {useGetMealByIdQuery} from "@/features/Recipes/recipesService";
import {skipToken} from "@reduxjs/toolkit/query";
import {Button} from "@/components/ui/button";

export const MealDetail = () => {
    const router = useRouter()
    const recipeId = router.query?.recipeId;

    const {data, isLoading} = useGetMealByIdQuery(
        typeof recipeId === "string" ? recipeId : skipToken,
        {skip: router.isFallback})

    const mealDetailData = data?.meals[0]

    if(isLoading){
        return <p>loading...</p>
    }

    const handlGoBack = ()=>{
        router.back()
    }

    return <section className='md:container'>
        <div className="mt-6">
            <Button variant='secondary' onClick={handlGoBack}>
                Go back
            </Button>
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

        {/*<Image*/}
        {/*    className="rounded-sm shadow-md border-l-4 border-primary border-dashed inline"*/}
        {/*    src={mealDetailData?.strMealThumb}*/}
        {/*    alt="meal"*/}
        {/*    width={140}*/}
        {/*    height={140}*/}
        {/*/>*/}

        <div className="md:columns-3 md:gap-6 text-justify mb-6">
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

const getYoutubeId = (url: string)=> {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    let match = url?.match(regExp);

    if (match && match[2].length === 11) {
        return match[2];
    } else {
        return "error";
    }
}