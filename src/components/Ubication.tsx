import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });

export default function Ubication() {
    return (
        <section className="container mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Nuestra Ubicación</h2>
            <Map />
        </section>
    );
}
