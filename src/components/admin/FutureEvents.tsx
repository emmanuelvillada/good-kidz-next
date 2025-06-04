'use client'
import { useEffect, useState } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { v4 as uuidv4 } from 'uuid'
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import validateImageDimensions from '@/lib/validateImageDimensions'

const supabase = createPagesBrowserClient()

const eventSchema = z.object({
    title: z.string().min(1, 'Título requerido').max(100, 'Máximo 100 caracteres'),
    description: z.string().optional(),
    date: z.string().min(1, 'Fecha requerida'),
    location: z.string().optional(),
    link: z.string().url('Debe ser una URL válida').optional(),
    file: z.any().optional(),
    mobile_file: z.any().optional(),
})

type EventFormData = z.infer<typeof eventSchema>

type Event = {
    id: string
    title: string
    description: string
    date: string
    location: string
    file?: string
    mobile_file?: string
    link?: string
}

export default function FutureEvents() {
    const [events, setEvents] = useState<Event[]>([])

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<EventFormData>({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        resolver: zodResolver(eventSchema),
    })

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const { data: eventsData } = await supabase.from('events').select('*').order('date')
        setEvents(eventsData || [])
    }

    async function handleFileUpload(file: File, folder: string, minWidth: number, minHeight: number): Promise<string> {
        const isValid = await validateImageDimensions(file, minWidth, minHeight)
        if (!isValid) {
            toast.error(`La imagen debe tener mínimo ${minWidth}px de ancho y ${minHeight}px de alto`)
            return ''
        }

        const fileName = `${folder}/${uuidv4()}-${file.name}`
        const { error } = await supabase.storage.from('events').upload(fileName, file)

        if (error) {
            toast.error('Error subiendo archivo')
            return ''
        }

        const { data: publicUrl } = supabase.storage.from('events').getPublicUrl(fileName)
        if (!publicUrl) {
            toast.error('Error obteniendo URL pública del archivo')
            return ''
        }

        toast.success('Archivo subido exitosamente')
        return publicUrl.publicUrl
    }



    async function onSubmit(data: EventFormData) {
        const toastId = toast.loading('Subiendo evento...')
        const { file, mobile_file, ...eventData } = data

        const uploadedFile = file instanceof File
            ? await handleFileUpload(file, 'images', 1168, 300) // escritorio
            : ''

        const uploadedMobile = mobile_file instanceof File
            ? await handleFileUpload(mobile_file, 'images', 366, 205) // móvil
            : ''



        const finalEvent = {
            ...eventData,
            file: uploadedFile,
            mobile_file: uploadedMobile,
        }

        const { error } = await supabase.from('events').insert([finalEvent])
        if (!error) {
            toast.update(toastId, { render: 'Evento agregado exitosamente', type: 'success', isLoading: false })
            reset()
            fetchData()
        } else {
            toast.update(toastId, { render: 'Error al agregar el evento', type: 'error', isLoading: false })
        }
    }

    async function deleteEvent(id: string) {
        const confirmDelete = window.confirm('¿Estás seguro de eliminar este evento? Esta acción no se puede deshacer.')
        if (!confirmDelete) return
        const toastId = toast.loading('Eliminando evento...')
        const { error } = await supabase.from('events').delete().eq('id', id)
        if (!error) {
            toast.update(toastId, { render: 'Evento eliminado exitosamente', type: 'success', isLoading: false })
            fetchData()
        } else {
            toast.update(toastId, { render: 'Error al eliminar el evento', type: 'error', isLoading: false })
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Card: Agregar Evento Futuro */}
            <Card className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-verde-goodkidz">Agregar Evento Futuro</h2>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            placeholder="Título"
                            {...register('title')}
                            className="h-10 rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                        <Input
                            type="date"
                            {...register('date')}
                            className="h-10 rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500"
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

                        <Input
                            placeholder="Lugar"
                            {...register('location')}
                            className="h-10 rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500"
                        />

                        <Textarea
                            placeholder="Descripción"
                            {...register('description')}
                            className="rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500"
                        />

                        <Input
                            placeholder="Link externo (opcional)"
                            {...register('link')}
                            className="h-10 rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500"
                        />
                        {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}

                        <input
                            type="file"
                            title="Archivo principal"
                            accept='image/webp'
                            className="text-sm"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) setValue('file', file)
                            }}
                        />

                        <input
                            type="file"
                            title="Archivo para móvil"
                            accept='image/webp'
                            className="text-sm"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) setValue('mobile_file', file)
                            }}
                        />

                        <button
                            type="submit"
                            className="bg-verde-goodkidz hover:bg-green-700 transition text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-sm"
                        >
                            <PlusIcon className="h-5 w-5" /> Agregar Evento
                        </button>
                    </form>
                </div>
            </Card>

            {/* Card: Eventos Registrados */}
            <Card className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700">Eventos Futuros Actuales</h3>
                    {events.length === 0 && <p className="text-sm text-gray-500">No hay eventos futuros.</p>}
                    <ul className="divide-y max-h-[450px] overflow-y-auto pr-2">
                        {events.map((ev) => (
                            <li key={ev.id} className="py-3 flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="font-medium">{ev.title}</p>
                                    <p className="text-sm text-gray-600">{ev.date} – {ev.location}</p>
                                    {ev.file && (
                                        <a
                                            className="text-verde-goodkidz text-sm hover:underline flex items-center gap-1"
                                            href={ev.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Ver archivo
                                        </a>
                                    )}
                                </div>
                                <button
                                    title="Eliminar Evento"
                                    onClick={() => deleteEvent(ev.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>

            <ToastContainer />
        </div>
    )


}
