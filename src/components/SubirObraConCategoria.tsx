// src/components/SubirObraConCategoria.tsx
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SubirObraConCategoria({ onFileUpload }: { onFileUpload: (url: string) => void }) {
  const [categoria, setCategoria] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file && categoria) {
      const { data, error } = await supabase.storage
        .from('obras') // Asegúrate de tener un bucket 'obras' en Supabase.
        .upload(`images/${file.name}`, file);

      if (error) {
        console.error('Error uploading file:', error);
      } else if (data){
        const publicUrl = supabase.storage.from('obras').getPublicUrl(`images/${file.name}`).data.publicUrl;
        onFileUpload(publicUrl);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="categoria" className="block text-lg text-gray-700">
          Categoría
        </label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full bg-transparent border-b-2 border-white p-2 focus:outline-none text-white placeholder-white"
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          <option value="pintura">Pintura</option>
          <option value="escultura">Escultura</option>
          <option value="fotografia">Fotografía</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div>
        <label htmlFor="file" className="block text-lg text-gray-700">
          Sube tu obra
        </label>
        <input type="file" id="file" onChange={handleFileChange} className="text-white" />
      </div>
      <button
        type="button"
        onClick={handleUpload}
        className="bg-transparent border-2 border-white text-white py-2 px-4 mt-2 font-bold hover:bg-white hover:text-green-500 transition-all"
      >
        Subir obra
      </button>
    </div>
  );
}
