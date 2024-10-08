import { useState } from 'react';
import SubirObra from './SubirObra';
import ElegirCategoria from './ElegirCategoria';

export default function SubirObraConCategoria() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <section className="p-6 md:p-12 bg-green-500 text-gray-700 flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Subir obra y elegir categoría</h1>
      <SubirObra />
      <ElegirCategoria onCategorySelect={handleCategorySelect} />
      {selectedCategory && <p className="mt-4">Categoría seleccionada: {selectedCategory}</p>}
    </section>
  );
}
