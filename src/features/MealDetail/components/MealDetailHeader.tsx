import { Button } from '@/components/ui/button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MealDetailPDF } from '@/features/MealDetail/components/MealDetailPDF';
import { useIsClient } from '@/hooks';
import { useGetMealData } from '@/features/MealDetail/hooks/useGetMealData';
import { useCallback, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { User } from '@/types';
import { getSignInUserData } from '@/features/MealDetail/utils';
import { createBookmark } from '@/features/MealDetail/utils/createBookmark';

export const MealDetailHeader = () => {
    const [isClient] = useIsClient();
    const { toast } = useToast();

    const [isBookmarked, setIsBookmarked] = useState(false);
    const { router, mealDetailData, getMealIngredientMeasures, recipeId } =
        useGetMealData();
    const handlGoBack = () => {
        router.back();
    };
    const mealIngredientMeasures = getMealIngredientMeasures();
    const getIsBookmarked = useCallback((user: User) => {
        return (
            !!user?.bookmarks.find(
                (bookmark) => bookmark.idMeal === recipeId
            ) || false
        );
    }, []);

    const handleBookmark = async () => {};

    return (
        <>
            <section className="mt-6 flex justify-between items-center">
                <div className="w-[150px]">
                    <Button size="sm" variant="secondary" onClick={handlGoBack}>
                        Go back
                    </Button>
                </div>

                <p className="hidden md:block font-semibold underline md:text-2xl underline-offset-2">
                    {mealDetailData?.strMeal}
                </p>

                <div className="flex items-center gap-2">
                    {!!mealDetailData && isClient ? (
                        <PDFDownloadLink
                            className="w-[150px]"
                            document={
                                <MealDetailPDF
                                    title={mealDetailData.strMeal}
                                    description={mealDetailData.strInstructions}
                                    image={mealDetailData.strMealThumb}
                                    ingredients={mealIngredientMeasures}
                                />
                            }
                            fileName={`${mealDetailData?.strMeal}.pdf`}
                        >
                            <Button size="sm">Download Recipe</Button>
                        </PDFDownloadLink>
                    ) : (
                        <div className="w-[150px]" />
                    )}
                    <Button
                        key={router.asPath}
                        variant={'ghost'}
                        size={'icon'}
                        onClick={handleBookmark}
                    >
                        <Star {...(isBookmarked ? { fill: 'true' } : {})} />
                    </Button>
                </div>
            </section>
            <p className="visible md:hidden pb-1 pt-8 font-semibold underline text-2xl text-center underline-offset-2">
                {mealDetailData?.strMeal}
            </p>
        </>
    );
};
