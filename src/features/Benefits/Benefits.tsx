import React from 'react';
import Image from "next/image";

function Benefits() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-5 my-16'>
            <div>
                <p className='text-xl font-bold mb-4'>Creative</p>
                <p className='text-slate-500'>
                    Revolutionize your cooking routine with our recipe finder. Say goodbye to culinary monotony as you
                    explore an collection of diverse recipes and dietary needs.
                </p>
            </div>

            <div>
                <p className='text-xl font-bold mb-4'>Easy</p>
                <p className='text-slate-500'>
                    Effortlessly access detailed recipes, cooking tips, and a vibrant cooking community. Simplify
                    meal
                    planning and connect with fellow food lovers.
                </p>
            </div>

            <div className='md:col-span-2 lg:col-span-1'>
                <p className='text-xl font-bold mb-4'>Save</p>
                <p className='text-slate-500'>
                    Save time and money by discovering budget-friendly recipes.
                    Become a confident home cook with our user-friendly platform. Start your cooking journey today!
                </p>
            </div>
        </div>

    );
}

export {Benefits}