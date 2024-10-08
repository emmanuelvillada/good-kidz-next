export default function ElegirCategoria({ onCategorySelect }: { onCategorySelect: (category: string) => void }) {
    const categorias = ['Pintura', 'Escultura', 'Fotografía', 'Dibujo'];
  
    return (
      <div className="mt-6">
        <label htmlFor="categoria" className="block text-lg md:text-xl text-gray-700">Elige una categoría</label>
        <select
          id="categoria"
          className="w-full bg-transparent border-b-2 border-white p-2 focus:outline-none text-white"
          onChange={(e) => onCategorySelect(e.target.value)}
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    );
  }
  