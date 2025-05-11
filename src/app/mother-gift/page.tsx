// app/mother-gift/page.tsx
'use client';

import React from 'react'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { Fade, MoveOut, MoveIn, Sticky, batch, Animator, ScrollContainer, ScrollPage } from 'react-scroll-motion'
import Image from 'next/image';
import { useMotherStore } from '@/store/useMotherStore'

export default function MotherGiftPage() {
    const info = useMotherStore((s) => s.info)
    const [photoURL, setPhotoURL] = useState<string | null>(null);

    // 2. Whenever the user’s File changes, build a URL and clean up after
    useEffect(() => {
        if (info?.photo) {
            const url = URL.createObjectURL(info.photo);
            setPhotoURL(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [info?.photo]);

    if (!info) {
        return <p>Oops—you skipped the form. <a href="/mother-info">Go back</a>.</p>
    }

    // map favouriteColor to rgba tints
    const tintMap: Record<string, string> = {
        Red: 'rgba(255, 0, 0, 0.2)',
        Pink: 'rgba(255, 192, 203, 0.2)',
        Purple: 'rgba(128, 0, 128, 0.2)',
        Blue: 'rgba(0, 0, 255, 0.2)',
        Yellow: 'rgba(255, 255, 0, 0.2)',
        White: 'rgba(255, 255, 255, 0.2)',
        Orange: 'rgba(255, 165, 0, 0.2)',
        Green: 'rgba(0, 128, 0, 0.2)',
        Lavender: 'rgba(230, 230, 250, 0.2)',
        Peach: 'rgba(255, 218, 185, 0.2)',
    };

    const tint = tintMap[info.favoriteColor] || 'transparent';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {/* full-screen tint overlay */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{ backgroundColor: tint, zIndex: 0 }}
            />
            <div className='home-container mb-20'>
                <ScrollContainer>
                    <ScrollPage>
                        <Animator animation={batch(Fade(), Sticky(), MoveIn(-100, 500), MoveOut(0, -300))}>
                            <h1 className="text-4xl sm:text-6xl font-bold text-center">Hi, Mom!</h1>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator animation={batch(Fade(), Sticky(), MoveIn(0, 300), MoveOut(0, -500))}>
                            <h1 className="text-3xl sm:text-5xl font-semibold text-center">Happy Mother&apos;s Day!</h1>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator className="w-75 sm:w-1/2 backdrop-blur-md bg-white/5 rounded-4xl" animation={batch(Fade(), Sticky(), MoveIn(0, 600), MoveOut(0, -500))}>
                            <div className='flex flex-col items-center text-center p-5 md:p-10 lg:p-20 rounded-4xl shadow-lg'>
                                {photoURL && (
                                    <div className="mb-8 flex justify-center">
                                        <Image
                                            src={photoURL}
                                            alt="You and Mom"
                                            width={300}
                                            height={300}
                                            unoptimized
                                            className="rounded-4xl object-cover shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
                                        />
                                    </div>
                                )}
                                <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl">{info.personalMessage}</h1>
                                <p className="text-lg mt-5">- {info.yourName}</p>
                            </div>

                        </Animator>
                    </ScrollPage>
                </ScrollContainer>
                <Image
                    src="/down.png"
                    alt="scroll down"
                    width={100}
                    height={100}
                    className="fixed bottom-0 inset-x-0 mx-auto block opacity-30 animate-bounce"
                />
            </div>

        </motion.div>
    );
}
