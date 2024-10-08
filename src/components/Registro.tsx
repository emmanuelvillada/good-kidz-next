import Image from 'next/image';
import Categorias from '@/public/categorias_blanca.png';
import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/lib/supabase'; // Asegúrate de tener configurado Supabase Client

export default function Registro() {
    const [formData, setFormData] = useState({
        email: '',
        password: '', // Contraseña para la autenticación de Supabase
        name: '',
        apellido: '',
        age: '',
        ciudad: '',
    });

    const [message, setMessage] = useState('');

    // Manejar los cambios en los campos del formulario
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Registrar al usuario en Supabase (con email y password)
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (error) throw error;

            // Si el registro es exitoso, guardamos los datos adicionales en la tabla "users"
            const user = data.user;
            if (user) {
                const { error: dbError } = await supabase
                    .from('users')
                    .insert([
                        {
                            id: user.id, // El ID del usuario que devuelve Supabase
                            name: formData.name,
                            apellido: formData.apellido,
                            age: formData.age,
                            ciudad: formData.ciudad,
                        },
                    ]);

                if (dbError) throw dbError;

                setMessage('Registro exitoso. Por favor, revisa tu correo para verificar la cuenta.');
                // Limpiar el formulario
                setFormData({ email: '', password: '', name: '', apellido: '', age: '', ciudad: '' });
            }
        } catch (error) {
            console.error(error);
            setMessage('Error al registrar el usuario.');
        }
    };

    return (
        <section className="p-6 md:p-12 bg-green-500 text-gray-700 flex flex-col items-center min-h-screen relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">¡Regístrate!</h1>
            <form className="w-full md:w-[60%] space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-lg md:text-xl text-gray-700">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2 focus:outline-none text-white placeholder-white"
                        placeholder="Contraseña"
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
                        className="w-full bg-transparent border-b-2 border-white p-2 focus:outline-none text-white placeholder-white"
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
                        className="w-full bg-transparent border-b-2 border-white p-2 focus:outline-none text-white placeholder-white"
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
                        className="w-full bg-transparent border-b-2 border-white p-2 focus:outline-none text-white placeholder-white"
                        placeholder="Edad"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ciudad" className="block text-lg md:text-xl text-gray-700">Ciudad</label>
                    <input
                        type="text"
                        id="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2 focus:outline-none text-white placeholder-white"
                        placeholder="Ciudad"
                        required
                    />
                </div>

                <div className="flex items-center">
                    <input type="checkbox" id="newsletter" className="mr-2" />
                    <label htmlFor="newsletter" className="text-sm md:text-base text-gray-700">
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

            {/* Imagen de categorías en la parte inferior izquierda (visible solo en pantallas grandes) */}
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
