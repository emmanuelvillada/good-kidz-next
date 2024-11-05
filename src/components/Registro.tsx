import Image from 'next/image';
import Categorias from '@/public/categorias2.png';
import Select, { SingleValue } from 'react-select';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';


interface CityOption {
    value: number;
    label: string;
}
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];

export default function Registro() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        apellido: '',
        age: '',
        ciudad: 'Medellin',
        categoria: 'Pintura',
        titulo: '',
        descripcion: '',
        socialUsername: '',
        socialNetwork: 'Instagram',
        tecnica: '',
        dimensiones: '',
        representante: '',
        cedula: '',
    });
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [acceptsEmails, setAcceptsEmails] = useState(false);
    const [acceptsTerms, setAcceptsTerms] = useState(false);
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [ciudades, setCiudades] = useState<CityOption[]>([]);
    const [showRepresentative, setShowRepresentative] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        // Si es el campo de cédula, limitamos el valor a solo dígitos y a 10 caracteres
        if (id === 'cedulaRepresentante') {
            setFormData({
                ...formData,
                cedula: value,  // Cambiado a 'cedula' en lugar de '[id]'
            });
            return;
        }
        setFormData({
            ...formData,
            [id]: value,
        });
        if (id === 'age') {
            updateCategories(value);
            checkAge(value);
        }
    };

    const checkAge = (age: string) => {
        const parsedAge = parseInt(age, 10);
        setShowRepresentative(!isNaN(parsedAge) && parsedAge < 18);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                setMessage('Solo se permiten archivos PNG, JPG, PDF y JPEG.');
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                setMessage('El archivo debe ser menor de 25 MB.');
                return;
            }

            const sanitizedFileName = file.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9.-_]/g, "_");

            // Generar un nombre único utilizando uuid y timestamp
            const uniqueFileName = `${Date.now()}_${uuidv4()}_${sanitizedFileName}`;

            setSelectedFile(new File([file], uniqueFileName, { type: file.type }));
            setMessage('');
        }
    };


    const handleSocialNetworkSelect = (network: string) => {
        setFormData({
            ...formData,
            socialNetwork: network,
        });
    };
    const handleCityChange = (selectedOption: SingleValue<CityOption>) => {
        setFormData({
            ...formData,
            ciudad: selectedOption ? selectedOption.label : '', // Maneja `null` asignando una cadena vacía
        });
    };

    useEffect(() => {
        fetch('https://api-colombia.com/api/v1/City')
            .then((response) => response.json())
            .then((data) => {
                const cityOptions = data.map((city: { id: number; name: string }) => ({
                    value: city.id,
                    label: city.name
                }));
                setCiudades(cityOptions);
            })
            .catch((error) => console.error('Error al cargar ciudades:', error));
    }, []);

    const updateCategories = (age: string) => {
        const parsedAge = parseInt(age, 10);
        let categories: string[] = [];
        if (!isNaN(parsedAge)) {
            categories = parsedAge >= 8 && parsedAge <= 17
                ? ['Dibujo', 'Pintura']
                : parsedAge >= 18
                    ? ['Grabado', 'Cartel', 'Dibujo', 'Afiche']
                    : [];
        }
        setAvailableCategories(categories);
        if (!categories.includes(formData.categoria)) {
            setFormData((prev) => ({ ...prev, categoria: categories[0] || '' }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!acceptsEmails || !acceptsTerms) {
            setMessage('Debes aceptar recibir correos electrónicos y los términos para continuar.');
            return;
        }
        if (!formData.email || !formData.name || !formData.apellido || !formData.age || !formData.ciudad || !formData.categoria || !formData.descripcion || !formData.titulo) {
            setMessage('Todos los campos son obligatorios.');
            return;
        }

        const age = parseInt(formData.age, 10);
        if (isNaN(age) || age < 5 || age > 120) {
            setMessage('Por favor, ingresa una edad válida entre 5 y 120 años.');
            return;
        }
        if (age < 18 && (!formData.representante || !formData.cedula)) {
            setMessage('Por favor, ingresa los datos del representante legal.');
            return;
        }
        if (!selectedFile) {
            setFileError('Por favor, selecciona un archivo PNG o JPEG válido.');
            return;
        }

        try {
            // Subir el archivo a Supabase Storage
            const { data: storageData, error: storageError } = await supabase.storage
                .from('obras')
                .upload(`public/${selectedFile.name}`, selectedFile);

            if (storageError) throw storageError;

            // Insertar el participante en la tabla `users`
            const { data: participantData, error: dbError } = await supabase.from('users').insert([{
                email: formData.email,
                name: formData.name,
                lastname: formData.apellido,
                age: formData.age,
                city: formData.ciudad,
                obra_url: storageData?.path,
                categoria: formData.categoria,
                description: formData.descripcion,
                social_username: formData.socialUsername,
                social_network: formData.socialNetwork,
                title: formData.titulo,
                technique: formData.tecnica,
                dimensions: formData.dimensiones,
            }]).select();  // Usamos `.select()` para obtener el id del participante

            if (dbError) {
                setMessage(dbError.code === '23505' ? 'Ya has registrado una obra.' : 'Error al registrar.');
                return;
            }

            // Si el participante es menor de edad, insertar el representante legal
            if (age < 18) {
                const participantId = participantData[0].id; // Obtener el `id` del participante

                const { error: repError } = await supabase.from('represent').insert([{
                    id: formData.cedula,  // Cedula del representante como `id`
                    name: formData.representante,
                    id_user: participantId, // `id_user` relacionado con el participante
                }]);

                if (repError) {
                    console.error('Error al registrar el representante:', repError.message);
                    setMessage('Error al registrar el representante.');
                    return;
                }
            }

            // Mostrar mensaje de éxito y restablecer el formulario
            setShowSuccessModal(true);
            setMessage('Registro exitoso.');
            setFormData({ email: '', name: '', apellido: '', age: '', ciudad: 'Medellin', categoria: '', descripcion: '', socialUsername: '', socialNetwork: '', titulo: '', tecnica: '', dimensiones: '', representante: '', cedula: '' });
            setSelectedFile(null);
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
                Registra tus datos y sube tu obra en formato JPG, PNG o PDF, el archivo debe ser menor a 25MB.
            </p>
            <div className="bg-transparent p-4 rounded-lg  text-gray-800 w-full md:w-[60%] mb-6">
                <h2 className="text-xl font-bold mb-2">Categorías:</h2>
                <ul className="list-disc space-y-2">
                    <li><strong>8 a 17 años:</strong> Dibujo, Pintura y
                        Grabado no tóxico.</li>
                    <li><strong>Adultos:</strong> de Obra Gráfica (Grabado,
                        Dibujo y Cartel o Afiche).</li>
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
                        maxLength={50}
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
                        maxLength={70}
                    />
                </div>
                <div>
                    <label htmlFor="age" className="block text-lg md:text-xl text-gray-700">Edad</label>
                    <input
                        type="number"
                        id="age"
                        value={formData.age}
                        maxLength={3}
                        min={8}
                        max={100}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2 text-gray-700 placeholder-gray-700"
                        placeholder="Edad"
                        required
                    />
                </div>

                {showRepresentative && (
                    <div className="mt-4 flex flex-col md:flex-row md:space-x-4">
                        <div className="flex flex-col w-full md:w-1/2">
                            <label htmlFor="representante" className="text-lg md:text-xl text-gray-700">Nombre del representante legal</label>
                            <input
                                type="text"
                                id="representante"
                                value={formData.representante}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b-2 border-white p-2 text-gray-700 placeholder-gray-700"
                                placeholder="Nombre Completo del representante legal del menor"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 mt-4 md:mt-0">
                            <label htmlFor="cedulaRepresentante" className="text-lg md:text-xl text-gray-700">
                                Cédula del representante legal
                            </label>
                            <input
                                type="number"  // Cambiado a "text" para mayor control
                                id="cedulaRepresentante"
                                value={formData.cedula}  // Asegura que sea una cadena
                                onChange={handleChange}
                                maxLength={10}
                                minLength={10}
                                pattern="[0-9]*"
                                className="w-full bg-transparent border-b-2 border-white p-2 text-gray-700 placeholder-gray-700"
                                placeholder="Cédula del representante legal del menor"
                                required
                            />
                        </div>
                    </div>
                )}
                <div>
                    <label htmlFor="ciudad" className="block text-lg md:text-xl text-gray-700 ">Ciudad</label>
                    <Select
                        id="ciudad"
                        options={ciudades}
                        className="w-full text-gray-700 placeholder-gray-700"
                        value={ciudades.find((option) => option.label === formData.ciudad) || null} // Encuentra la opción seleccionada en `ciudades`
                        onChange={handleCityChange}
                        placeholder="Selecciona una ciudad..."
                        isClearable
                        styles={{
                            control: (base) => ({
                                ...base,
                                backgroundColor: 'transparent',
                                borderColor: '#E5E7EB',
                                color: '#000',
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: '#000',
                            }),
                        }}
                    />
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
                    <label htmlFor="titulo" className="block text-lg md:text-xl text-gray-700">Titulo de la obra</label>
                    <input
                        type="text"
                        id="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2  text-gray-700 placeholder-gray-700"
                        placeholder="Escribe el nombre de tu obra"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="descripcion" className="block text-lg md:text-xl text-gray-700">Descripción</label>
                    <textarea
                        id="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2 text-gray-700 placeholder-gray-700 resize-none"
                        placeholder="Escribe una breve descripción de tu obra en 250 caracteres"
                        maxLength={250}
                        rows={4} // Define la altura del textarea
                        required
                    ></textarea>
                </div>
                <div className="mt-4 flex flex-col md:flex-row md:space-x-4">
                    <div className="flex flex-col w-full md:w-1/2">
                        <label htmlFor="tecnica" className="text-lg md:text-xl text-gray-700">Técnica utilizada</label>
                        <input
                            type="text"
                            id="tecnica"
                            value={formData.tecnica}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b-2 border-white p-2 text-gray-700 placeholder-gray-700"
                            placeholder="Técnica utilizada"
                            required
                        />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 mt-4 md:mt-0">
                        <label htmlFor="dimensiones" className="text-lg md:text-xl text-gray-700">Dimensiones</label>
                        <input
                            type="text"
                            id="dimensiones"
                            value={formData.dimensiones}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b-2 border-white p-2 text-gray-700 placeholder-gray-700"
                            placeholder="50 x 25 cm"
                            required
                        />
                    </div>
                </div>

                {/* Campo de Red Social y Nombre de Usuario */}
                <div className="flex items-center space-x-4 mt-4">
                    <button
                        type="button"
                        onClick={() => handleSocialNetworkSelect('Instagram')}
                        className={`text-3xl ${formData.socialNetwork === 'Instagram' ? 'text-black' : 'text-gray-400'}`}

                        aria-label="Seleccionar Instagram"
                    >
                        <FaInstagram />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSocialNetworkSelect('TikTok')}
                        className={`text-3xl ${formData.socialNetwork === 'TikTok' ? 'text-black' : 'text-gray-400'}`}
                        aria-label="Seleccionar TikTok"
                    >
                        <FaTiktok />
                    </button>
                </div>

                <div className="mt-4">
                    <label htmlFor="socialUsername" className="text-lg md:text-xl text-gray-700">
                        Usuario en {formData.socialNetwork || 'red social'}:
                    </label>

                    <input
                        type="text"
                        id="socialUsername"
                        value={formData.socialUsername}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2 text-gray-700 placeholder-gray-700"
                        placeholder="Ej: @miusuario"
                    />
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
                        Conozco y acepto la politica de <Link href="https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/sign/web%20files/politica_datos.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWIgZmlsZXMvcG9saXRpY2FfZGF0b3MucGRmIiwiaWF0IjoxNzMwNzczNTI5LCJleHAiOjIwNDYxMzM1Mjl9.NQcvjA5Vhim8letrU4rq-ylIjyWLfgEdKMpJ31VV3B4" target="_blank" className="text-blue-500 underline">  tratamiento de datos. </Link>
                    </label>
                </div>

                {/* Checkbox para términos y condiciones */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="acceptsTerms"
                        checked={acceptsTerms}
                        onChange={() => setAcceptsTerms(!acceptsTerms)}
                        className="mr-2"
                    />
                    <label htmlFor="acceptsTerms" className="text-sm md:text-base text-gray-700">
                        Acepto los <Link href="https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/public/web%20files/terminos.pdf?t=2024-11-05T02%3A32%3A15.243Z" target="_blank" className="text-blue-500 underline">términos y condiciones</Link> del evento.
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
