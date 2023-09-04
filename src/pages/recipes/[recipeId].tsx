import {wrapper} from "@/app/store";
import {getRunningQueriesThunk} from "@/services/controller";
import {getMealById} from "@/features/Recipes/recipesService";
import {MealDetail} from "@/features/MealDetail";

const RecipeDetail = () => {
    return <>
        <MealDetail/>
    </>
}

export default RecipeDetail;

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking', // false or "blocking"
    }
}

export const getStaticProps = wrapper.getStaticProps(
    (store) => async (context) => {
        const recipeId = context.params?.recipeId;
        if(typeof recipeId === 'string'){
            store.dispatch(getMealById.initiate(recipeId))
        }
        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {},
            revalidate: 24 * 60 * 60 * 90,
        };
    }
);
