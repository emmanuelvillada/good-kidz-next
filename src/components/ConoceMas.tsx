import Categorias from'@/public/categorias.png';
import Image from 'next/image';

export default function ConoceMas() {
  return (
    <section className="min-h-screen flex flex-col p-8 md:p-12 bg-white justify-between">
      {/* Columna superior con el título y subtítulo */}
      <div className="md:flex md:justify-between items-start">
        <div className="md:w-[50%]">
          <h1 className="text-5xl md:text-7xl font-bold text-green-500 leading-tight">
            <span className="text-7xl">1</span><span className="align-top text-4xl underline">er</span> Encuentro <br /> Arte y Vida
          </h1>
          <h2 className="text-3xl md:text-4xl text-green-300 mb-6">PLANETA VERDE</h2>
          <Image
            src={Categorias}
            alt="Imagen de categorías"
            width={242}
            height={242}
            className="mr-4"
          />
        </div>

        {/* Columna derecha con texto en dos columnas */}
        <div className="md:w-[45%] grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-6">
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.
            </p>
          </div>

          <a href="#" className="text-green-500 font-bold hover:underline col-span-2 text-right">
            Ver documento completo
          </a>
        </div>
      </div>
    </section>
  );
}
