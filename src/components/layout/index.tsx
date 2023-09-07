import React from 'react';
import {Header} from './header';
import {Footer} from './footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <Header/>
            <div className='h-16'/>
            <main className='container min-h-screen'>
                {children}
            </main>
            <Footer/>
        </>
    );
};

export default Layout;
