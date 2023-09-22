import {extractNumberFromString} from "@/features/MealDetail/utils";

export const getRecipeIngredientMeasures = (mealDetail: any) => {
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
