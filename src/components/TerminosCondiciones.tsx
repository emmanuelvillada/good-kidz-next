import Categorias from '@/public/categorias.png';
import Image from 'next/image';

export default function TerminosCondiciones() {
  return (
    <section className="p-4 md:p-12 bg-white flex flex-col md:flex-row justify-between items-start text-gray-600">
      
      {/* Columna izquierda con la imagen de categorías (ubicada abajo en pantallas pequeñas, izquierda en grandes) */}
      <div className="w-full md:w-[40%] flex justify-center md:justify-start mb-8 md:mb-0">
        <Image
          src={Categorias}
          alt="Imagen de categorías"
          width={242}
          height={242}
          className="md:ml-0"
        />
      </div>

      {/* Columna derecha con los términos y condiciones en dos columnas */}
      <div className="w-full md:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="pr-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Modelo de Términos y Condiciones:</h1>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            <strong>1. Introducción</strong> <br />
            Bienvenido a la página web de la Fundación GOOD KIDZ. Al acceder y utilizar nuestro sitio web, usted acepta estar sujeto a los siguientes Términos y Condiciones.
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            <strong>2. Aceptación de los Términos</strong> <br />
            Al utilizar este sitio, usted acepta estos Términos y Condiciones en su totalidad. Si no está de acuerdo con alguna parte de estos términos, le solicitamos que no utilice este sitio web.
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            <strong>3. Registro y Participación en el 1er Encuentro Arte y Vida</strong> <br />
            Para participar en las convocatorias y eventos de la Fundación, los usuarios deberán registrarse en nuestro sitio.
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            <strong>4. Propiedad Intelectual</strong> <br />
            Todos los contenidos (textos, imágenes, gráficos, etc.) publicados en este sitio web son propiedad de la Fundación GOOD KIDZ.
          </p>
        </div>

        {/* Línea verde divisora (solo visible en pantallas grandes) */}
        <div className="hidden md:block border-l-4 border-green-500 pl-6">
          <p className="text-base md:text-lg text-gray-600 mb-6">
            <strong>5. Uso Aceptable del Sitio</strong> <br />
            El uso de nuestro sitio debe cumplir con las leyes locales y nacionales.
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            <strong>6. Modificaciones a los Términos y Condiciones</strong> <br />
            La Fundación GOOD KIDZ se reserva el derecho de modificar estos términos en cualquier momento.
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            <strong>7. Responsabilidad Limitada</strong> <br />
            La Fundación GOOD KIDZ no será responsable por cualquier daño o pérdida derivada del uso de este sitio web.
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            <strong>8. Contacto</strong> <br />
            Para cualquier pregunta relacionada con estos Términos y Condiciones, puede contactarnos a través de [email].
          </p>
        </div>
      </div>
    </section>
  );
}
