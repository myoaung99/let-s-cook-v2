import React from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { pathname } = useRouter();
    console.log('pathname', pathname);

    const isOnAuth = pathname === '/signin' || pathname === '/signup';
    return (
        <>
            {!isOnAuth ? <Header /> : null}
            {!isOnAuth ? <div className="h-16" /> : null}
            <main className={`${!isOnAuth ? 'container' : ''} min-h-screen`}>
                {children}
            </main>
            {!isOnAuth ? <Footer /> : null}
        </>
    );
};

export default Layout;
