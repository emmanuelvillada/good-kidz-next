import Categorias from '@/public/categorias.png';
import Image from 'next/image';

export default function ConoceMas() {
  return (
    <section className=" flex flex-col p-12 md:px-12 md:pb-20 bg-white justify-between ">
      {/* Columna superior con el título y subtítulo */}
      <div className="md:flex md:justify-center items-start">
        <div className="flex flex-col items-start md:w-[50%] mb-8 md:mb-0">
          {/* Contenedor del título y subtítulo */}
          <h1 className="text-5xl md:text-8xl font-bold text-green-500 leading-tight text-center md:text-left">
            <span className="text-8xl">1</span>
            <span className="align-top text-4xl underline">er</span> <br /> Encuentro <br /> Arte y Vida
          </h1>
          <h2 className="text-3xl md:text-5xl text-green-300 my-6 text-center md:text-left">PLANETA VERDE</h2>

          {/* Imagen de categorías, visible solo en pantallas grandes, debajo del texto */}
          <div className="mt-4 md:mt-0 flex justify-center md:justify-start hidden md:block">
            <Image
              src={Categorias}
              alt="Imagen de categorías"
              width={242}
              height={242}
              className="w-[150px] md:w-[242px] h-auto"
            />
          </div>

        </div>

        {/* Columna derecha con texto en una sola columna para móviles y dos columnas para escritorio */}
        <div className="md:w-[45%] grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:mt-36 lg:mt-36 text-center md:text-left">
          <div className="mb-6">
            <p className="text-base md:text-lg text-gray-600">
              La Fundación <b>Good Kidz,</b> entidad sin ánimo de lucro que propende por la sensibilización, bienestar y apoyo a niños, jóvenes y adultos a través de proyectos y actividades artísticas, culturales y de recreación, con sede en la ciudad de <b>Medellín, Colombia,</b>  llevará a cabo la actividad artística:
              “<b>Encuentro Arte y Vida, Fundación Good Kidz Colombia 2024: PLANETA VERDE</b> ”.

              Es una convocatoria abierta a artistas y
              público en general para participar en una exposición de <b>ARTE</b> para <b>niñas, niños,
                jóvenes y personas adultas</b> con la temática “ <b>Preservación del Medio Ambiente</b>”.
            </p>
          </div>

          <div className="mb-6">
            <p className="text-base md:text-lg text-gray-600">
              Este tópico será motivo de reflexión, análisis, crítica y representación en este acontecimiento artístico que hace parte del evento musical <b>FERXXOCALIPSIS</b>  del artista colombiano <b>Feid, Ferxxo</b>  en la ciudad de <b>Medellín,</b>  los días <b>6, 7 y 8 de diciembre de 2024.</b>
            </p>
          </div>

          <a
  href="https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/sign/obras/public/Abstract,%20Encuentro%20Arte%20y%20Vida.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvYnJhcy9wdWJsaWMvQWJzdHJhY3QsIEVuY3VlbnRybyBBcnRlIHkgVmlkYS5wZGYiLCJpYXQiOjE3MjkxMjI4ODQsImV4cCI6NDg4MjcyMjg4NH0.Y9fxfD4RQ-TItVf9lbADOryys9n5OoyMCaAVzEd25SU&t=2024-10-16T23%3A54%3A44.564Z"
  target="_blank"
  rel="noopener noreferrer"
  className="text-green-500 font-bold hover:underline col-span-1 md:col-span-2 text-center md:text-right"
>
  Ver documento completo
</a>



        </div>
      </div>

      {/* Imagen de categorías, aparece debajo del contenido en pantallas pequeñas */}
      <div className="lg:hidden md:hidden mt-8 flex justify-center">
        <Image
          src={Categorias}
          alt="Imagen de categorías"
          width={150}
          height={150}
          className="w-[150px] h-auto"
        />
      </div>
    </section>
  );
}
