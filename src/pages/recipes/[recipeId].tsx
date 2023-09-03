import {wrapper} from "@/app/store";
import {getRunningQueriesThunk} from "@/services/controller";
import {getMealById, useGetMealByIdQuery} from "@/features/Recipes/recipesService";
import {useRouter} from "next/router";
import {skipToken} from "@reduxjs/toolkit/query";

const RecipeDetail = () => {
    const router = useRouter()
    const recipeId = router.query?.recipeId;

    const {data, isLoading} = useGetMealByIdQuery(
        typeof recipeId === "string" ? recipeId : skipToken,
        {skip: router.isFallback})

    console.log('isLoading', isLoading)

    return <div>{JSON.stringify(data)}</div>
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
        store.dispatch(getMealById.initiate(recipeId))
        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {},
            revalidate: 24 * 60 * 60 * 90,
        };
    }
);
