const getRecipeIngredientMeasures = (mealDetail: any) => {
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

const extractNumberFromString = (str: string): string => {
    const result = str.match(/\d+/g)
    if (result) {
        return result[0]
    }
    return '0'
}


const getYoutubeId = (url: string) => {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    let match = url?.match(regExp);

    if (match && match[2].length === 11) {
        return match[2];
    } else {
        return "error";
    }
}



export {extractNumberFromString, getRecipeIngredientMeasures, getYoutubeId}