'use client';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from '@hookform/resolvers/zod';
import MicroStorySchema, { MicroStory } from "@/components/form/schemas/MicroStory";
//ui
import { Upload, Phone, MapPin, Globe, FileText, Users } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import imagen_escritorio from '@/public/formulario-escritorio.png';
import imagen_movil from '@/public/formulario-movil.png';
import { PostgrestError } from "@supabase/supabase-js";

// Form status interface
interface FormStatus {
    type: 'success' | 'error' | null;
    message: string | null;
}

// Agrega esta interfaz al inicio del archivo, después de FormStatus
interface InsertData {
    title: string;
    file_image: string;
    file_pdf: string;
    artist_cv?: string;
    category: string;
    name: string;
    email: string;
    age: string;
    phone: string;
    country: string;
    city: string;
    guardian_name?: string;
    guardian_document?: string;
}

export default function MicroStoryForm() {
    // State management
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<FormStatus>({ type: null, message: null });
    const [previewUrls, setPreviewUrls] = useState<{
        file1?: string | null,
    }>({});
    const [showGuardianFields, setShowGuardianFields] = useState(false);
    const [showArtistCV, setShowArtistCV] = useState(false);


    // React Hook Form setup with Zod validation
    const form = useForm<MicroStory>({
        resolver: zodResolver(MicroStorySchema),
        defaultValues: {
            title: '',
            name: '',
            email: '',
            age: '',
            phone: '',
            country: '',
            city: '',
            category: '',
            isMinor: false,
            guardianName: '',
            guardianDocument: '',
            file1: null,
            file2: null,
            file3: null,
            terms: true,
            policy: true
        }
    });

    // Watch age field to show/hide guardian fields
    const ageValue = form.watch('age');
    const categoryValue = form.watch('category');

    // Show artist CV upload if category is 'artistas'

    useEffect(() => {
        const age = parseInt(ageValue);
        if (!isNaN(age) && age < 18) {
            setShowGuardianFields(true);
            form.setValue('isMinor', true);
        } else {
            setShowGuardianFields(false);
            form.setValue('isMinor', false);
            form.setValue('guardianName', '');
            form.setValue('guardianDocument', '');
        }
    }, [ageValue, form]);

    useEffect(() => {
        if (categoryValue === 'artistas') {
            setShowArtistCV(true);
        } else {
            setShowArtistCV(false);
            form.setValue('file3', null);
        }
    }, [categoryValue, form]);

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
            console.log("Uploading files...");
            // Verify files are present
            if (!data.file1 || !data.file1[0]) {
                throw new Error("Por favor, sube la imagen requerida.");
            }
            if (!data.file2 || !data.file2[0]) {
                throw new Error("Por favor, sube el PDF con la descripción.");
            }



            //clean the name and the title for files names
            const sanitizedName = data.name.replace(/[^a-zA-Z0-9]/g, '');
            const sanitizedTitle = data.title.replace(/[^a-zA-Z0-9]/g, '');

            // Upload image
            const file1 = data.file1[0];
            const fileExt1 = file1.name.split('.').pop();
            const fileName1 = `${Math.random().toString(36).substring(2)}-${sanitizedName}-${sanitizedTitle}-imagen.${fileExt1}`;

            console.log("Uploading image:", fileName1);
            const { error: uploadError1, data: uploadData1 } = await supabase.storage
                .from('arte_y_vida')
                .upload(fileName1, file1, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError1) {
                toast.error('Error al subir la imagen: ' + uploadError1.message);
                throw uploadError1;
            }

            // Upload PDF
            const file2 = data.file2[0];
            const fileName2 = `${Math.random().toString(36).substring(2)}-${sanitizedName}-${sanitizedTitle}-descripcion.pdf`;

            const { error: uploadError2, data: uploadData2 } = await supabase.storage
                .from('arte_y_vida')
                .upload(fileName2, file2, {
                    cacheControl: '3600',
                    upsert: false
                });

            console.log("Uploading PDF:", fileName2);
            if (uploadError2) {
                toast.error('Error al subir el PDF: ' + uploadError2.message);
                // Delete the image if PDF upload fails
                await supabase.storage.from('arte_y_vida').remove([uploadData1.fullPath]);
                throw uploadError2;
            }

            // Upload Artist CV if category is "artistas"
            let uploadData3 = null;
            if (data.category === 'artistas' && data.file3 && data.file3[0]) {
                const file3 = data.file3[0];
                const fileName3 = `${Math.random().toString(36).substring(2)}-${sanitizedName}-${sanitizedTitle}-cv.pdf`;

                const { error: uploadError3, data: uploadDataCV } = await supabase.storage
                    .from('arte_y_vida')
                    .upload(fileName3, file3, {
                        cacheControl: '3600',
                        upsert: false
                    });
                console.log("Uploading CV:", fileName3);

                if (uploadError3) {
                    toast.error('Error al subir el CV: ' + uploadError3.message);
                    // Delete previous uploads if CV upload fails
                    await supabase.storage.from('arte_y_vida').remove([
                        uploadData1.fullPath,
                        uploadData2.fullPath
                    ]);
                    throw uploadError3;
                }
                uploadData3 = uploadDataCV;
            }


            // Save story data
            const insertData: InsertData = {
                title: data.title,
                file_image: uploadData1.path,
                file_pdf: uploadData2.path,
                name: data.name,
                email: data.email,
                age: data.age,
                phone: data.phone,
                country: data.country,
                city: data.city,
                category: data.category,
                artist_cv: uploadData3?.path || 'null',
            };
            console.log("Insert data:", insertData);

            // Add guardian info if minor
            if (data.isMinor && data.guardianName && data.guardianDocument) {
                insertData.guardian_name = data.guardianName;
                insertData.guardian_document = data.guardianDocument;
            }

            console.log("Insert data:", insertData);
            const { error: storyError } = await supabase
                .from("arte_y_vida")
                .insert([insertData]);

            if (storyError) {
                toast.error('Error al guardar la obra: ' + storyError.message);
                //Delete both files if DB insert fails
                await supabase.storage.from('arte_y_vida').remove([
                    uploadData1.fullPath,
                    uploadData2.fullPath
                ]);
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
            toast.error('Error al guardar la obra. Inténtalo de nuevo más tarde.');

            if (error instanceof PostgrestError) {
                console.error("PostgrestError:", error.message + error.code + error.details);
            }

            setStatus({
                type: 'error',
                message: 'Ocurrió un error inesperado. Inténtalo de nuevo más tarde.' + (error instanceof Error ? `Detalles: ${error.message}` : '')
            });

        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto p-6"
        >
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-verde-goodkidz py-4">2do Encuentro arte y vida, Fundación GOOD KIDZ Colombia 2025: PLANETA VERDE</CardTitle>
                    <Image
                        src={imagen_escritorio}
                        alt="Encuentro arte_y_vida"
                        width={800}
                        height={200}
                        className="mt-4 rounded-lg shadow-md sm:hidden"
                    />
                    <Image
                        src={imagen_movil}
                        alt="Encuentro arte_y_vida"
                        width={800}
                        height={200}
                        className="mt-4 rounded-lg shadow-md hidden sm:block"
                    />
                    <CardDescription className="text-gray-600 "> <br />
                        <span className="text-black text-sm">La Fundación GOOD KIDZ, organización sin ánimo de lucro que impulsa el desarrollo humano a través de proyectos artísticos, educativos y recreativos, promoviendo inclusión, conciencia ambiental, autoconocimiento y bienestar, invita al
                            &quot;2do Encuentro arte y vida, Fundación GOOD KIDZ Colombia 2025: PLANETA VERDE.&quot;</span>
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(
                                onSubmit,

                            )}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre completo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Escribe tu nombre completo"
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
                                                type="number"
                                                placeholder="Escribe tu edad"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Si eres menor de 18 años, se solicitarán datos del acudiente
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Guardian fields - shown only if minor */}
                            <AnimatePresence>
                                {showGuardianFields && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-4 border-l-4 border-verde-goodkidz pl-4"
                                    >
                                        <h3 className="text-lg font-semibold text-verde-goodkidz">
                                            Datos del Acudiente o Responsable
                                        </h3>

                                        <FormField
                                            control={form.control}
                                            name="guardianName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nombre del acudiente</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nombre completo del acudiente"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="guardianDocument"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Documento del acudiente</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Número de documento"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="tu@correo.com"
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
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Globe className="w-4 h-4" />
                                                País
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Escribe tu país"
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

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Título de la obra</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Escribe un título para tu obra"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            Categoría
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona tu categoría" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="categoria-a">Categoría A - Niños y Niñas (8-14 años)</SelectItem>
                                                <SelectItem value="categoria-b">Categoría B - Jóvenes (15-17 años)</SelectItem>
                                                <SelectItem value="categoria-c">Categoría C - Adultos (18+ años)</SelectItem>
                                                <SelectItem value="artistas">Categoría D - Artistas</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Selecciona la categoría según tu edad o experiencia artística
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Artist CV upload - shown only if category is artistas */}
                            <AnimatePresence>
                                {showArtistCV && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-4 border-l-4 border-verde-goodkidz pl-4"
                                    >
                                        <h3 className="text-lg font-semibold text-verde-goodkidz">
                                            Hoja de Vida de Artista
                                        </h3>

                                        <Controller
                                            control={form.control}
                                            name="file3"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4" />
                                                        CV de Artista (PDF)
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Adjunta tu hoja de vida artística
                                                    </FormDescription>
                                                    <ul className="list-disc list-inside flex flex-col mt-2 text-sm text-gray-600">
                                                        <li>Formato: PDF</li>
                                                        <li>Tamaño máximo: 5MB</li>
                                                    </ul>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            accept="application/pdf"
                                                            onChange={(e) => {
                                                                const files = e.target.files;
                                                                if (files && files.length > 0) {
                                                                    const file = files[0];

                                                                    if (file.size > 5 * 1024 * 1024) {
                                                                        form.setError('file3', {
                                                                            type: 'manual',
                                                                            message: 'El archivo no puede exceder 5MB',
                                                                        });
                                                                        return;
                                                                    }

                                                                    if (file.type !== 'application/pdf') {
                                                                        form.setError('file3', {
                                                                            type: 'manual',
                                                                            message: 'El archivo debe ser un PDF',
                                                                        });
                                                                        return;
                                                                    }

                                                                    form.clearErrors('file3');
                                                                    field.onChange([file]);
                                                                }
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>


                            {/* Image upload */}
                            <Controller
                                control={form.control}
                                name="file1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Sube tu obra de arte
                                        </FormLabel>
                                        <ul className="list-disc list-inside flex flex-col mt-2 text-sm text-gray-600">
                                            <li>Formato: JPG</li>
                                            <li>Medidas de la obra: 50 x 35 cm</li>
                                            <li>Resolución: 150 dpi</li>
                                        </ul>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/jpeg, image/jpg"
                                                onChange={async (e) => {
                                                    const files = e.target.files;
                                                    if (files && files.length > 0) {
                                                        const originalFile = files[0];

                                                        try {
                                                            const compressedFile = await compressImage(originalFile);

                                                            if (compressedFile.size > 25 * 1024 * 1024) {
                                                                form.setError('file1', {
                                                                    type: 'manual',
                                                                    message: 'La imagen no puede exceder 25MB',
                                                                });
                                                                return;
                                                            }

                                                            form.clearErrors('file1');
                                                            field.onChange([compressedFile]);
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

                            {/* PDF upload */}
                            <Controller
                                control={form.control}
                                name="file2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            Descripción de la obra (PDF)
                                        </FormLabel>
                                        <FormDescription>
                                            Breve descripción y justificación con ficha técnica
                                        </FormDescription>
                                        <ul className="list-disc list-inside flex flex-col mt-2 text-sm text-gray-600">
                                            <li>Formato: PDF</li>
                                            <li>Fuente: Times New Roman, 12 puntos</li>
                                            <li>Máximo: 250 caracteres</li>
                                            <li>Tamaño máximo: 5MB</li>
                                        </ul>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(e) => {
                                                    const files = e.target.files;
                                                    if (files && files.length > 0) {
                                                        const file = files[0];

                                                        if (file.size > 5 * 1024 * 1024) {
                                                            form.setError('file2', {
                                                                type: 'manual',
                                                                message: 'El archivo no puede exceder 5MB',
                                                            });
                                                            return;
                                                        }

                                                        if (file.type !== 'application/pdf') {
                                                            form.setError('file2', {
                                                                type: 'manual',
                                                                message: 'El archivo debe ser un PDF',
                                                            });
                                                            return;
                                                        }

                                                        form.clearErrors('file2');
                                                        field.onChange([file]);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
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
                                                <a href="..." target="_blank" rel="noopener noreferrer" className="text-verde-goodkidz underline"> Términos y Condiciones</a> 2do Encuentro arte y vida, Fundación GOOD KIDZ Colombia 2025: PLANETA VERDE.
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
                                    console.log("form status:", status);
                                }}
                            >
                                {isLoading ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                        Enviando...
                                    </motion.div>
                                ) : (
                                    'Enviar obra'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </motion.div>
    );
}