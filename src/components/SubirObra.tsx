import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SubirObra() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const { data, error } = await supabase.storage
      .from('obras')
      .upload(`obra-${Date.now()}-${selectedFile.name}`, selectedFile);

    if (error) {
      setMessage('Error al subir la obra');
    } else if(data) {
      setMessage('Obra subida exitosamente');
    }
  };

  return (
    <section className="p-6 md:p-12 bg-green-500 text-gray-700 flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Subir tu obra artística</h1>
      <label htmlFor="file" className=''>Foto:</label>
      <input placeholder='sube la foto de tu obra' type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-white text-green-500 py-3 px-6 rounded-lg hover:bg-green-500 hover:text-white"
      >
        Subir obra
      </button>
      {message && <p className="mt-4">{message}</p>}
    </section>
  );
}
