import Link from 'next/link';
import React from 'react';
import {MenuData} from "@/components/layout/types";
import Image from "next/image";
import {useDispatch, useSelector} from "@/hooks";
import {toggleMobileNav} from "@/app/globalSlice";

export const Header = () => {
    return (
        <section className="fixed w-full bg-stone-900 text-white z-50">
            <nav className="container h-16 flex items-center justify-between ">
                <div className="font-bold text-xl px-3 flex gap-2 items-center">
                    <Image src={"/static/logo.png"} alt={'logo'} width={40} height={40}/>
                    <Link href="/">Let's Cook</Link>
                </div>
                <DesktopMenuItems/>
                <MenuToggleButton/>
                <MobileMenu/>
            </nav>
        </section>
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

const DesktopMenuItems = () => (
    <ul className="hidden menu-list lg:flex px-3">
        {
            menuData.map((menu: MenuData, index) => (
                <li className="transition-transform px-4 hover:underline" key={index}>
                    <Link href={menu.href}>
                        <span className="text-md px-4">{menu.label}</span>
                    </Link>
                </li>
            ))
        }
    </ul>
)

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

const menuData: Array<MenuData> = [
    {
        href: '/',
        label: 'Home'
    },
    {
        href: '/recipes?filter=Country&value=American',
        label: 'Recipes'
    }
]
