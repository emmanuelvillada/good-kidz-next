import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage('Error en el inicio de sesión');
    } else if (data.user) {
      setMessage('Inicio de sesión exitoso');
      // Aquí puedes redirigir al usuario a la página para subir obras
    }
  };

  return (
    <section className="p-6 md:p-12 bg-green-500 text-gray-700 flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Iniciar sesión</h1>
      <form onSubmit={handleLogin} className="w-full md:w-[60%] space-y-4">
        <div>
          <label htmlFor="email" className="block text-lg md:text-xl text-gray-700">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b-2 border-white p-2 focus:outline-none text-white placeholder-white"
            placeholder="correo@gmail.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-lg md:text-xl text-gray-700">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b-2 border-white p-2 focus:outline-none text-white placeholder-white"
            placeholder="Contraseña"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-transparent border-2 border-white text-white py-3 mt-4 text-lg md:text-xl font-bold hover:bg-white hover:text-green-500 transition-all"
        >
          Iniciar sesión
        </button>
      </form>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </section>
  );
}
