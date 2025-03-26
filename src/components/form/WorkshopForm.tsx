'use client';
import { Workshop } from "./schemas/Workshop";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { WorkshopSchema } from "./schemas/Workshop";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkshopForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const form = useForm<Workshop>({
        resolver: zodResolver(WorkshopSchema),
        defaultValues: {
            name: "",
            age: "",
            document: "",
            responsable_name: "",
            responsable_document: "",
            cellphone: "",
            email: "",
            has_disability: false,
            disability_details: "",
            authorization: false,
        },
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<Workshop> = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {

            // Extrae todas las propiedades excepto 'authorization'
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { authorization, has_disability, ...dataToSubmit } = data;

            // Envío solo los datos relevantes
            const { error } = await supabase.from("workshop").insert(dataToSubmit);
            if (error) throw error;

            setSuccess(true);
            form.reset();
        } catch (err: unknown) {
            //verificar si el error es de tipo postgres
            if ((err as { code: string }).code === "23505") {
                setError("Ya has registrado tu participación en este taller");
            }
            else {
                setError("Error al enviar el formulario");
                console.error("Error submitting form:", err);
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl p-4 mx-auto bg-white rounded-md shadow-md"
        >
            <Card className="space-y-4 ">
                <CardHeader>
                    <CardTitle className="text-4xl text-gray-800 py-4">Taller Infantil de Expresión Creativa - Aves Poderosas</CardTitle>
                    <CardDescription>En el marco del <b> 1er Festival de Microcuento Infantil Ilustrado -Guardianes del Planeta Verde- </b>, te invitamos a participar en un taller lleno de imaginación y aprendizaje, donde exploraremos el fascinante mundo de las aves.
                        A través de juegos, cartas y un recorrido por el Parque de la Conservación, refugio para los animales silvestres nativos rescatados del tráfico ilegal de fauna, descubriremos su importancia dentro de los ecosistemas, los desafíos que enfrentan
                        y cómo podemos protegerlas. Conocerás a Chimuelo, un divertido loro que nos llevará a vivir una experiencia única en un entorno natural.

                        <br />
                        <br />
                        <b>Fecha: </b> Sábado 5 de abril
                        <br />
                        <b>Horario: </b> 9:00 a.m. a 12:00 m
                        <br />
                        <b>Lugar: </b> Parque de la Conservación – Calle 20 #28-40, Medellín
                        <br />
                        <br />
                        <b>Información importante:</b>
                        <br />
                        <ul className="list-disc list-inside">
                            <li> ¡El taller es completamente gratuito!</li>
                            <li> Ingreso gratuito para acompañantes: Lxs niñxs participantes pueden ingresar al parque junto con sus acompañantes, quienes podrán disfrutar de las instalaciones mientras lxs peques están en el taller.</li>
                            <li> Refrigerio: Habrá un refrigerio especial para lxs niñxs participantes del taller. Te invitamos a llevar un termo para hidratación y así evitar generar residuos y el uso de vasos o recipientes de un solo uso.</li>
                            <li> Parqueadero: El lugar cuenta con parqueadero disponible. El costo es de $14,000 pesos por día para carro y $7,000 pesos por día para moto.</li>
                            <li> Cupo limitado: Solo para lxs primerxs 20 inscritxs.</li>
                        </ul>

                        <br />
                        <b>¡Llena el formulario, prográmate para asistir y alcemos el vuelo juntxs!</b>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-4"
                            >
                                <Alert className="bg-green-50 border-green-200 text-green-800">
                                    <AlertDescription>
                                        ¡Formulario enviado exitosamente! Gracias por registrarte.
                                    </AlertDescription>
                                </Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-6">
                                <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                                    <h3 className="text-sm font-medium text-gray-700">Información Personal</h3>

                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre Completo <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nombre completo" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="age"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Edad <span className="text-red-500">*</span></FormLabel>
                                                    <FormControl>
                                                        <Input type="number" min="1" max="100" placeholder="Edad" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="document"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Documento <span className="text-red-500">*</span></FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Número de documento" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="has_disability"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        ¿La niña o niño tiene alguna condición médica o discapacidad que requiera atención especial?
                                                    </FormLabel>
                                                    <FormDescription className="text-xs text-gray-500">
                                                        Marque esta casilla si el/la niñ@ tiene alguna discapacidad o necesidad especial que debamos conocer.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {form.watch("has_disability") && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <FormField
                                                control={form.control}
                                                name="disability_details"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Detalles de la discapacidad <span className="text-red-500">*</span></FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Por favor, describa la discapacidad o necesidad especial para poder prepararnos adecuadamente"
                                                                className="min-h-[100px]"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription className="text-xs text-gray-500">
                                                            Esta información nos ayudará a preparar el taller para atender correctamente las necesidades del niño.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </motion.div>
                                    )}
                                </div>


                                <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                                    <h3 className="text-sm font-medium text-gray-700">Información del Responsable</h3>

                                    <FormField
                                        control={form.control}
                                        name="responsable_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre del Responsable <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nombre completo del responsable" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="responsable_document"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Documento del Responsable <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Número de documento del responsable" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                                    <h3 className="text-sm font-medium text-gray-700">Información de Contacto</h3>

                                    <FormField
                                        control={form.control}
                                        name="cellphone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Celular del Responsable <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Número de celular" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Correo del Responsable <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="ejemplo@correo.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="authorization"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border border-gray-200">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Acepto la política de datos <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <p className="text-xs text-gray-500">
                                                    Al marcar esta casilla, confirmo que he leído y acepto la
                                                    <a type="button"
                                                        className="text-verde-goodkidz hover:underline ml-1"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://asisdninqgnkereutwxt.supabase.co/storage/v1/object/public/web%20files//politica_datos.pdf"
                                                    >
                                                        Política de Tratamiento de Datos
                                                    </a>
                                                </p>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={loading || form.formState.isSubmitting}
                                    className="bg-verde-goodkidz text-white hover:bg-verde-goodkidz/80 w-full"
                                >
                                    {loading ? "Enviando..." : "Enviar Formulario"}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mt-4"
                        >
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div >
    );
}