import Image from 'next/image';
import Categorias from '@/public/categorias_blanca.png';
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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validar el tipo de archivo
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg' , 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                setMessage('Solo se permiten archivos PNG, JPG, PDF y JPEG.');
                return;
            }
    
            // Validar el tamaño del archivo (5 MB en bytes)
            const maxSize = 5 * 1024 * 1024; // 5 MB
            if (file.size > maxSize) {
                setMessage('El archivo debe ser menor de 5 MB.');
                return;
            }
    
            // Renombrar el archivo eliminando caracteres especiales
            const sanitizedFileName = file.name
                .normalize("NFD") // Normaliza el nombre
                .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
                .replace(/[^a-zA-Z0-9.-_]/g, "_"); // Reemplaza caracteres no permitidos por "_"
    
            // Crear un nuevo archivo con el nombre limpio
            const renamedFile = new File([file], sanitizedFileName, { type: file.type });
    
            setSelectedFile(renamedFile);
            setMessage('');
        }
    };
    

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar si aceptó recibir correos electrónicos
        if (!acceptsEmails) {
            setMessage('Debes aceptar recibir correos electrónicos para continuar.');
            return;
        }

        // Validar que todos los campos estén llenos
        if (!formData.email || !formData.name.trim() || !formData.apellido.trim() || !formData.age) {
            setMessage('Todos los campos son obligatorios.');
            return;
        }

        // Validar que el correo tenga un formato válido
        if (!validateEmail(formData.email)) {
            setMessage('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Validar que la edad sea un número válido entre 5 y 120
        const age = parseInt(formData.age, 10);
        if (isNaN(age) || age < 5 || age > 120) {
            setMessage('Por favor, ingresa una edad válida entre 5 y 120 años.');
            return;
        }

        // Validar que se haya seleccionado un archivo
        if (!selectedFile) {
            setFileError('Por favor, selecciona un archivo PNG o JPEG válido.');
            return;
        }

        try {
            // Subir la imagen a Supabase Storage
            const { data: storageData, error: storageError } = await supabase.storage
                .from('obras')
                .upload(`public/${selectedFile.name}`, selectedFile);

            if (storageError) throw storageError;

            const imageUrl = storageData?.path;

            // Guardar los datos en la tabla "users" de Supabase
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

            setMessage('Registro exitoso y obra subida correctamente.');
            setFormData({ email: '', name: '', apellido: '', age: '', ciudad: 'Medellin', categoria: 'Pintura' });
            setFileError(null);
        } catch (error) {
            console.error(error);
            setMessage('Error al registrar y subir la obra.');
        }
    };

    return (
        <section className="p-6 md:p-12 bg-green-500 text-gray-700 flex flex-col items-center min-h-screen relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">¡Regístrate y sube tu obra!</h1>
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
                        placeholder="20"
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
                        <option value="Pintura">Pintura</option>
                        <option value="Cuento Infantil">Cuento Infantil</option>
                        <option value="Ilustrado">Ilustrado</option>
                        <option value="Collage">Collage</option>
                        <option value="Cartel">Cartel</option>
                        <option value="Grabado">Grabado</option>
                        <option value="Fotografia">Fotografia</option>
                        <option value="Dibujo">Dibujo</option>
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
                            className="w-60 bg-transparent border-2 border-white text-gray-700 py-2 px-4 rounded-lg cursor-pointer 
                              hover:bg-white hover:text-green-500 transition-all"
                        >
                            Seleccionar archivo
                        </button>
                        <p className="text-sm text-gray-700 mt-2">
                            {selectedFile ? selectedFile.name : "Ningún archivo seleccionado"}
                        </p>
                        {fileError && <p className="text-red-500">{fileError}</p>}
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
