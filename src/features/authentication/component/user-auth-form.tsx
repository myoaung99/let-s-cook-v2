'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import TextInput from '@/components/TextInput';
import { useRouter } from 'next/router';
import OTPForm from './otp-form';
import { requestOtpAsync, signinAsync, signupAsync } from '../authSlice';
import { useAppSelector } from '@/hooks/useSelector';
import { useAppDispatch } from '@/hooks/useDispatch';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const signupFormSchema = z
    .object({
        name: z.string(),
        email: z
            .string()
            .min(1, { message: 'email is required' })
            .email('enter a valid email'),
        password: z
            .string()
            .min(6, { message: 'password must be at least 6 character.' }),
        confirmPassword: z
            .string()
            .min(6, { message: 'password must be at least 6 character.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'passwords do not match',
        path: ['confirmPassword'],
    });

export const signinFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'email is required' })
        .email('enter a valid email'),
    password: z
        .string()
        .min(6, { message: 'password must be at least 6 character.' }),
});

interface UserInfo {
    email: string;
    password: string;
    name: string;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [userData, setUserData] = React.useState<null | UserInfo>(null);
    const router = useRouter();
    const { loading, isLoggedIn, hasOtp, message, createSuccess } =
        useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const isSignup = router.pathname === '/signup';
    const isSignin = router.pathname === '/signin';
    const formSchema = isSignin ? signinFormSchema : signupFormSchema;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    async function submitHandler(formData: any) {
        setUserData({
            name: formData.name,
            email: formData.email,
            password: formData.password,
        });

        if (isSignup) {
            dispatch(requestOtpAsync({ email: formData.email }));
        }

        if (isSignin) {
            dispatch(
                signinAsync({
                    email: formData.email,
                    password: formData.password,
                })
            );
        }
    }

    React.useLayoutEffect(() => {
        if (isLoggedIn) {
            router.replace('/');
        }
    }, [isLoggedIn]);

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <p>{message}</p>
            {!hasOtp ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)}>
                        <FormProvider {...form}>
                            <div className="grid gap-5">
                                {isSignup ? (
                                    <div className="grid gap-1">
                                        <TextInput
                                            label="Name"
                                            name="name"
                                            placeholder="your name"
                                            control={form.control}
                                        />
                                    </div>
                                ) : null}

                                <div className="grid gap-1">
                                    <TextInput
                                        label="Email"
                                        name="email"
                                        placeholder="your email address"
                                        control={form.control}
                                    />
                                </div>

                                <div className="grid gap-1">
                                    <TextInput
                                        label="Password"
                                        name="password"
                                        placeholder="password"
                                        control={form.control}
                                    />
                                </div>

                                {isSignup ? (
                                    <div className="grid gap-1">
                                        <TextInput
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            placeholder="confirm password"
                                            control={form.control}
                                        />
                                    </div>
                                ) : null}

                                <Button disabled={loading}>
                                    {!loading && isSignup ? 'Sign Up' : null}
                                    {!loading && isSignin ? 'Sign In' : null}
                                    {loading ? 'Submitting' : null}
                                </Button>
                            </div>
                        </FormProvider>
                    </form>
                </Form>
            ) : null}

            {hasOtp ? <OTPForm userData={userData} /> : null}
        </div>
    );
}
