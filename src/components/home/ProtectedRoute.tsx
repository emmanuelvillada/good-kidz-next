
export default function MaintenanceModal() {




    return (
        <div className="pt-56 overflow-auto  fixed inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 md:p-12 text-center transform transition-all">


                {/* Mensaje de acceso */}
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-800">Página en mantenimiento</h2>
                    <p className="text-blue-700 mb-4">
                        Estamos realizando mejoras en nuestro sitio web para brindarte una mejor experiencia.
                        Durante este tiempo, algunas funcionalidades pueden no estar disponibles.
                    </p>
                    <p className="text-blue-700">
                        Agradecemos tu paciencia y comprensión. ¡Volveremos pronto con novedades emocionantes!
                    </p>
                </div>


            </div>
        </div>
    );
}