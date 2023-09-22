import {Button} from "@/components/ui/button";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {MealDetailPDF} from "@/features/MealDetail/components/MealDetailPDF";
import {useIsClient} from "@/hooks";
import {useGetMealData} from "@/features/MealDetail/hooks/useGetMealData";
import {useAuth} from "@clerk/nextjs";
import {useEffect, useState} from "react";
import {Heart} from "lucide-react";

export const MealDetailHeader = () => {
    const [isClient] = useIsClient()
    const {userId} = useAuth()
    const [isBookmarked, setIsBookmarked] = useState(false);
    const {router, mealDetailData, getMealIngredientMeasures, recipeId} = useGetMealData()
    const handlGoBack = () => {
        router.back()
    }
    const mealIngredientMeasures = getMealIngredientMeasures()

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await fetch('/api/me', {
                method: 'POST',
                body: JSON.stringify({clerk_id: userId}),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json()
            const isBookmark = data.user.bookmarks.find((bookmark: string) => bookmark === recipeId) || false
            setIsBookmarked(isBookmark)
        }
        if (window) {
            fetchUserData()
        }
    }, [userId]);

    const handleBookmark = async () => {
        const status = isBookmarked ? 'REMOVE_BOOKMARK' : 'ADD_BOOKMARK';
        setIsBookmarked(prev => !prev)
        const res = await fetchBookmark({status, recipeId, userId})
        if (!res.ok) {
            setIsBookmarked(prev => !prev)
        }
    }

    return (
        <>
            <section className="mt-6 flex justify-between items-center">
                <div className="w-[150px]">
                    <Button size='sm' variant='secondary' onClick={handlGoBack}>
                        Go back
                    </Button>
                </div>

                <p className="hidden md:block font-semibold underline md:text-2xl underline-offset-2">{mealDetailData?.strMeal}</p>

                <div className='flex items-center gap-2'>
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
                    <Button variant={'ghost'} size={'icon'} onClick={handleBookmark}>
                        <Heart {...isBookmarked ? {fill: 'true'} : {}}/>
                    </Button>
                </div>

            </section>
            <p className="visible md:hidden pb-1 pt-8 font-semibold underline text-2xl text-center underline-offset-2">{mealDetailData?.strMeal}</p>
        </>
    )
}

const fetchBookmark = async ({status, recipeId, userId}: { status?: any, recipeId?: any, userId?: any }) => {
    return await fetch('/api/bookmark', {
        method: 'POST',
        body: JSON.stringify({
                status,
                recipeId,
                userId
            },
        ),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}