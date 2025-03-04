import { z } from 'zod';

// Zod schema for form micro story
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

// Infer the type from the Zod schema
type MicroStory = z.infer<typeof MicroStorySchema>;

export default MicroStorySchema;
export type { MicroStory };
