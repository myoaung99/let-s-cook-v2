// api types
export interface Pokemon {
    name: string;
    url: string;
}

export interface SuggestionMeal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

export interface Area {
    strArea: string;
}

export interface Ingredient {
    idIngredient: string;
    strIngredient: string;
    strDescription: string;
    strType: any;
}

export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryDescription: string;
    strCategoryThumb: string;
}

export interface RecipeFilters {
    filterBy: string;
    ingredientSelector: string;
    countrySelector: string;
    categorySelector: string;
}
