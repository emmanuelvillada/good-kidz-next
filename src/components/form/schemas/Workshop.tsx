import { z } from 'zod';

export const WorkshopSchema = z.object({
    name: z.string(),
    age: z.string().refine((value) => parseInt(value) >= 6 && parseInt(value) <= 11, 'la edad debe ser entre 6 y 11 años'),
    document: z.string().refine((value) => value.length > 6, {
        message: 'el número de documento debe tener más de 6 caracteres',
    }),
    responsable_name: z.string(),
    responsable_document: z.string().refine((value) => value.length > 6, {
        message: 'el número de documento debe tener más de 6 caracteres',
    }),
    cellphone: z.string().refine((value) => value.length === 10, {
        message: 'el número de celular debe tener 10 caracteres',
    }),
    email: z.string().email(),
    authorization: z.boolean().refine((value) => value === true, 'debes aceptar los terminos y condiciones para participar del taller'),
});

export type Workshop = z.infer<typeof WorkshopSchema>;