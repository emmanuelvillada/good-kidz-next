import Image from 'next/image';
import Categorias from '@/public/categorias.png';
import { useState, ChangeEvent, FormEvent } from 'react';

export default function Registro() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        apellido: '',
        contraseña: '', // Añadir campo de contraseña
        age: '',
        ciudad: '',
    });

    const [message, setMessage] = useState('');

    // Tipamos 'e' como un evento de cambio de input
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    // Tipamos 'e' como un evento de envío de formulario
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Registro exitoso');
                setFormData({ email: '', name: '', apellido: '', contraseña: '', age: '', ciudad: '' });
            } else {
                setMessage(data.error || 'Error en el registro');
            }
        } catch (error) {
            console.error(error);
            setMessage('Error al conectar con el servidor');
        }
    };

    return (
        <section className="p-6 md:p-12 bg-green-500 text-gray-700 flex flex-col items-center min-h-screen relative">
            <h1 className="text-5xl font-bold mb-8">¡Regístrate!</h1>
            <form className="w-full md:w-[60%] space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-xl text-gray-700">E-mail</label>
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
                    <label htmlFor="name" className="block text-xl text-gray-700">Nombre</label>
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
                    <label htmlFor="apellido" className="block text-xl text-gray-700">Apellido</label>
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
                    <label htmlFor="contraseña" className="block text-xl text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        id="contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-white p-2 focus:outline-none text-white placeholder-white"
                        placeholder="Contraseña"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="age" className="block text-xl text-gray-700">Edad</label>
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
                    <label htmlFor="ciudad" className="block text-xl text-gray-700">Ciudad</label>
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
                    <label htmlFor="newsletter" className="text-sm text-gray-700">
                        Acepto recibir correos electrónicos de la fundación Good Kidz.
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-transparent border-2 border-white text-white py-3 mt-4 text-xl font-bold hover:bg-white hover:text-green-500 transition-all"
                >
                    ¡Regístrate!
                </button>
            </form>
            <div>{message && <p>{message}</p>}</div>

            {/* Imagen de categorías en la parte inferior izquierda */}
            <div className="absolute bottom-40 left-4">
                <Image
                    src={Categorias}
                    alt="Prepara tus obras"
                    width={242}
                    height={242}
                />
            </div>
        </section>
    );
}
