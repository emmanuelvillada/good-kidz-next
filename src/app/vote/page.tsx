'use client';
import { useState } from 'react';
import Voting from '@/components/Voting';


export default function Vote() {
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== process.env.NEXT_PUBLIC_VOTE_PASSWORD) {
      setError('Contraseña incorrecta.');
      return;
    }
    
    setIsAdmin(true);
  };






  if (isAdmin) {
    return <Voting />; // Renderiza el componente de votación si es un admin
  }

  return (
    <div className='flex flex-col items-center justify-self-auto '>
      <h2 className='text-2xl font-bold mb-4 mt-8'>Acceso a Obras</h2>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <input
        className='mb-4 '
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='bg-verde-goodkidz text-white py-2 px-4 rounded hover:bg-blanco-goodkidz  hover:text-verde-goodkidz hover:transition duration-300 hover: border-verde-goodkidz' type="submit">Ingresar</button>
      </form>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
}


