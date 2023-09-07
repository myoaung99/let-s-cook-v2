import React from 'react';
import {MealCardLoading} from "@/components/MealCard/MealCardLoading";

interface MealCardLoadingListProps {
    count?: number
}

export const MealCardLoadingList: React.FC<MealCardLoadingListProps> = ({count}) => {
    return (
        <>
            {Array(count || 8).fill(0).map((_, index) => (<MealCardLoading key={'loading' + index}/>))}
        </>
    );
}

