'use client';
import { useRouter } from 'next/navigation'; // App Router
import { Construction, ArrowRight } from 'lucide-react';

export default function MaintenanceModal() {
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/form');
    };


    return (
        <div className="pt-56 overflow-auto  fixed inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 md:p-12 text-center transform transition-all">
                {/* Icono animado */}
                <div className="mb-6 flex justify-center">
                    <div className="bg-amber-100 rounded-full p-6 animate-pulse">
                        <Construction className="w-16 h-16 text-amber-600" />
                    </div>
                </div>

                {/* Título */}
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Estamos Construyendo Algo Increíble
                </h1>

                {/* Descripción */}
                <p className="text-slate-600 text-lg mb-8">
                    Esta sección está actualmente en desarrollo. Estamos trabajando para ofrecerte
                    la mejor experiencia posible.
                </p>

                {/* Separador */}
                <div className="border-t border-slate-200 my-8"></div>

                {/* Mensaje de acceso */}
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <p className="text-slate-700 mb-4">
                        Mientras tanto, puedes acceder a nuestro formulario:
                    </p>
                    <button
                        onClick={() => handleNavigate()}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                        Ir al Formulario
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Footer */}
                <p className="text-sm text-slate-500">
                    Gracias por tu paciencia
                </p>
            </div>
        </div>
    );
}