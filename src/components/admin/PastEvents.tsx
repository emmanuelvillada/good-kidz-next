'use client'
import { useEffect, useState } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import validateImageDimensions from '@/lib/validateImageDimensions'

const supabase = createPagesBrowserClient()
//Zod schema


const eventSchema = z.object({
    title: z.string().min(1, 'El título es obligatorio'),
    date: z.string().min(1, 'La fecha es obligatoria'),
    location: z.string().optional(),
    description: z.string().optional(),
    image: z.any().optional(),
})

// Define the Event type

type PastEvent = {
    id: string
    title: string
    description: string
    date: string
    location: string
    image?: string
}
export default function PastEvent() {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        mode: 'onBlur',
        reValidateMode: 'onChange'
    })


    const [pastEvents, setPastEvents] = useState<PastEvent[]>([])

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const { data: pastEventsData } = await supabase.from('past_events').select('*').order('date', { ascending: false })

        setPastEvents(pastEventsData || [])
    }
    async function handleFileUpload(file: File, folder: string) {
        const isValid = await validateImageDimensions(file, 1136, 408)
        if (!isValid) {
            toast.error('La imagen debe tener al menos 1136x408 píxeles')
            return ''
        }

        const fileName = `${folder}/${uuidv4()}-${file.name}`
        const { error } = await supabase.storage.from('public').upload(fileName, file)

        if (error) {
            toast.error('Error subiendo archivo')
            return ''
        }

        const { data: publicUrl } = supabase.storage.from('public').getPublicUrl(fileName)
        return publicUrl?.publicUrl || ''
    }

    const onSubmit = async (data: z.infer<typeof eventSchema>) => {
        const toastId = toast.loading('Agregando evento...')

        if (!data.image) {
            toast.update(toastId, { render: 'Debes seleccionar una imagen', type: 'error', isLoading: false })
            return
        }

        const uploadedImage = await handleFileUpload(data.image, 'past events')

        if (!uploadedImage) {
            toast.update(toastId, { render: 'Error al subir la imagen', type: 'error', isLoading: false })
            return
        }

        const finalData = {
            ...data,
            image: uploadedImage,
        }

        const { error } = await supabase.from('past_events').insert([finalData])

        if (error) {
            toast.update(toastId, { render: 'Error al agregar evento', type: 'error', isLoading: false })
        } else {
            toast.update(toastId, { render: 'Evento agregado', type: 'success', isLoading: false })
            reset()
            fetchData()
        }
    }


    async function deleteEvent(id: string, table: string) {
        const confirmation = confirm('¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.')
        if (!confirmation) return
        const toastId = toast.loading('Eliminando evento...')
        const { error } = await supabase.from(table).delete().eq('id', id)
        if (error) {
            toast.update(toastId, { render: 'Error al eliminar evento', type: 'error', isLoading: false })
            return
        }
        toast.update(toastId, { render: 'Evento eliminado', type: 'success', isLoading: false })
        // Eliminar la imagen del almacenamiento si existe
        const event = pastEvents.find(ev => ev.id === id)
        if (event?.image) {
            const { error: deleteImageError } = await supabase.storage.from('public').remove([`past events/${event.image.split('/').pop()}`])
            if (deleteImageError) {
                toast.error('Error al eliminar la imagen del evento')
            }
        }
        // Refrescar la lista de eventos
        setPastEvents(pastEvents.filter(ev => ev.id !== id))
        reset()
        fetchData()
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 flex-wrap">
            {/* Card: Agregar Evento Pasado */}
            <Card className="w-full md:w-[48%] bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-blue-700">Agregar Evento Pasado</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            placeholder="Título"
                            {...register('title')}
                            className="h-10 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                        <Input
                            type="date"
                            {...register('date')}
                            className="h-10 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

                        <Input
                            placeholder="Lugar"
                            {...register('location')}
                            className="h-10 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />

                        <Textarea
                            placeholder="Descripción"
                            {...register('description')}
                            className="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />

                        <input
                            title="Imagen"
                            type="file"
                            className="text-sm"
                            accept='image/webp'
                            onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                setValue('image', file)
                            }}
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-sm"
                        >
                            <PlusIcon className="h-5 w-5" /> Agregar Evento
                        </button>
                    </form>
                </div>
            </Card>

            {/* Card: Eventos Pasados Registrados */}
            <Card className="w-full md:w-[48%] bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700">Eventos Pasados Registrados</h3>
                    {pastEvents.length === 0 && (
                        <p className="text-sm text-gray-500">No hay eventos pasados.</p>
                    )}
                    <ul className="divide-y max-h-[450px] overflow-y-auto pr-2">
                        {pastEvents.map((ev) => (
                            <li key={ev.id} className="py-3 flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="font-medium">{ev.title}</p>
                                    <p className="text-sm text-gray-600">{ev.date} – {ev.location}</p>
                                    {ev.image && (
                                        <a
                                            className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                                            href={ev.image}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Ver imagen
                                        </a>
                                    )}
                                </div>
                                <button
                                    title="Eliminar evento pasado"
                                    onClick={() => deleteEvent(ev.id, 'past_events')}
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