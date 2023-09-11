import Link from 'next/link';
import React, {useState} from 'react';
import {MenuData} from "@/components/layout/types";
import {useDispatch, useSelector} from "@/hooks";
import {toggleMobileNav} from "@/app/globalSlice";
import {NextRouter, useRouter} from "next/router";
import {motion, useMotionValueEvent, useScroll} from 'framer-motion';
import Image from "next/image";

const SCROLL_WITH_NAV_HEIGHT = 150;

export const Header = () => {
    const [hideNavbar, setHideNavbar] = useState(false);
    const {scrollY} = useScroll();

    useMotionValueEvent(scrollY, 'change', (scrolledPosition) => {
        const previousScrolledPosition = scrollY.getPrevious();
        const isScrollingDown = scrolledPosition > previousScrolledPosition;
        if (isScrollingDown && scrolledPosition > SCROLL_WITH_NAV_HEIGHT) {
            setHideNavbar(true)
        } else {
            setHideNavbar(false)
        }
    })

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
            {showMobileNav ? <div className="fixed mx-auto w-full top-16 left-0 bg-rose-300 text-black xl:hidden">
                <MobileMenuItems/>
            </div> : null}
        </>
    );
};

const MenuToggleButton = () => {
    const dispatch = useDispatch()
    const {showMobileNav} = useSelector(state => state.global)
    const toggleMobileMenu = () => {
        dispatch(toggleMobileNav())
    }
    return <button onClick={toggleMobileMenu} className="lg:hidden px-3">
        {showMobileNav ? 'Close' : 'Menu'}
    </button>
}

const DesktopMenuItems = () => {
    const router = useRouter();

    return (
        <ul className="hidden menu-list lg:flex px-3">
            {
                menuData.map((menu: MenuData, index) => (
                    <li
                        className={`transition-transform p-2 mx-2 hover:underline ${getActiveTabStyles(menu, router)}
                            `}
                        key={index}>
                        <Link href={menu.href}>
                            <span className="text-md px-4">{menu.label}</span>
                        </Link>
                    </li>
                ))
            }
        </ul>)
}

const MobileMenuItems = () => {
    const dispatch = useDispatch()
    const toggleMobileMenu = () => {
        dispatch(toggleMobileNav())
    }
    return (
        <ul className="flex flex-col text-center items-stretch text-white">
            {
                menuData.map((menu, index) => (
                    <Link onClick={toggleMobileMenu} href={menu.href} key={index}>
                        <li className=" p-2 mx-2 cursor-pointer border-collapse my-1 border-b">
                            {menu.label}
                        </li>
                    </Link>
                ))
            }
        </ul>
    )
}

const getActiveTabStyles = (menu: MenuData, router: NextRouter, activeStyleClasses: string = 'border-2 rounded-sm') => {
    const pathName = router.pathname;
    const activeClasses = activeStyleClasses;
    const isRootPage = menu.path === '/';
    return (isRootPage ? menu.path === pathName : pathName.startsWith(menu.path)) ? activeClasses : ''
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
