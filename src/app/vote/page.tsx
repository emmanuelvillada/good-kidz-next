'use client';
import { useState } from 'react';
import Voting from '@/components/Voting';
import { supabase } from '@/lib/supabase';


export default function Vote() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Llamada a la API para verificar si el email está en la tabla `admin`
    supabase.from('admins').select('*').eq('email', email).then((response) => {
        if (response.error) {
            setError('Error al verificar el correo.');
        } else if (response.data.length === 0) {
            setError('Correo no autorizado.');
        } else{
            checkPassword(password);
            setIsAdmin(true);
            setError('');
        }
        

        
    });
  };

  const checkPassword = async (password: string) => {
    if (password !== process.env.VOTE_PASSWORD) {
      setError('Contraseña incorrecta.');
      return;
    }
  };




  if (isAdmin) {
    return <Voting />; // Renderiza el componente de votación si es un admin
  }

  return (
    <div className='flex flex-col items-center justify-self-auto '>
      <h2 className='text-2xl font-bold mb-4 mt-8'>Acceso a Votación</h2>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <input
        className='mb-4 '
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
        className='mb-4 '
          type="password"
          placeholder="Ingresa la contraseña para votar"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='bg-verde-goodkidz text-white py-2 px-4 rounded hover:bg-blanco-goodkidz hover:text-verde-goodkidz hover:transition duration-300' type="submit">Ingresar</button>
      </form>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
}


