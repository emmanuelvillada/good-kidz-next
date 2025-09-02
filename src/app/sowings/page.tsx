'use client'

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/map/Map'), {
    ssr: false,
});

export default function SowingsPage() {
    return (
        <div className='container mx-auto mt-20 p-4'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-8 text-center'>Siembras</h1>
            <Map />
        </div>
    );
}
