export default function About() {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto items-center px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sobre Good Kidz</h2>
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <div className="w-full md:w-1/2 p-6">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Nuestra Misión</h3>
                        <p className="text-gray-600 mb-4">
                            En Good Kidz, nos dedicamos a contribuir a la sociedad a través del arte, la educación y la cultura.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 p-6">
                        <h3 className="text-2xl font-bold text-green-600 mb-4">Nuestro Impacto</h3>
                        <ul className="list-disc list-inside text-gray-600">
                            <li>Más de 1,000 niños beneficiados</li>
                            <li>50+ programas educativos implementados</li>
                            <li>100+ voluntarios activos</li>
                            <li>Colaboraciones con 20+ escuelas locales</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

