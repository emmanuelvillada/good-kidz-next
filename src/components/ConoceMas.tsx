import timeline from '@/public/timeline.png';
import Image from 'next/image';


export default function ConoceMas() {
    return (
        <section className=" flex flex-col p-12 md:px-12 md:pb-20 bg-white justify-between ">
            {/* Columna superior con el título y subtítulo */}
            <div className="md:flex md:justify-center items-start">
                <div className="flex flex-col items-start md:w-[50%] mb-8 md:mb-0">
                    {/* Contenedor del título y subtítulo */}
                    <h1 className="text-5xl md:text-8xl font-bold text-verde-goodkidz leading-tight text-center md:text-left">
                        <span className="text-8xl">1</span>
                        <span className="align-top text-4xl underline">er</span> <br /> Encuentro <br /> Arte y Vida
                    </h1>
                    <h2 className="text-3xl md:text-5xl text-green-300 my-6 text-center md:text-left">PLANETA VERDE</h2>

                </div>

                {/* Columna derecha con texto en una sola columna para móviles y dos columnas para escritorio */}
                <div className="md:w-[45%] flex flex-col  mt-6 md:mt-36 lg:mt-36 text-center md:text-left">
                    <div className="mb-6">
                        <p className="text-base md:text-lg text-gray-600">
                            La Fundación <b>Good Kidz,</b> entidad sin ánimo de lucro que propende por la sensibilización, bienestar y apoyo a niños, jóvenes y adultos a través de proyectos y actividades artísticas, culturales y de recreación, con sede en la ciudad de <b>Medellín, Colombia,</b>  llevará a cabo la actividad artística:
                            “<b>Encuentro Arte y Vida, Fundación Good Kidz Colombia 2024: PLANETA VERDE</b> ”.

                            Es una convocatoria abierta a artistas y
                            público en general para participar en una exposición de <b>ARTE</b> para <b>niñas, niños,
                                jóvenes y personas adultas</b> con la temática “ <b>Preservación del Medio Ambiente</b>”.
                        </p>
                    </div>

                    <a
                        href="https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/sign/web%20files/politica_datos.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWIgZmlsZXMvcG9saXRpY2FfZGF0b3MucGRmIiwiaWF0IjoxNzMwNzczNTI5LCJleHAiOjIwNDYxMzM1Mjl9.NQcvjA5Vhim8letrU4rq-ylIjyWLfgEdKMpJ31VV3B4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 font-bold hover:underline col-span-1 md:col-span-2 text-center md:text-right"
                    >
                        Ver documento completo
                    </a>



                </div>
            </div>

            {/* Imagen de categorías, aparece debajo del contenido en pantallas pequeñas */}
            <div className=" mt-8 flex justify-center">
                <Image
                    src={timeline}
                    alt="Imagen de categorías"
                    width={952}
                    height={170}
                    className="w-full h-auto"
                />
            </div>
        </section>
    );
}