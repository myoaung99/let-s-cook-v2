import React from 'react';
import {Header} from './header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <Header/>
            <main className='container'>
                {children}
            </main>

        </>
    );
};

export default Layout;
