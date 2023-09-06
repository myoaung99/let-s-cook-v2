// api types
export interface Pokemon {
    name: string;
    url: string;
}

export interface SuggestionMeal {
    id: string;
    title: string;
    imgUrl : string;
}

export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb : string;
}

export  interface  Area {
    strArea: string;
}

export interface Category{
    idCategory: string;
    strCategory: string;
    strCategoryDescription: string;
    strCategoryThumb: string;
}