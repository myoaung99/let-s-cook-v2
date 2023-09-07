import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


export const MealCardLoading = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-6 w-3/4" />
                </CardTitle>
            </CardHeader>
            <CardContent className={'aspect-square'}>
                <Skeleton className="w-full h-64" />
                <Skeleton className="h-10 w-full mt-10" />
            </CardContent>
        </Card>
    );
}

