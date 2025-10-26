export default function MissionVision() {
    return (
        <section className="w-full bg-white overflow-hidden pt-8 sm:pt-12 lg:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Misión */}
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-verde-goodkidz mb-2">
                                MISIÓN
                            </h2>
                            <div className="w-full sm:w-48 h-1 bg-verde-goodkidz"></div>
                        </div>

                        <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                            La Fundación GOOD KIDZ es una organización sin ánimo de lucro que
                            impulsa el desarrollo humano a través de proyectos formativos de
                            carácter artístico, recreativo y lúdico promoviendo inclusión, conciencia
                            ambiental, autoconocimiento y bienestar. Con raíces en Medellín y alianzas
                            con instituciones educativas y otras organizaciones, impulsa iniciativas que
                            fortalecen el tejido social y mejoran la calidad de vida de las comunidades
                            diversas, sin distinción, frente a los retos sociales, ambientales y económicos
                            del presente.
                        </p>
                    </div>

                    {/* Visión */}
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-verde-goodkidz mb-2">
                                VISIÓN
                            </h2>
                            <div className="w-full sm:w-48 h-1 bg-verde-goodkidz"></div>
                        </div>

                        <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                            Para el 2035, la Fundación GOOD KIDZ será reconocida como
                            un referente de transformación social a través de las artes, la educación
                            y la recreación, fomentando conciencia ambiental, inclusión y bienestar
                            en comunidades diversas a nivel local, nacional e internacional.
                            Consolidará vínculos de colaboración con instituciones educativas,
                            fundaciones y organizaciones afines que compartan nuestros propósitos
                            de apoyo a territorios y comunidades con historias por transformar,
                            fortaleciendo así un compromiso firme con la equidad, la diversidad
                            y la sostenibilidad.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}