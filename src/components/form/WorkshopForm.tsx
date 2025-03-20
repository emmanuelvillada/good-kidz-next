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
} from "@/components/ui/form";
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
            authorization: false,
        },
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<Workshop> = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const { error } = await supabase.from("workshop").insert(data);

            if (error) throw error;

            setSuccess(true);
            form.reset();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
                console.error("Error submitting form:", err.message);
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
            className="w-full max-w-md p-4 mx-auto bg-white rounded-md shadow-md"
        >
            <Card>
                <CardHeader>
                    <CardTitle>Formulario de Workshop</CardTitle>
                    <CardDescription>Con este formulario te inscribes para asistir al taller aves, que se llevará a cabo el día xxxxxxxx.</CardDescription>
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
                                                <FormLabel>Nombre <span className="text-red-500">*</span></FormLabel>
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
                                                        <Input type="number" min="1" max="120" placeholder="Edad" {...field} />
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
                                                <FormLabel>Celular <span className="text-red-500">*</span></FormLabel>
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
                                                <FormLabel>Correo <span className="text-red-500">*</span></FormLabel>
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
                                                    Acepto los términos y condiciones <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <p className="text-xs text-gray-500">
                                                    Al marcar esta casilla, confirmo que he leído y acepto los
                                                    <button type="button"
                                                        className="text-blue-600 hover:underline ml-1"
                                                        onClick={() => alert("Aquí se mostrarían los términos y condiciones")}>
                                                        términos y condiciones
                                                    </button>.
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
        </motion.div>
    );
}