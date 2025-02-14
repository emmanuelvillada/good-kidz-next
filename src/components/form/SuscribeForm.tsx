"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const supabaseClient = supabase;

export default function SubscribeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [message, setMessage] = useState("");

    if (!isOpen) return null; // No renderiza el modal si no está abierto

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        if (!formData.name || !formData.email) {
            setMessage("❌ Error: Por favor, completa todos los campos.");
            return;
        }

        const { error } = await supabaseClient.from("subscribers").insert([formData]);

        if (error) {
            setMessage("❌ Error: Este correo ya está registrado.");
        } else {
            setMessage("✅ ¡Gracias por suscribirte!");
            setFormData({ name: "", email: "" }); // Reset form
            setTimeout(onClose, 2000); // Cierra el modal tras 2 segundos
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">
                    ✖
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">Únete a Good Kidz</h2>
                <p className="text-gray-600 text-center mb-4">Recibe información exclusiva sobre eventos.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 rounded text-black"
                        pattern="[A-Za-z ]{3,}"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Tu correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 rounded text-black"
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        required
                    />
                    <Button type="submit" className="bg-verde-goodkidz text-white p-2 rounded">
                        Suscribirme
                    </Button>
                    {message && <p className="text-center mt-2">{message}</p>}
                </form>
            </div>
        </div>
    );
}
