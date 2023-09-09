import {getYoutubeId} from "@/features/MealDetail/utils";
import {useFetchMealDetail} from "@/features/MealDetail/hooks/useFetchMealDetail";

export const MealDetailTutorial = () => {
    const {mealDetailData} = useFetchMealDetail()

    return (
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
    )
}