'use client';

import { useRouter } from 'next/navigation';
import { useMotherStore } from '@/store/useMotherStore';
import MotherInfoForm, { MotherInfo } from '@/components/MotherInfoForm';

export default function MotherInfoPage() {
    const router = useRouter();
    const setInfo = useMotherStore((s) => s.setInfo);

    const handleSubmit = (values: MotherInfo) => {
        setInfo(values);
        router.push('/mother-gift');
    };

    return (
        <main className="flex flex-col items-center justify-center p-4 mb-10">
            <h1 className="text-4xl font-bold mt-15">Who is she?</h1>
            <p className="text-center p-4">After clicking <strong>next</strong>, your e-gift will be ready.</p>
            <MotherInfoForm onSubmit={handleSubmit} />
            <p className='fixed top-1 right-3 opacity-75 text-pink-200'>Made with love, by <a href='https://www.isaacjiang.ca/' target="_blank" rel="noopener noreferrer"><u>Isaac Jiang</u></a></p>
        </main>
    );
}
