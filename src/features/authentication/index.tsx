import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { UserAuthForm } from './component/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function AuthenticationPage() {
    const router = useRouter();
    const isSignup = router.pathname === '/signup';
    const isSignin = router.pathname === '/signin';

    return (
        <>
            <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    replace
                    href={isSignup ? '/signin' : isSignin ? '/signup' : '/'}
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'absolute right-4 top-4 md:right-8 md:top-8'
                    )}
                >
                    {isSignup ? 'Sign In' : null}
                    {isSignin ? 'Sign Up' : null}
                </Link>

                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <Link
                        replace
                        href={'/'}
                        className="relative z-20 flex items-center text-lg font-medium gap-2"
                    >
                        <Image
                            src={'/static/logo.png'}
                            alt={'logo'}
                            width={40}
                            height={40}
                        />
                        Let's Cook
                    </Link>
                </div>
                <div className="h-full w-full flex p-6 lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {isSignup ? 'Create an account' : null}
                                {isSignin ? 'Sign In your account' : null}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {isSignup
                                    ? 'Enter your account below to create your account'
                                    : null}

                                {isSignin
                                    ? 'Enter your account below to continue'
                                    : null}
                            </p>
                        </div>
                        <UserAuthForm />
                    </div>
                </div>
            </div>
        </>
    );
}
