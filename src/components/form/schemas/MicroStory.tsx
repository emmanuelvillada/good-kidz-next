import { z } from 'zod';

const MicroStorySchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Email inválido"),
    age: z.string().min(1, "La edad es requerida"),
    phone: z.string().min(1, "El teléfono es requerido"),
    country: z.string().min(1, "El país es requerido"),
    city: z.string().min(1, "La ciudad es requerida"),

    // Campos condicionales para menores de edad
    isMinor: z.boolean().optional(),
    guardianName: z.string().optional(),
    guardianDocument: z.string().optional(),

    file1: z.any().refine(
        (files) => files && files.length > 0,
        "La imagen es requerida"
    ),
    file2: z.any().refine(
        (files) => files && files.length > 0,
        "El PDF con la descripción es requerido"
    ).refine(
        (files) => files?.[0]?.type === 'application/pdf',
        "Solo se permiten archivos PDF"
    ).refine(
        (files) => files?.[0]?.size <= 5 * 1024 * 1024,
        "El archivo debe ser menor a 5MB"
    ),

    terms: z.literal(true, {
        errorMap: () => ({ message: "Debes aceptar los términos" })
    }),
    policy: z.literal(true, {
        errorMap: () => ({ message: "Debes aceptar la política" })
    })
}).refine(
    (data) => {
        const age = parseInt(data.age);
        if (age < 18) {
            return data.guardianName && data.guardianDocument;
        }
        return true;
    },
    {
        message: "Debes proporcionar los datos del acudiente para menores de edad",
        path: ["guardianName"]
    }
);

export default MicroStorySchema;
export type MicroStory = z.infer<typeof MicroStorySchema>;