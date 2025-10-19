'use client';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { PostgrestError } from '@supabase/supabase-js';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from '@hookform/resolvers/zod';
import MicroStorySchema, { MicroStory } from "@/components/form/schemas/MicroStory";
//ui
import { Upload, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
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
import Image from "next/image";
import { compressImage } from "@/lib/imageCompresion";
import { toast } from "react-toastify";

// Form status interface
interface FormStatus {
    type: 'success' | 'error' | null;
    message: string | null;
}

export default function MicroStoryForm() {
    // State management
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<FormStatus>({ type: null, message: null });
    const [previewUrls, setPreviewUrls] = useState<{
        file1?: string | null,

    }>({});

    // React Hook Form setup with Zod validation
    const form = useForm<MicroStory>({
        resolver: zodResolver(MicroStorySchema),
        defaultValues: {
            title: '',
            name: '',
            email: '',
            age: '',
            phone: '',
            city: '',
            file1: null,
            terms: false,
            policy: false
        }
    });

    // Image preview handling
    const handleFilePreview = (file: File, fileType: 'file1') => {
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrls(prev => ({
                ...prev,
                [fileType]: reader.result as string
            }));
        };
        reader.readAsDataURL(file);
    };

    // Form submission handler
    const onSubmit: SubmitHandler<MicroStory> = async (data) => {
        console.log("Submitting data:", data);
        setIsLoading(true);
        setStatus({ type: null, message: null });

        try {
            // Verify files are present
            if (!data.file1 || !data.file1[0]) {
                throw new Error("Por favor, sube el archivo requerido.");
            }

            //clean the name and the title for files names
            const sanitizedName = data.name.replace(/[^a-zA-Z0-9]/g, '');
            const sanitizedTitle = data.title.replace(/[^a-zA-Z0-9]/g, '');

            // Upload image
            const file1 = data.file1[0];
            const fileExt = file1.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2) + '-' + sanitizedName + '-' + sanitizedTitle + '-imagen'}.${fileExt}`;

            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('arte y vida')
                .upload(fileName, file1, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                toast.error('Error al subir la imagen: ' + uploadError.message);
                throw uploadError;
            }

            // Save story data
            const { error: storyError } = await supabase
                .from("arte y vida")
                .insert([{
                    title: data.title,
                    file_image: uploadData.fullPath,
                    name: data.name,
                    email: data.email,
                    age: data.age,
                    phone: data.phone,
                    city: data.city,
                }]);

            if (storyError) {
                toast.error('Error al guardar el microcuento: ' + storyError.message);
                //Delete both files if DB insert fails
                await supabase.storage.from('arte y vida').remove([uploadData.fullPath]);
                throw storyError;
            }

            toast.success('¡Obra ' + data.title + ' guardada con éxito!');
            // Success handling
            setStatus({
                type: 'success',
                message: '¡Obra ' + data.title + ' guardada con éxito!'
            });

            // Reset form
            form.reset();
            setPreviewUrls({});

        } catch (error: unknown) {
            toast.error('Error al guardar el microcuento. Inténtalo de nuevo más tarde.');

            // Verificamos si el error es de tipo PostgrestError
            if (typeof error === 'object' && error !== null && 'code' in error) {
                const supabaseError = error as PostgrestError;

                if (supabaseError.code === '23505') {  // Código de error de clave duplicada en PostgreSQL
                    setStatus({
                        type: 'error',
                        message: 'Ya guardaste . Solo puedes guardar uno.'
                    });
                } else {
                    setStatus({
                        type: 'error',
                        message: supabaseError.message || 'Ocurrió un error inesperado.'
                    });
                }
            } else {
                setStatus({
                    type: 'error',
                    message: 'Ocurrió un error inesperado. Inténtalo de nuevo más tarde.'
                });
            }
        }
        finally {
            setIsLoading(false);
        }
    };





    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto p-6"
        >
            <Card>
                <CardHeader>
                    <CardTitle className="text-4xl text-verde-goodkidz py-4">Formulario Segundo Festival Arte y Vida</CardTitle>
                    <CardDescription className="text-gray-600 ">Participa <br />
                        <span className="text-sm text-gray-500">Llena el siguiente formulario para participar en el 2do Festival Arte y Vida</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Título</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Escribe un título para tu historia"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Escribe tu nombre"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Edad</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Escribe tu edad"
                                                {...field}
                                            />
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
                                        <FormLabel>Correo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Escribe tu correo"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                Ciudad
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Escribe tu ciudad"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                Teléfono o celular
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Escribe tu teléfono"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Controller
                                control={form.control}
                                name="file1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Sube tu obra de arte  con las siguientes características:
                                            <ul className="list-disc list-inside">
                                                <li>Formato: JPG</li>
                                                <li>Tamaño: 5MB</li>
                                                <li>Dimensiones: 1920x1080 píxeles</li>
                                                <li>Resolución: 300 ppp</li>
                                            </ul>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/jpeg, image/jpg"
                                                onChange={async (e) => {
                                                    const files = e.target.files;
                                                    if (files && files.length > 0) {
                                                        const originalFile = files[0];

                                                        try {
                                                            // Comprimir imagen antes de asignarla
                                                            const compressedFile = await compressImage(originalFile);

                                                            // Validar tamaño después de la compresión
                                                            if (compressedFile.size > 5 * 1024 * 1024) {
                                                                form.setError('file1', {
                                                                    type: 'manual',
                                                                    message: 'La imagen no puede exceder 5MB',
                                                                });
                                                                return;
                                                            }

                                                            // Limpiar error si el archivo es válido
                                                            form.clearErrors('file1');

                                                            // Asignar archivo comprimido al formulario
                                                            field.onChange([compressedFile]); // Se envía como un array

                                                            // Generar vista previa de la imagen comprimida
                                                            handleFilePreview(compressedFile, 'file1');
                                                        } catch (error) {
                                                            console.error("Error al procesar la imagen:", error);
                                                            form.setError('file1', {
                                                                type: 'manual',
                                                                message: 'Error al procesar la imagen, intenta con otra.',
                                                            });
                                                        }
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Solo se permiten archivos .jpg y de menos de 5MB
                                        </FormDescription>
                                        <FormMessage className="text-red-500" >
                                            {form.formState.errors.file1 && (
                                                <p className="text-red-500 text-sm mt-2">
                                                    {typeof form.formState.errors.file1?.message === 'string' ? form.formState.errors.file1.message : ''}
                                                </p>
                                            )}
                                        </FormMessage >

                                        {previewUrls.file1 && (
                                            <div className="mt-2 relative aspect-video rounded-lg overflow-hidden">
                                                <Image
                                                    src={previewUrls.file1}
                                                    alt="Vista previa"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />



                            <FormField
                                control={form.control}
                                name="terms"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <input
                                                aria-label="Términos y condiciones"
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={field.onChange}
                                                id="terms"
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel htmlFor="terms">
                                                Términos y condiciones
                                            </FormLabel>
                                            <FormDescription>
                                                He leído y acepto los
                                                <a href="..." target="_blank" rel="noopener noreferrer" className="text-verde-goodkidz underline"> Términos y Condiciones</a> del festival.
                                            </FormDescription>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="policy"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <input
                                                aria-label="Política de tratamiento de datos personales"
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={field.onChange}
                                                id="policy"
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel htmlFor="policy">
                                                Tratamiento de datos personales
                                            </FormLabel>
                                            <FormDescription>
                                                Acepto la <a href="..." target="_blank" rel="noopener noreferrer" className="text-verde-goodkidz underline">política de tratamiento de datos personales.</a>
                                            </FormDescription>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <AnimatePresence>
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <Alert variant={status.type === 'success' ? 'default' : 'destructive'}>
                                            <AlertDescription>{status.message}</AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Button
                                type="submit"
                                className="w-full bg-verde-goodkidz hover:bg-green-400 focus:ring-4 focus:ring-green-300 text-white font-bold py-2 px-4 rounded-lg"
                                disabled={isLoading}
                                onClick={() => {
                                    console.log("=== BUTTON CLICKED ===");
                                    console.log("Button type:", "submit");
                                    console.log("Form is valid:", form.formState.isValid);
                                    console.log("Form errors:", form.formState.errors);
                                    console.log("Form values:", form.getValues());
                                }}
                            >
                                Enviar
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </motion.div >
    );
}