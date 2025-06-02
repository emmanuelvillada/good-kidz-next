'use client'

import { useEffect, useState } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { v4 as uuidv4 } from 'uuid'
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline'

const supabase = createPagesBrowserClient()

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

type PastEvent = {
    id: string
    title: string
    description: string
    date: string
    location: string
    image?: string
}

export default function AdminPanel() {
    const [events, setEvents] = useState<Event[]>([])
    const [pastEvents, setPastEvents] = useState<PastEvent[]>([])
    const [newEvent, setNewEvent] = useState<Partial<Event>>({})
    const [newPastEvent, setNewPastEvent] = useState<Partial<PastEvent>>({})

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const { data: eventsData } = await supabase.from('events').select('*').order('date')
        const { data: pastEventsData } = await supabase.from('past_events').select('*').order('date', { ascending: false })

        setEvents(eventsData || [])
        setPastEvents(pastEventsData || [])
    }

    async function handleFileUpload(file: File, folder: string) {
        const fileName = `${folder}/${uuidv4()}-${file.name}`
        const { error } = await supabase.storage.from('public').upload(fileName, file)

        if (error) {
            alert('Error subiendo archivo')
            return ''
        }

        const { data: publicUrl } = supabase.storage.from('public').getPublicUrl(fileName)
        return publicUrl?.publicUrl || ''
    }

    async function addEvent() {
        if (!newEvent.title || !newEvent.date) return alert('Título y fecha obligatorios')
        const { error } = await supabase.from('events').insert([newEvent])
        if (!error) {
            setNewEvent({})
            fetchData()
        }
    }

    async function addPastEvent() {
        if (!newPastEvent.title || !newPastEvent.date) return alert('Título y fecha obligatorios')
        const { error } = await supabase.from('past_events').insert([newPastEvent])
        if (!error) {
            setNewPastEvent({})
            fetchData()
        }
    }

    async function deleteEvent(id: string, table: string) {
        await supabase.from(table).delete().eq('id', id)
        fetchData()
    }

    const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
        <input {...props} className="p-2 border rounded-md w-full" />
    )

    const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
        <textarea {...props} className="p-2 border rounded-md w-full" />
    )

    const Card = ({ children }: { children: React.ReactNode }) => (
        <div className="bg-white rounded-xl shadow-md p-4 space-y-2">{children}</div>
    )

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            {/* Futuro */}
            <Card>
                <h2 className="text-xl font-semibold text-green-600 mb-2">Agregar Evento Futuro</h2>
                <div className="grid grid-cols-1 gap-2">
                    <Input
                        placeholder="Título"
                        value={newEvent.title || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewEvent({ ...newEvent, title: e.target.value })
                        }
                    />
                    <Input
                        type="date"
                        placeholder="Fecha"
                        value={newEvent.date || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewEvent({ ...newEvent, date: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Lugar"
                        value={newEvent.location || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewEvent({ ...newEvent, location: e.target.value })
                        }
                    />
                    <Textarea
                        placeholder="Descripción"
                        value={newEvent.description || ''}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setNewEvent({ ...newEvent, description: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Link externo (opcional)"
                        value={newEvent.link || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewEvent({ ...newEvent, link: e.target.value })
                        }
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="file"
                            title="Subir archivo para evento"
                            placeholder="Archivo del evento"
                            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                const url = await handleFileUpload(file, 'events')
                                setNewEvent({ ...newEvent, file: url })
                            }}
                        />
                        <input
                            type="file"
                            title="Subir archivo móvil para evento"
                            placeholder="Archivo móvil del evento"
                            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                const url = await handleFileUpload(file, 'events/mobile')
                                setNewEvent({ ...newEvent, mobile_file: url })
                            }}
                        />
                    </div>
                    <button
                        onClick={addEvent}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <PlusIcon className="h-5 w-5" /> Agregar Evento
                    </button>
                </div>
            </Card>

            <Card>
                <h3 className="text-lg font-semibold text-gray-700">Eventos Futuros Actuales</h3>
                {events.length === 0 && <p className="text-sm text-gray-500">No hay eventos futuros.</p>}
                <ul className="divide-y">
                    {events.map(ev => (
                        <li key={ev.id} className="py-2 flex justify-between items-start">
                            <div>
                                <p className="font-medium">{ev.title}</p>
                                <p className="text-sm text-gray-600">{ev.date} – {ev.location}</p>
                                {ev.file && <a className="text-blue-600 text-sm underline" href={ev.file} target="_blank">Ver archivo</a>}
                            </div>
                            <button
                                title='Eliminar Evento'
                                onClick={() => deleteEvent(ev.id, 'events')} className="text-red-600 hover:text-red-800">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            </Card>

            {/* Pasado */}
            <Card>
                <h2 className="text-xl font-semibold text-blue-600 mb-2">Agregar Evento Pasado</h2>
                <div className="grid grid-cols-1 gap-2">
                    <Input
                        placeholder="Título"
                        value={newPastEvent.title || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewPastEvent({ ...newPastEvent, title: e.target.value })
                        }
                    />
                    <Input
                        type="date"
                        placeholder="Fecha"
                        value={newPastEvent.date || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewPastEvent({ ...newPastEvent, date: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Lugar"
                        value={newPastEvent.location || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewPastEvent({ ...newPastEvent, location: e.target.value })
                        }
                    />
                    <Textarea
                        placeholder="Descripción"
                        value={newPastEvent.description || ''}
                    />
                    <input
                        type="file"
                        title="Subir imagen para evento pasado"
                        placeholder="Imagen del evento pasado"
                        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            const url = await handleFileUpload(file, 'past_events')
                            setNewPastEvent({ ...newPastEvent, image: url })
                        }}
                    />
                    <button
                        onClick={addPastEvent}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <PlusIcon className="h-5 w-5" /> Agregar Evento Pasado
                    </button>
                </div>
            </Card>

            <Card>
                <h3 className="text-lg font-semibold text-gray-700">Eventos Pasados Registrados</h3>
                {pastEvents.length === 0 && <p className="text-sm text-gray-500">No hay eventos pasados.</p>}
                <ul className="divide-y">
                    {pastEvents.map(ev => (
                        <li key={ev.id} className="py-2 flex justify-between items-start">
                            <div>
                                <p className="font-medium">{ev.title}</p>
                                <p className="text-sm text-gray-600">{ev.date} – {ev.location}</p>
                                {ev.image && <a className="text-blue-600 text-sm underline" href={ev.image} target="_blank">Ver imagen</a>}
                            </div>
                            <button
                                title="Eliminar evento pasado"
                                onClick={() => deleteEvent(ev.id, 'past_events')} className="text-red-600 hover:text-red-800">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    )
}
