import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";


export default function EventFinished() {



    return (

        <Card>
            <CardHeader>
                <CardTitle className="text-4xl text-gray-800 py-4 text-center font-bold">
                    Festival Finalizado
                </CardTitle>
                <CardDescription className="text-gray-600 space-y-4">
                    <p className="text-lg font-medium text-gray-700 text-center">
                        El 1er Festival de Microcuento Infantil Ilustrado -Guardianes del Planeta Verde- ha finalizado.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg space-y-4 text-center">
                        <p>¡Gracias a todos los participantes por sus increíbles historias!</p>
                        <p>Pronto anunciaremos los ganadores a través de nuestras redes sociales.</p>
                        <div className="flex flex-col items-center gap-4 pt-4">
                            <p className="font-medium">Síguenos para conocer los resultados:</p>
                            <div className="flex gap-4">
                                <Link
                                    href="https://www.instagram.com/fundaciongoodkidz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-verde-goodkidz hover:text-verde-goodkidz/80 transition-colors"
                                >
                                    Instagram
                                </Link>
                                <Link
                                    href="https://www.facebook.com/fundaciongoodkidz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-verde-goodkidz hover:text-verde-goodkidz/80 transition-colors"
                                >
                                    Facebook
                                </Link>
                            </div>
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>

    );
}



