import Link from 'next/link';
import React, { useState } from 'react';
import { MenuData } from '@/components/layout/types';
import { useDispatch } from '@/hooks';
import { toggleMobileNav } from '@/app/globalSlice';
import { NextRouter, useRouter } from 'next/router';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import { Playfair } from 'next/font/google';
import { useAuth, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useClerk } from '@clerk/clerk-react';

const SCROLL_WITH_NAV_HEIGHT = 150;

const inter = Playfair({
    subsets: ['latin'],
    display: 'swap',
});

export const Header = () => {
    const [hideNavbar, setHideNavbar] = useState(false);
    const { scrollY } = useScroll();
    const dispatch = useDispatch();

    useMotionValueEvent(scrollY, 'change', (scrolledPosition) => {
        const previousScrolledPosition = scrollY.getPrevious();
        const isScrollingDown = scrolledPosition > previousScrolledPosition;
        if (isScrollingDown && scrolledPosition > SCROLL_WITH_NAV_HEIGHT) {
            setHideNavbar(true);
        } else {
            setHideNavbar(false);
        }
    });

    const toggleMobileMenu = () => {
        dispatch(toggleMobileNav());
    };

    return (
        <motion.section
            variants={{ hidden: { y: -100 }, visible: { y: 0 } }}
            animate={hideNavbar ? 'hidden' : 'visible'}
            transition={{ delay: 0.3, easings: 'easeInOut' }}
            className="fixed w-full bg-stone-900 text-white z-10"
        >
            <nav className="container h-16 flex items-center justify-between ">
                <div className="font-bold text-xl px-3 flex gap-2 items-center">
                    <Image
                        src={'/static/logo.png'}
                        alt={'logo'}
                        width={40}
                        height={40}
                    />
                    <Link href="/">Let's Cook</Link>
                </div>
                <DesktopMenuItems />
                <Sheet>
                    {
                        <SheetTrigger
                            className="lg:hidden"
                            onClick={toggleMobileMenu}
                        >
                            Open
                        </SheetTrigger>
                    }
                    <MobileMenu />
                </Sheet>
            </nav>
        </motion.section>
    );
};

const MobileMenu = () => {
    const { signOut } = useClerk();
    const router = useRouter();
    const { isLoaded, userId } = useAuth();
    const { user } = useUser();
    const imageUrl = user?.imageUrl;
    return (
        <SheetContent className={'flex flex-col justify-between'}>
            <SheetHeader>
                <SheetTitle className="text-left">Let's Cook</SheetTitle>
                <SheetDescription className="pt-5">
                    {menuData.map((menu) => (
                        <Link href={menu.href} key={menu.href}>
                            <SheetClose asChild>
                                <p
                                    className={`text-lg text-start ${inter.className}`}
                                >
                                    {menu.label}
                                </p>
                            </SheetClose>
                        </Link>
                    ))}
                    {userId && isLoaded ? (
                        <SheetClose asChild>
                            <p
                                onClick={() => signOut()}
                                className={`text-lg text-start ${inter.className}`}
                            >
                                Logout
                            </p>
                        </SheetClose>
                    ) : null}
                </SheetDescription>
            </SheetHeader>
            <SheetFooter>
                <div>
                    {userId && isLoaded ? (
                        <SheetClose asChild>
                            <Link href={'/user-profile'}>
                                {imageUrl ? (
                                    <Image
                                        className={'rounded-full'}
                                        width={50}
                                        height={50}
                                        src={imageUrl}
                                        alt={user?.fullName ?? 'profile image'}
                                    />
                                ) : (
                                    <div className={'w-[50px] h-[50px]'} />
                                )}
                            </Link>
                        </SheetClose>
                    ) : (
                        <Link
                            href={`/sign-in?redirect_url=${router.asPath}`}
                            className="text-lg"
                        >
                            <SheetClose asChild>
                                <Button className="w-full">Login</Button>
                            </SheetClose>
                        </Link>
                    )}
                </div>
            </SheetFooter>
        </SheetContent>
    );
};

const DesktopMenuItems = () => {
    const router = useRouter();
    const { isLoaded, userId } = useAuth();

    const handleToLogin = () => {
        router.push('/sign-in');
    };

    return (
        <div className={'flex items-center gap-6'}>
            <ul className={`hidden menu-list lg:flex items-center gap-1`}>
                {menuData.map((menu: MenuData) => (
                    <li
                        className={`transition-transform p-2 mx-1 last:me-0 hover:underline ${getActiveTabStyles(
                            menu,
                            router
                        )}
                            `}
                        key={menu.href}
                    >
                        <Link href={menu.href}>
                            <span className="text-md px-4">{menu.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="hidden lg:block">
                {!userId || !isLoaded ? (
                    <Button
                        onClick={handleToLogin}
                        variant="ghost"
                        className={`w-[60px] hover:cursor-pointer text-md`}
                    >
                        Login
                    </Button>
                ) : (
                    <UserButton afterSignOutUrl="/" />
                )}
            </div>
        </div>
    );
};

const getActiveTabStyles = (
    menu: MenuData,
    router: NextRouter,
    activeStyleClasses: string = 'border-2 rounded-sm'
) => {
    const pathName = router.pathname;
    const activeClasses = activeStyleClasses;
    const isRootPage = menu.path === '/';
    if (isRootPage) {
        return menu.path === pathName ? activeClasses : '';
    } else {
        return pathName.startsWith(menu.path) ? activeClasses : '';
    }
};

const menuData: Array<MenuData> = [
    {
        href: '/',
        path: '/',
        label: 'Home',
    },
    {
        href: '/recipes?filter=Country&value=American',
        path: '/recipes',
        label: 'Recipes',
    },
];
