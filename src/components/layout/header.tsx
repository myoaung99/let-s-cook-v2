import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {MenuData} from "@/components/layout/types";
import {useDispatch, useSelector} from "@/hooks";
import {toggleMobileNav} from "@/app/globalSlice";
import {NextRouter, useRouter} from "next/router";
import {motion, useMotionValueEvent, useScroll} from 'framer-motion';
import Image from "next/image";
import {Playfair} from 'next/font/google'
import {useAuth, UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";

const SCROLL_WITH_NAV_HEIGHT = 150;

const inter = Playfair({
    subsets: ['latin'],
    display: 'swap',
})


export const Header = () => {
    const [hideNavbar, setHideNavbar] = useState(false);
    const {scrollY} = useScroll();
    const {showMobileNav} = useSelector(state => state.global)

    useMotionValueEvent(scrollY, 'change', (scrolledPosition) => {
        const previousScrolledPosition = scrollY.getPrevious();
        const isScrollingDown = scrolledPosition > previousScrolledPosition;
        if (isScrollingDown && scrolledPosition > SCROLL_WITH_NAV_HEIGHT) {
            setHideNavbar(true)
        } else {
            setHideNavbar(false)
        }
    })

    useEffect(() => {
        if (showMobileNav) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'scroll'
        }
    }, [showMobileNav]);

    return (
        <motion.section
            variants={{hidden: {y: -100}, visible: {y: 0}}}
            animate={hideNavbar ? 'hidden' : 'visible'}
            transition={{delay: 0.3, easings: 'easeInOut'}}
            className="fixed w-full bg-stone-900 text-white z-50">
            <nav className="container h-16 flex items-center justify-between ">
                <div className="font-bold text-xl px-3 flex gap-2 items-center">
                    <Image src={"/static/logo.png"} alt={'logo'} width={40} height={40}/>
                    <Link href="/">Let's Cook</Link>
                </div>
                <DesktopMenuItems/>
                <MenuToggleButton/>
                <MobileMenu/>
            </nav>
        </motion.section>
    );
};

const MobileMenu = () => {
        const {showMobileNav} = useSelector(state => state.global)

        return (
            <>
                {showMobileNav ?
                    <MobileMenuItems/>
                    : null}
            </>
        )
    }
;

const MenuToggleButton = () => {
    const dispatch = useDispatch()
    const {showMobileNav} = useSelector(state => state.global)
    const toggleMobileMenu = () => {
        dispatch(toggleMobileNav())
    }
    return <>
        <button onClick={toggleMobileMenu} className="lg:hidden ps-3">
            {showMobileNav ? 'Close' : 'Menu'}
        </button>
    </>

}

const DesktopMenuItems = () => {
    const router = useRouter();
    const {isLoaded, userId} = useAuth();

    const handleToLogin = () => {
        router.push('/sign-in')
    }

    return (
        <div className={"flex items-center gap-6"}>
            <ul className={`hidden menu-list lg:flex items-center gap-1`}>
                {
                    menuData.map((menu: MenuData) => (
                        <li
                            className={`transition-transform p-2 mx-1 last:me-0 hover:underline ${getActiveTabStyles(menu, router)}
                            `}
                            key={menu.href}>
                            <Link href={menu.href}>
                                <span className="text-md px-4">{menu.label}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>

            <div>
                {!userId || !isLoaded ?
                    <Button onClick={handleToLogin} variant='ghost'
                            className={`w-[60px] hover:cursor-pointer text-md`}>
                        Login
                    </Button> :
                    <UserButton afterSignOutUrl="/"/>
                }
            </div>
        </div>
    )
}

const MobileMenuItems = () => {
    const dispatch = useDispatch()


    const toggleMobileMenu = () => {
        dispatch(toggleMobileNav())
    }
    return (
        <article
            className="z-30 fixed top-16 left-0 h-screen w-full bg-black backdrop-filter backdrop-blur bg-opacity-80 text-black xl:hidden">
            <div
                className='flex flex-col justify-center items-center h-full w-full pb-16'>
                <ul
                    className="flex flex-col text-center items-stretch text-white">
                    {
                        menuData.map((menu, index) => (
                            <Link onClick={toggleMobileMenu} href={menu.href} key={menu.href}>
                                <motion.li
                                    variants={{hidden: {opacity: 0, y: -400}, visible: {opacity: 1, y: 0}}}
                                    initial='hidden'
                                    animate='visible'
                                    transition={{delay: index * 0.3, easings: 'ease'}}
                                    className="mx-2 mb-5 cursor-pointer">
                                    <p className={`text-2xl underline ${inter.className}`}>{menu.label}</p>
                                </motion.li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </article>

    )
}

const getActiveTabStyles = (menu: MenuData, router: NextRouter, activeStyleClasses: string = 'border-2 rounded-sm') => {
    const pathName = router.pathname;
    const activeClasses = activeStyleClasses;
    const isRootPage = menu.path === '/';
    if (isRootPage) {
        return menu.path === pathName ? activeClasses : ''
    } else {
        return pathName.startsWith(menu.path) ? activeClasses : ''
    }
}

const menuData: Array<MenuData> = [
    {
        href: '/',
        path: '/',
        label: 'Home'
    },
    {
        href: '/recipes?filter=Country&value=American',
        path: '/recipes',
        label: 'Recipes'
    }
]
