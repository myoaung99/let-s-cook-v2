import React from 'react';
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className=' bg-stone-900'>
            <section
                className="p-4 container shadow flex items-center justify-center md:justify-between text-white">
                <div className="text-sm text-center hidden md:block space-x-2 h-6">
                    <span>© 2022</span>
                    <Link href="/" className="hover:underline">Let's Cook™</Link>
                    <span>All Rights Reserved.</span>
                </div>

                <p className="text-sm text-center dark:text-primary ">
                    Designed and Developed by
                    <span> Myo Myint Aung</span>
                </p>
            </section>
        </footer>

    );
}
