import Image from 'next/image';
import Categorias from '@/public/estrella_blanca.png';
import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

export default function Registro() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        apellido: '',
        age: '',
        ciudad: 'Medellin',
        categoria: 'Pintura',
    });
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [acceptsEmails, setAcceptsEmails] = useState(false);
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id]: value,
        });

        if (id === 'age') {
            updateCategories(value);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                setMessage('Solo se permiten archivos PNG, JPG, PDF y JPEG.');
                return;
            }

            const maxSize = 5 * 1024 * 1024; // 5 MB
            if (file.size > maxSize) {
                setMessage('El archivo debe ser menor de 5 MB.');
                return;
            }

            const sanitizedFileName = file.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9.-_]/g, "_");

            const renamedFile = new File([file], sanitizedFileName, { type: file.type });
            setSelectedFile(renamedFile);
            setMessage('');
        }
    };

    const updateCategories = (age: string) => {
        const parsedAge = parseInt(age, 10);

        let categories: string[] = [];

        if (!isNaN(parsedAge)) {
            if (parsedAge >= 6 && parsedAge <= 10) {
                categories = ['Cuento Infantil Ilustrado'];
            }
            if (parsedAge >= 8 && parsedAge <= 12) {
                categories.push('Dibujo', 'Pintura');
            }
            if (parsedAge > 12) {
                categories = ['Obra Gráfica', 'Cartel', 'Dibujo', 'Pintura'];
            }
        }

        setAvailableCategories(categories);
        if (!categories.includes(formData.categoria)) {
            setFormData((prev) => ({ ...prev, categoria: categories[0] || '' }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!acceptsEmails) {
            setMessage('Debes aceptar recibir correos electrónicos para continuar.');
            return;
        }

        if (!formData.email || !formData.name.trim() || !formData.apellido.trim() || !formData.age) {
            setMessage('Todos los campos son obligatorios.');
            return;
        }

        const age = parseInt(formData.age, 10);
        if (isNaN(age) || age < 5 || age > 120) {
            setMessage('Por favor, ingresa una edad válida entre 5 y 120 años.');
            return;
        }

        if (!selectedFile) {
            setFileError('Por favor, selecciona un archivo PNG o JPEG válido.');
            return;
        }

        try {
            const { data: storageData, error: storageError } = await supabase.storage
                .from('obras')
                .upload(`public/${selectedFile.name}`, selectedFile);

            if (storageError) throw storageError;

            const imageUrl = storageData?.path;

            const { error: dbError } = await supabase
                .from('users')
                .insert([
                    {
                        email: formData.email,
                        name: formData.name,
                        lastname: formData.apellido,
                        age: formData.age,
                        city: formData.ciudad,
                        obra_url: imageUrl,
                        categoria: formData.categoria,
                    },
                ]);

            if (dbError) throw dbError;

            // Mostrar modal de éxito
            setShowSuccessModal(true);

            setMessage('Registro exitoso y obra subida correctamente.');
            setFormData({ email: '', name: '', apellido: '', age: '', ciudad: 'Medellin', categoria: '' });
            setFileError(null);
        } catch (error) {
            console.error(error);
            setMessage('Error al registrar y subir la obra.');
        }
    };
    return (
        <section className="p-6 md:p-12 bg-verde-goodkidz text-gray-800 flex flex-col items-center min-h-screen relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">¡Regístrate y sube tu obra!</h1>
            <p className="lg:text-center md:text-center sm:text-start text-gray-700 mb-6">
                Registra tus datos y sube tu obra en formato JPG, JPEG o PDF, el archivo debe ser menor a 5MB.
            </p>
            <div className="bg-transparent p-4 rounded-lg  text-gray-800 w-full md:w-[60%] mb-6">
                <h2 className="text-xl font-bold mb-2">Categorías:</h2>
                <ul className="list-disc space-y-2">
                    <li><strong>6 a 10 años:</strong> Cuento Infantil Ilustrado.</li>
                    <li><strong>8 a 12 años:</strong>  Dibujo y Pintura.</li>
                    <li><strong>Adultos:</strong> Obra Gráfica, Cartel, Dibujo y Pintura.</li>
                </ul>
            </div>
            <form className="w-full md:w-[60%] space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-lg md:text-xl text-gray-700">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2  text-gray-700 placeholder-gray-700"
                        placeholder="correo@gmail.com"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name" className="block text-lg md:text-xl text-gray-700">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2  text-gray-700 placeholder-gray-700"
                        placeholder="Nombre"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="apellido" className="block text-lg md:text-xl text-gray-700">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2  text-gray-700 placeholder-gray-700"
                        placeholder="Apellido"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="age" className="block text-lg md:text-xl text-gray-700">Edad</label>
                    <input
                        type="number"
                        id="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2  text-gray-700 placeholder-gray-700"
                        placeholder="Edad"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ciudad" className="block text-lg md:text-xl text-gray-700">Ciudad</label>
                    <select
                        id="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2  text-gray-700"
                        required
                    >
                        <option value="Medellin">Medellín</option>
                        <option value="Envigado">Envigado</option>
                        <option value="Itagui">Itagüí</option>
                        <option value="Sabaneta">Sabaneta</option>
                        <option value="Caldas">Caldas</option>
                        <option value="Bello">Bello</option>
                        <option value="Copacabana">Copacabana</option>
                        <option value="Girardota">Girardota</option>
                        <option value="Barbosa">Barbosa</option>
                        <option value="Rionegro">Rionegro</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="categoria" className="block text-lg md:text-xl text-gray-700">Categoria</label>
                    <select
                        id="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2  text-gray-700"
                        required
                    >
                        {availableCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="file" className="block text-lg md:text-xl text-gray-700">Sube la imagen tu obra</label>
                    <div className="relative w-full">
                        <input
                            type="file"
                            id="file"
                            accept=".png, .jpeg, .jpg, .pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button
                            type="button"
                            className="w-60 flex items-center justify-center bg-transparent border-2 border-white text-gray-700 py-2 px-4 rounded-lg cursor-pointer 
            hover:bg-white hover:text-verde-goodkidz transition-all duration-300 ease-in-out shadow-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 16l4 4m0 0l4-4m-4 4V4"
                                />
                            </svg>
                            Seleccionar archivo
                        </button>
                        <p className="text-sm text-gray-700 mt-2">
                            {selectedFile ? selectedFile.name : "Ningún archivo seleccionado"}
                        </p>
                        {fileError && <p className="text-red-500 mt-1">{fileError}</p>}
                    </div>

                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="aceptar"
                        checked={acceptsEmails}
                        onChange={() => setAcceptsEmails(!acceptsEmails)} // Manejar el cambio de la casilla
                        className="mr-2"
                    />
                    <label htmlFor="aceptar" className="text-sm md:text-base text-gray-700">
                        Acepto recibir correos electrónicos de la fundación Good Kidz.
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-transparent border-2 border-white text-white py-3 mt-4 text-lg md:text-xl font-bold hover:bg-white hover:text-green-500 transition-all"
                >
                    ¡Regístrate!
                </button>
            </form>
            <div>{message && <p>{message}</p>}</div>
            {/* Modal de éxito */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg text-center shadow-lg">
                        <h2 className="text-2xl font-bold text-verde-goodkidz mb-4">¡Registro Exitoso!</h2>
                        <p className="text-gray-600">Tu obra ha sido registrada correctamente.</p>
                        <button
                            className="mt-4 bg-verde-goodkidz text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
                            onClick={() => setShowSuccessModal(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
            {/* Imagen de categorías en la parte inferior (visible solo en pantallas grandes con posición absoluta) */}
            <div className="mt-10 md:mt-0 md:absolute md:bottom-40 md:left-4">
                <Image
                    src={Categorias}
                    alt="Prepara tus obras"
                    width={150}
                    height={150}
                    className="w-[150px] h-[150px] md:w-[242px] md:h-[242px]"
                />
            </div>
        </section>
    );
}
