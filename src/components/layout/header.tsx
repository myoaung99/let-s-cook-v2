import Link from 'next/link';
import React, { useState } from 'react';
import { MenuData } from '@/components/layout/types';
import { useDispatch, useIsClient } from '@/hooks';
import { toggleMobileNav } from '@/app/globalSlice';
import { NextRouter, useRouter } from 'next/router';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import { Playfair } from 'next/font/google';
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
import { useAppSelector } from '@/hooks/useSelector';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppDispatch } from '@/hooks/useDispatch';
import { logout } from '@/features/authentication/authSlice';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

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
            className="fixed w-full bg-stone-900 text-white z-20"
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
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

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
                </SheetDescription>
            </SheetHeader>
            <SheetFooter>
                <div>
                    {user ? (
                        <SheetClose asChild>
                            <section className="space-y-4">
                                <Avatar>
                                    <AvatarFallback>
                                        <span className="text-black">
                                            {user!.name?.slice(0, 3)}
                                        </span>
                                    </AvatarFallback>
                                </Avatar>
                                <Button
                                    className="w-full"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </section>
                        </SheetClose>
                    ) : (
                        <Link href={`/signin`} className="text-lg">
                            <SheetClose asChild>
                                <Button className="w-full">Sign In</Button>
                            </SheetClose>
                        </Link>
                    )}
                </div>
            </SheetFooter>
        </SheetContent>
    );
};

const DesktopMenuItems = () => {
    const [isClient] = useIsClient();
    const dispatch = useAppDispatch();
    const { isLoggedIn, user } = useAppSelector((state) => state.auth);
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
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

            {isClient ? (
                <div className="hidden lg:block">
                    {!isLoggedIn ? (
                        <Link href={'/signin'}>
                            <Button
                                variant="ghost"
                                className={`w-[60px] hover:cursor-pointer text-md`}
                            >
                                Login
                            </Button>
                        </Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarFallback>
                                        <span className="text-black">
                                            {user!.name?.slice(0, 3)}
                                        </span>
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="hover:cursor-pointer"
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            ) : null}
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
