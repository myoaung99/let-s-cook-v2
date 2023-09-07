import {createContext, ReactNode, useContext} from "react";
import {SuggestionMeal} from "@/types";

interface MealCardProviderProps {
    value: SuggestionMeal,
    children: ReactNode
}

const MealCardContext = createContext<SuggestionMeal | null>(null)
MealCardContext.displayName = 'MealCardContext'

export const useMealCard = ()=>{
    const context = useContext(MealCardContext)
    if(!context){
        throw new Error('MealCardContext* component can only be used within MealCardProvider')
    }
    return context
}

const MealCardProvider:React.FC<MealCardProviderProps> = ({value, children})=>{
    return <MealCardContext.Provider value={value}>
        {children}
    </MealCardContext.Provider>
}

export default MealCardProvider;