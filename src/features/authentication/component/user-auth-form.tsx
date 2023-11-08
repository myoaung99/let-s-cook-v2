'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import TextInput from '@/components/TextInput';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const formSchema = z
    .object({
        name: z.string(),
        email: z
            .string()
            .min(1, { message: 'email is required' })
            .email('enter a valid email'),
        password: z.string().min(6, { message: 'password is required' }),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'passwords do not match',
        path: ['confirmPassword'],
    });

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    async function submitHandler(formData: any) {
        console.log('form submit', formData);
    }

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)}>
                    <FormProvider {...form}>
                        <div className="grid gap-3">
                            <div className="grid gap-1">
                                <TextInput
                                    label="Name"
                                    name="name"
                                    control={form.control}
                                    isLoading={isLoading}
                                />
                            </div>

                            <div className="grid gap-1">
                                <TextInput
                                    label="Email"
                                    name="email"
                                    control={form.control}
                                    isLoading={isLoading}
                                />
                            </div>

                            <div className="grid gap-1">
                                <TextInput
                                    label="Password"
                                    name="password"
                                    control={form.control}
                                    isLoading={isLoading}
                                />
                            </div>

                            <div className="grid gap-1">
                                <TextInput
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    control={form.control}
                                    isLoading={isLoading}
                                />
                            </div>

                            <Button disabled={isLoading}>Sign Up</Button>
                        </div>
                    </FormProvider>
                </form>
            </Form>
        </div>
    );
}
