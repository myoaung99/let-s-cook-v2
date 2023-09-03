import React from 'react';
import Image from "next/image";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from '@/components/ui/button'
import {useRouter} from "next/router";

interface MealCardProps {
    id: string;
    title: string;
    imgUrl: string;
}

export const MealCard: React.FC<MealCardProps> = ({id, imgUrl, title}) => {
    const router = useRouter()
    const pathLink = `/detail-recipe/${id}`;
    const handleOnClick = () => {
        router.push(pathLink)
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl line-clamp-1'>{title}</CardTitle>
            </CardHeader>
            <CardContent className="mx-6 relative aspect-square">
                <Image
                    fill
                    title={title}
                    src={imgUrl}
                    className="object-cover mx-auto rounded"
                    alt="meal suggestion"
                />
            </CardContent>
            <br/>
            <CardFooter>
                <Button className='w-full' onClick={handleOnClick}>View Detail</Button>
            </CardFooter>
        </Card>
    );
}

