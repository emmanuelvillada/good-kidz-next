import { Button } from '@/components/ui/button';
export default function Hero() {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-green-400 text-white pt-48 pb-16">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-5xl font-bold mb-4">Construyendo un Futuro Brillante</h1>
                <p className="text-xl mb-8">Ayudando a los niños de Medellín a alcanzar su máximo potencial</p>
                <Button className="bg-yellow-400 text-black text-lg hover:bg-yellow-500">¡Únete a Nosotros!</Button>
            </div>
        </div>
    );
}