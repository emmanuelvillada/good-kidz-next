import React from 'react';
import { Heart, Calendar, MapPin, Users, Camera } from 'lucide-react';

function App() {
    const events = [
        {
            id: 1,
            title: "Día de la Alegría",
            date: "15 de Marzo, 2024",
            location: "Comuna 13, Medellín",
            description: "Llevamos sonrisas y actividades recreativas a más de 100 niños de la comunidad.",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2670"
        },
        {
            id: 2,
            title: "Taller de Arte",
            date: "28 de Febrero, 2024",
            location: "Parque Biblioteca España",
            description: "Desarrollamos la creatividad de los niños a través del arte y la pintura.",
            image: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&q=80&w=2670"
        },
        {
            id: 3,
            title: "Deportes para Todos",
            date: "10 de Febrero, 2024",
            location: "Cancha San Javier",
            description: "Torneo deportivo que unió a más de 200 jóvenes de diferentes comunas.",
            image: "https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?auto=format&fit=crop&q=80&w=2670"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex items-center gap-3 mb-6">
                        <Heart className="w-8 h-8" />
                        <h1 className="text-3xl font-bold">Good Kidz</h1>
                    </div>
                    <h2 className="text-5xl font-bold mb-4">Construyendo Futuros Brillantes</h2>
                    <p className="text-xl opacity-90 max-w-2xl">
                        Transformando vidas y creando oportunidades para los niños y jóvenes de Medellín
                    </p>
                </div>
            </header>

            {/* Events Section */}
            <main className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Nuestros Eventos</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Conoce el impacto que estamos generando en nuestra comunidad a través de eventos significativos
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 mb-3">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{event.location}</span>
                                </div>
                                <p className="text-gray-600">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Stats Section */}
            <section className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <Users className="w-8 h-8 mx-auto mb-4" />
                            <h3 className="text-4xl font-bold mb-2">1,200+</h3>
                            <p className="text-gray-400">Niños Beneficiados</p>
                        </div>
                        <div>
                            <Calendar className="w-8 h-8 mx-auto mb-4" />
                            <h3 className="text-4xl font-bold mb-2">50+</h3>
                            <p className="text-gray-400">Eventos Realizados</p>
                        </div>
                        <div>
                            <Camera className="w-8 h-8 mx-auto mb-4" />
                            <h3 className="text-4xl font-bold mb-2">15+</h3>
                            <p className="text-gray-400">Comunas Impactadas</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Heart className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-gray-800">Good Kidz</span>
                    </div>
                    <p>© 2024 Good Kidz Foundation. Transformando vidas en Medellín.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;