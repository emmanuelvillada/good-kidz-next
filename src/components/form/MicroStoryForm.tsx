import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Upload, Calendar, MapPin } from 'lucide-react';

// Schema with better validation
const MicroStorySchema = z.object({
    title: z.string()
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(100, 'El título no puede exceder los 100 caracteres'),
    description: z.string()
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(500, 'La descripción no puede exceder los 500 caracteres'),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Fecha inválida"
    }),
    location: z.string()
        .min(3, 'La ubicación debe tener al menos 3 caracteres')
        .max(100, 'La ubicación no puede exceder los 100 caracteres'),
    file: z.any()
        .refine((file) => file?.length === 1, "La imagen es requerida")
        .refine((file) => file?.[0]?.size <= 5000000, "La imagen no puede exceder 5MB")
        .refine(
            (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file?.[0]?.type),
            "Solo se permiten archivos .jpg, .png y .webp"
        ),
});

type MicroStory = z.infer<typeof MicroStorySchema>;

interface FormStatus {
    type: 'success' | 'error' | null;
    message: string | null;
}

export default function MicroStoryForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<FormStatus>({ type: null, message: null });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm<MicroStory>({
        resolver: zodResolver(MicroStorySchema),
    });

    // Preview image handling
    const fileWatch = watch("file");
    if (fileWatch?.[0] && !previewUrl) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(fileWatch[0]);
    }

    const onSubmit: SubmitHandler<MicroStory> = async (data) => {
        setIsLoading(true);
        setStatus({ type: null, message: null });

        try {
            // Upload image first
            const file = data.file[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('micro-stories')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Then save story data
            const { error: storyError } = await supabase
                .from("micro_stories")
                .insert([{
                    title: data.title,
                    description: data.description,
                    date: data.date,
                    location: data.location,
                    file_url: uploadData.path
                }]);

            if (storyError) throw storyError;

            setStatus({
                type: 'success',
                message: '¡Historia creada con éxito!'
            });

            // Reset form
            reset();
            setPreviewUrl(null);

        } catch (error) {
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                        id="title"
                        {...register("title")}
                        placeholder="Escribe un título para tu historia"
                        error={errors.title?.message}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                        id="description"
                        {...register("description")}
                        placeholder="Cuéntanos tu historia"
                        rows={4}
                        error={errors.description?.message}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Fecha
                        </Label>
                        <Input
                            type="date"
                            id="date"
                            {...register("date")}
                            error={errors.date?.message}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location" className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Ubicación
                        </Label>
                        <Input
                            id="location"
                            {...register("location")}
                            placeholder="¿Dónde sucedió?"
                            error={errors.location?.message}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="file" className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Imagen
                    </Label>
                    <Input
                        type="file"
                        id="file"
                        accept="image/jpeg,image/png,image/webp"
                        {...register("file")}
                        error={errors.file?.message}
                    />
                    {previewUrl && (
                        <div className="mt-2 relative aspect-video rounded-lg overflow-hidden">
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

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
                    className="w-full"
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
        </motion.div>
    );
}