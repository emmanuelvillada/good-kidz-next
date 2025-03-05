import { z } from 'zod';

// Zod schema for form micro story
const MicroStorySchema = z.object({
    title: z.string()
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(100, 'El título no puede exceder los 100 caracteres'),
    attendant_name: z.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede exceder los 100 caracteres'),
    name: z.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede exceder los 100 caracteres'),
    email: z.string()
        .email('Correo electrónico inválido')
        .max(100, 'El correo electrónico no puede exceder los 100 caracteres'),
    age: z.number().min(6, 'La edad debe ser mayor a 6').max(10, 'La edad no puede ser mayor a 10'),
    phone: z.string()
        .min(10, 'El teléfono debe tener al menos 10 caracteres')
        .max(15, 'El teléfono no puede exceder los 15 caracteres'),
    address: z.string()
        .min(3, 'La dirección debe tener al menos 3 caracteres')
        .max(100, 'La dirección no puede exceder los 100 caracteres'),
    city: z.string()
        .min(3, 'La ciudad debe tener al menos 3 caracteres')
        .max(100, 'La ciudad no puede exceder los 100 caracteres'),
    file1: z.any()
        .refine((file) => file?.length === 1, "La imagen es requerida")
        .refine((file) => file?.[0]?.size <= 5000000, "La imagen no puede exceder 5MB")
        .refine(
            (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file?.[0]?.type),
            "Solo se permiten archivos .jpg, .png y .webp"
        ),
    file2: z.any()
        .refine((file) => file?.length === 1, "El PDF es requerido")
        .refine((file) => file?.[0]?.size <= 5000000, "El PDF no puede exceder 5MB")
        .refine(
            (file) => file?.[0]?.type === 'application/pdf',
            "Solo se permiten archivos .pdf"
        ),
    file3: z.any()
        .refine((file) => file?.length === 1, "El PDF es requerido")
        .refine((file) => file?.[0]?.size <= 5000000, "El PDF no puede exceder 5MB")
        .refine(
            (file) => file?.[0]?.type === 'application/pdf',
            "Solo se permiten archivos .pdf"
        ),
});

// Infer the type from the Zod schema
type MicroStory = z.infer<typeof MicroStorySchema>;

export default MicroStorySchema;
export type { MicroStory };
