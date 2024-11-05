import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [acceptsEmails, setAcceptsEmails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleSubscribe = async () => {
    if (!name || !email) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }
    if (!acceptsEmails) {
      setErrorMessage('Debes aceptar los términos y condiciones.');
      return;
    }

    setLoading(true);
    const { error: dbError } = await supabase
      .from('users')
      .insert({ name, email, lastname })
      .select();

    setLoading(false);

    if (dbError) {
      setErrorMessage(`Error al crear el usuario: ${dbError.message}`);
      return;
    }

    setIsOpen(false);
    alert('¡Gracias por suscribirte!');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
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
                placeholder="María"
                type="text"
                className="w-full px-4 py-2 text-gris-goodkidz border rounded-lg focus:outline-none focus:ring-2 focus:ring-verde-goodkidz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Apellido:</label>
              <input
                placeholder="Gómez Herrera"
                type="text"
                className="w-full px-4 py-2 text-gris-goodkidz border rounded-lg focus:outline-none focus:ring-2 focus:ring-verde-goodkidz"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Correo electrónico:</label>
              <input
                placeholder="email@example.com"
                type="email"
                className="w-full px-4 py-2 text-gris-goodkidz border rounded-lg focus:outline-none focus:ring-2 focus:ring-verde-goodkidz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="aceptar"
                checked={acceptsEmails}
                onChange={() => setAcceptsEmails(!acceptsEmails)}
                className="mr-2"
              />
              <label htmlFor="aceptar" className="text-gray-700">
                Acepto recibir correos electrónicos de la fundación Good Kidz.
              </label>
            </div>
            {errorMessage && (
              <p className="text-red-500 mb-4 text-sm">{errorMessage}</p>
            )}
            <button
              type="submit"
              className={`w-full ${
                loading ? 'bg-gray-400' : 'bg-verde-goodkidz hover:bg-green-700'
              } text-white font-bold py-2 px-4 rounded transition-all`}
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Suscribirse'}
            </button>
          </form>
        </div>
      </div>
    )
  );
}
