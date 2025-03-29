'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


interface ProtectedPageProps {
    children: React.ReactNode;
}

export default function ProtectedPage({ children }: ProtectedPageProps) {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const correctPassword = process.env.NEXT_PUBLIC_MICROSTORY_PASSWORD;


    const handleLogin = () => {
        if (password === correctPassword) {
            setIsAuthenticated(true);
        } else {
            alert("Contraseña incorrecta");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-start m-12 min-h-screen py-2 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Página Protegida</h1>
                <Input
                    type="password"
                    placeholder="Contraseña"
                    className="mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin}>Ingresar</Button>
            </div>
        );
    }

    return <>{children}</>;
}
