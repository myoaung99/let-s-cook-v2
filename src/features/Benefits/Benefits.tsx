import React from 'react';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {useRouter} from "next/router";

function Benefits() {
    const router = useRouter();

    const handleDiscover = () => {
        router.push('/recipes?filter=Country&value=American')
    }

    return (
        <>
            <section className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-12'>
                {
                    BenefitsContent.map(({title, content}) => (
                        <article className='last:md:col-span-2 last:lg:col-span-1'>
                            <p className='text-xl font-bold mb-2'>{title}</p>
                            <p className='text-slate-500'>{content}</p>
                        </article>

                    ))
                }
            </section>
            <section className='w-full pb-16 lg:py-20'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-y-0 relative mb-12 lg:mb-0'>
                    <div className='bg-slate-400 aspect-video flex items-center justify-center relative'>
                        <Image fill src='/static/mission.jpg' alt='mission'
                               className='object-cover absolute brightness-50'/>
                        <p className='text-3xl md:text-5xl font-bold absolute z-10 text-white'>Mission</p>
                    </div>
                    <div className='lg:p-4 lg:px-16 flex items-center'>
                        <p className='text-md lg:text-sm xl:text-xl lg:font-serif lg:text-center tracking-wider'>
                            {MissionDefine}
                        </p>
                    </div>
                    <div
                        className='hidden lg:flex w-28 h-28 bg-black rounded-full absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 items-center justify-center z-20'>
                        <Button onClick={handleDiscover} variant='ghost'
                                className='w-full h-full text-white rounded-full tracking-wider'>
                            Discover
                        </Button>
                    </div>
                </div>
                <div className='flex flex-col-reverse gap-y-4 lg:gap-y-0 lg:grid lg:grid-cols-2'>
                    <div className='lg:p-4 lg:px-16 flex items-center'>
                        <p className='text-md lg:text-sm xl:text-xl lg:font-serif lg:text-center tracking-wider'>At
                            {CoreValueDefine}
                        </p>
                    </div>
                    <div className='bg-slate-400 aspect-video flex justify-center items-center relative'>
                        <Image fill src='/static/value.jpg' alt='mission'
                               className='object-cover absolute brightness-50'/>
                        <p className='text-3xl md:text-5xl font-bold absolute z-10 text-white'>Core Value</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export {Benefits}

const BenefitsContent = [
    {
        title: 'Creative',
        content: 'Revolutionize your cooking routine with our recipe finder. Say goodbye to culinary monotony as you explore an collection of diverse recipes and dietary needs.'
    }, {
        title: 'Easy',
        content: 'Effortlessly access detailed recipes, cooking tips, and a vibrant cooking community. Simplify meal planning and connect with fellow food lovers'
    }, {
        title: 'Save',
        content: 'Save time and money by discovering budget-friendly recipes. Become a confident home cook with our user-friendly platform. Start your cooking journey today!.'
    }
]

const MissionDefine = 'Our mission is to empower food enthusiasts of all backgrounds to explore the world of cooking, one recipe at a time. We strive to create a welcoming and user-friendly platform where anyone, from novice home cooks to seasoned chefs, can discover, create, and share culinary delights. Our goal is to provide a diverse and ever-expanding collection of high-quality recipes, supported by educational resources and a vibrant community.';

const CoreValueDefine = 'Let&apos;s Cook, our core values revolve around culinary diversity, user-centricity, quality, community, sustainability, innovation, and transparency. We\'re dedicated to curating a diverse range of recipes, prioritizing the user experience, upholding high quality standards, fostering an inclusive community, promoting sustainable cooking, encouraging continuous learning, and maintaining transparency in all our operations.'