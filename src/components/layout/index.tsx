import React from 'react';
import {Header} from './header';
import {Footer} from './footer';
import {useRouter} from "next/router";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const {pathname} = useRouter()
    console.log('pathname', pathname)
    return (
        <>
            <Header/>
            <div className='h-16'/>
            <main className={`${pathname !== '/user-profile/[[...index]]' ? 'container' : ''} min-h-screen`}>
                {children}
            </main>
            <Footer/>
        </>
    );
};

export default Layout;
