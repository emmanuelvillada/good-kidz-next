import { useState, useEffect } from 'react';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Abre el modal automáticamente cuando se carga la página
    setIsOpen(true);
  }, []);

  const handleSubscribe = () => {
    // Aquí puedes manejar la lógica de suscripción, como enviar los datos a una API
    console.log('Nombre:', name);
    console.log('Correo:', email);

    // Cierra el modal después de suscribirse
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
          {/* Botón de cierre */}
          <button
            type="button"
            aria-label="Cerrar"
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-2xl font-bold text-center text-verde-goodkidz mb-4">
            ¡Suscríbete para recibir información!
          </h2>
          <p className="text-gray-700 text-center mb-6">
            Ingresa tu nombre y correo electrónico para recibir información de la Fundación Good Kidz.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubscribe();
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Nombre:</label>
              <input
                placeholder='John Doe'
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-verde-goodkidz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Correo electrónico:</label>
              <input
              placeholder='email@example.com'
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-verde-goodkidz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-verde-goodkidz hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </div>
    )
  );
}
