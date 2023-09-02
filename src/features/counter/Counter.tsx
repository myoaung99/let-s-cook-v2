import { useDispatch, useSelector } from '@/hooks';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { decrement, increment } from './counterSlice';

export const Counter: React.FC = () => {
    const dispatch = useDispatch();
    const { value } = useSelector((state) => state.counter);
    const handleOnIncrease = () => {
        dispatch(increment());
    };
    const handleOnDecrease = () => {
        dispatch(decrement());
    };
    return (
        <div className="h-screen grid grid-cols-1 content-center place-items-center">
            <Card>
                <CardHeader>
                    <CardTitle>Count : {value}</CardTitle>
                    <CardDescription>
                        press buttons to change count state
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <div className="space-x-1">
                        <Button size="sm" onClick={handleOnIncrease}>
                            increase
                        </Button>
                        <Button size="sm" onClick={handleOnDecrease}>
                            decrease
                        </Button>
                    </div>{' '}
                </CardFooter>
            </Card>
        </div>
    );
};
