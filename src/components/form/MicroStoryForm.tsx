'use client';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from '@hookform/resolvers/zod';
import MicroStorySchema, { MicroStory } from "@/components/form/schemas/MicroStory";
//ui
import { Upload, Phone, MapPin, User } from 'lucide-react';
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
        file2?: string | null,

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
            address: '',
            city: '',
            attendant_name: '',
            file1: null,
            file2: null,
            terms: false
        }
    });

    // Image preview handling
    const handleFilePreview = (file: File, fileType: 'file1' | 'file2' | 'file3') => {
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
        setIsLoading(true);
        setStatus({ type: null, message: null });

        try {
            // Verify files are present
            if (!data.file1 || !data.file1[0] || !data.file2 || !data.file2[0]) {
                throw new Error("Por favor, sube ambos archivos");
            }

            // Upload image
            const file1 = data.file1[0];
            const fileExt = file1.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2) + data.name + data.title + 'imagen'}.${fileExt}`;
            const file2 = data.file2[0];
            const fileExt2 = file2.name.split('.').pop();
            const fileName2 = `${Math.random().toString(36).substring(2) + data.name + data.title + 'pdf'}.${fileExt2}`;

            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('micro-stories')
                .upload(fileName, file1);

            const { error: uploadError2, data: uploadData2 } = await supabase.storage
                .from('micro-stories')
                .upload(fileName2, file2);


            if (uploadError || uploadError2) {
                console.error('Upload Error:', uploadError, uploadError2);
                throw new Error("Error al subir los archivos");
            }

            // Save story data
            const { error: storyError } = await supabase
                .from("micro_stories")
                .insert([{
                    title: data.title,
                    file_image: uploadData.path,
                    file_pdf: uploadData2.path,
                    name: data.name,
                    email: data.email,
                    age: data.age,
                    phone: data.phone,
                    address: data.address,
                    city: data.city,
                    attendant_name: data.attendant_name
                }]);

            if (storyError) {
                console.error('Story Error:', storyError);
                throw storyError;
            }

            // Success handling
            setStatus({
                type: 'success',
                message: 'Microcuento ' + data.title + ' guardado con éxito!'
            });

            // Reset form
            form.reset();
            setPreviewUrls({});

        } catch (error) {
            // Error handling
            console.error('Submission Error:', error);
            setStatus({
                type: 'error',
                message: error instanceof Error ? error.message : 'Error al guardar los datos'
            });
        } finally {
            setIsLoading(false);
        }
    };




    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto p-6"
        >
            <Card>
                <CardHeader>
                    <CardTitle className="text-4xl text-gray-800 py-4">Formulario Microcuento</CardTitle>
                    <CardDescription className="text-gray-600 ">Rellena la informacion del menor de edad, su representante legal y los archivos requeridos,
                        para participar del Festival de Microcuento Ilustrado. <br />
                        <b>Recuerda este formulario debe ser diligenciado por el representante legal del menor.</b></CardDescription>
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
                                        <FormLabel>Nombre del menor</FormLabel>
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

                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Edad del menor</FormLabel>
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


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                Dirección
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Escribe tu dirección"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="attendant_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                Nombre del representante
                                            </FormLabel>
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
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                Telefono del representante
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Escribe tu telefono"
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
                                            Imagen del Microcuento
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                onChange={(e) => {
                                                    const files = e.target.files;
                                                    if (files && files.length > 0) {
                                                        // Directly set the files
                                                        field.onChange(files);
                                                        handleFilePreview(files[0], 'file1');
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Solo se permiten archivos .jpg, .png y .webp
                                        </FormDescription>
                                        <FormMessage />

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

                            <Controller
                                control={form.control}
                                name="file2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Microcuento
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(e) => {
                                                    const files = e.target.files;
                                                    if (files && files.length > 0) {
                                                        // Directly set the files
                                                        field.onChange(files);
                                                        handleFilePreview(files[0], 'file2');
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Solo se permiten archivos .pdf
                                        </FormDescription>
                                        <FormMessage></FormMessage>

                                        {previewUrls.file2 && (
                                            <div className="mt-2 relative aspect-video rounded-lg overflow-hidden">
                                                <Image
                                                    src={previewUrls.file2}
                                                    alt="Vista previa"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <input
                                        type="checkbox"
                                        required
                                        id="terms"
                                        {...form.register('terms', { required: true })}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel htmlFor="terms">
                                        Términos y condiciones
                                    </FormLabel>
                                    <FormDescription>
                                        En mi condición de representante legal del niño o niña identificada previamente, manifiesto que mediante
                                        el diligenciamiento y envío del presente formulario autorizo expresamente su participación en el &quot;1er
                                        Primer Festival de Microcuento Infantil Ilustrado mi planeta Good Kidz 2025: PLANETA VERDE&quot;.
                                    </FormDescription>
                                </div>
                            </FormItem>

                            <FormItem className="mt-6">
                                <div className="text-center">

                                    <FormDescription className="mt-2">
                                        Al hacer clic en &quot;Guardar Historia&quot;, aceptas los <a href="/terminos-y-condiciones" className="text-verde-goodkidz underline">Términos y Condiciones</a> del Festival de Microcuento Ilustrado.
                                    </FormDescription>
                                </div>
                                <FormMessage />
                            </FormItem>

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
                                className="w-full bg-verde-goodkidz hover:bg-verde-goodkidz/90"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                        Guardando...
                                    </motion.div>
                                ) : (
                                    'Guardar Historia'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </motion.div>
    );
}