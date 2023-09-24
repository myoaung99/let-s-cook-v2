import React from 'react';
import { useInitialFilterValues } from './hook/useInitialFilterValues';
import { FormProvider } from 'react-hook-form';

interface RecipeFilterProviderInterface {
    children: React.ReactNode;
}

export const RecipeFilterProvider: React.FC<RecipeFilterProviderInterface> = ({
    children,
}) => {
    const [form] = useInitialFilterValues();

    return <FormProvider {...form}>{children}</FormProvider>;
};
