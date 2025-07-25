import Image from "next/image";

export default function PortadaSlide() {
    return (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
            <Image
                src="/images/portada_microcuentos.jpg"
                alt="Portada Guardianes"
                className="object-cover w-full h-full opacity-80"
                fill
            />
            <div className="absolute text-white text-center p-6 max-w-3xl">
                <h3 className="text-4xl font-bold mb-4">Guardianes del Planeta Verde</h3>
                <p className="text-lg">
                    Un viaje sonoro tejido con la imaginación y la sabiduría de niñas y niños...
                </p>
            </div>
        </div>
    );
}

