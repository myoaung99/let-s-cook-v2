import Link from 'next/link';
import React, {useState} from 'react';
import {MenuData, MenuToggleButtonProps, MobileMenuProps} from "@/components/layout/types";
import Image from "next/image";

export const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <section className="fixed w-full bg-stone-900 text-white z-50">
            <nav className="container h-16 flex items-center justify-between ">
                <div className="font-bold text-2xl px-3 flex gap-2 items-center">
                    <Image src={"/static/logo.png"} alt={'logo'} width={40} height={40}/>
                    <Link href="/">Let's Cook</Link>
                </div>
                <DesktopMenuItems/>
                <MenuToggleButton setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu}/>
                <MobileMenu
                    showMobileMenu={showMobileMenu}
                    setShowMobileMenu={setShowMobileMenu}
                />
            </nav>
        </section>
    );
};

const MobileMenu: React.FC<MobileMenuProps> = ({showMobileMenu, setShowMobileMenu}) => {
    const toggleMobileMenu = ()=> setShowMobileMenu(prevState => !prevState)
    return (
        <>
            {showMobileMenu ?  <div className="fixed mx-auto w-full top-16 left-0 bg-rose-300 text-black xl:hidden">
                <MobileMenuItems toggleMobileMenu={toggleMobileMenu}/>
            </div>: null}
        </>
    );
};

const MenuToggleButton: React.FC<MenuToggleButtonProps> = ({showMobileMenu, setShowMobileMenu}) => {
    const toggleMobileMenu = () => {
        setShowMobileMenu((prevState: any) => !prevState)
    }
    return <button onClick={toggleMobileMenu} className="lg:hidden px-3">
        {showMobileMenu ? 'Close' : 'Menu'}
    </button>
}

const DesktopMenuItems = () => (
    <ul className="hidden menu-list lg:flex px-3">
        {
            menuData.map((menu: MenuData) => (
                <li className="transition-transform px-4 hover:scale-95">
                    <Link href={menu.href}>
                        <span className="text-lg px-4">{menu.label}</span>
                    </Link>
                </li>
            ))
        }
    </ul>
)

const MobileMenuItems = ({toggleMobileMenu}: { toggleMobileMenu: () => void }) => (
    <ul className="flex flex-col text-center items-stretch text-white">
        {
            menuData.map(menu => (
                <Link onClick={toggleMobileMenu} href={menu.href}>
                    <li className=" p-2 mx-2 cursor-pointer border-collapse my-1 border-b">
                        {menu.label}
                    </li>
                </Link>
            ))
        }
    </ul>
)

const menuData: Array<MenuData> = [
    {
        href: '/',
        label: 'Home'
    },
    {
        href: '/recipes?filter=category&value=chicken',
        label: 'Recipes'
    }
]
