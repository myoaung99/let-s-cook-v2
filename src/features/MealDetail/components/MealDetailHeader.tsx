import {Button} from "@/components/ui/button";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {MealDetailPDF} from "@/features/MealDetail/components/MealDetailPDF";
import {useIsClient} from "@/hooks";
import {useGetMealData} from "@/features/MealDetail/hooks/useGetMealData";
import {useAuth} from "@clerk/nextjs";
import {useCallback, useEffect, useState} from "react";
import {Star} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {User} from "@/types";
import {getSignInUserData} from "@/features/MealDetail/utils";
import {createBookmark} from "@/features/MealDetail/utils/createBookmark";

export const MealDetailHeader = () => {
    const [isClient] = useIsClient()
    const {userId} = useAuth()
    const {toast} = useToast()
    const [isBookmarked, setIsBookmarked] = useState(false);
    const {router, mealDetailData, getMealIngredientMeasures, recipeId} = useGetMealData()
    const handlGoBack = () => {
        router.back()
    }
    const mealIngredientMeasures = getMealIngredientMeasures()
    const getIsBookmarked = useCallback((user: User) => {
        return !!user.bookmarks.find((bookmark: string) => bookmark === recipeId) || false;
    }, [])


    const setUserData = async () => {
        if (!userId) {
            return
        }
        const data = await getSignInUserData(userId)
        const isBookmark = getIsBookmarked(data.user)
        setIsBookmarked(isBookmark)
    }

    useEffect(() => {
        if (window) {
            setUserData()
        }
    }, []);

    const handleBookmark = async () => {
        if (!userId) {
            toast({
                variant: "destructive",
                title: "Unauthorized action",
                description: "Please login to bookmark recipe",
                action: (
                    <ToastAction onClick={() => router.push(`/sign-in?redirect_url=/recipes/${recipeId}`)}
                                 altText="Goto login to sign-up">Login</ToastAction>

                )
            })

            return null
        }
        const status = isBookmarked ? 'REMOVE_BOOKMARK' : 'ADD_BOOKMARK';
        setIsBookmarked(prev => !prev)
        const res = await createBookmark({status, recipeId, userId})

        if (!res.ok) {
            setTimeout(() => {
                setIsBookmarked(prev => !prev)
                toast({
                    title: "Something went wrong",
                    description: "Fail to mark favorite recipe, please try again later",
                })
            }, 500)
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
                    <Button key={router.asPath} variant={'ghost'} size={'icon'} onClick={handleBookmark}>
                        <Star {...isBookmarked ? {fill: 'true'} : {}}/>
                    </Button>
                </div>

            </section>
            <p className="visible md:hidden pb-1 pt-8 font-semibold underline text-2xl text-center underline-offset-2">{mealDetailData?.strMeal}</p>
        </>
    )
}
