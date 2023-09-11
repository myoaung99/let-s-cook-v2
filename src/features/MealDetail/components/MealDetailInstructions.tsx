import {useGetMealData} from "@/features/MealDetail/hooks/useGetMealData";

export const MealDetailInstructions = () => {
    const {mealDetailData} = useGetMealData()

    return <div>
        <p className='text-lg md:text-xl font-semibold pb-2'>Instructions</p>
        <div className="md:columns-2 lg:columns-3 md:gap-10 text-justify mb-6 indent-20">
            {transformPara(mealDetailData?.strInstructions)}
        </div>
    </div>
}
const transformPara = (str: string) => {
    const paraArray = str?.split("STEP");
    return paraArray?.map((p) => {
        if (p && p.length > 20) {
            const firstL = p.charAt(1);

            return (
                <p className="mb-6 text-sm" key={firstL}>
                    {p}
                </p>
            );
        }
        return null;
    });
};


