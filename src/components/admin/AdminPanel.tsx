'use client'

import { useEffect, useState } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { v4 as uuidv4 } from 'uuid'
import { Label } from '@radix-ui/react-label'

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
        const { data, error } = await supabase.storage.from('public').upload(fileName, file)

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

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Eventos Futuros</h2>
            <div className="mb-4 grid gap-2">
                <input className="input" placeholder="Título" value={newEvent.title || ''} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
                <input className="input" placeholder="Fecha" type="date" value={newEvent.date || ''} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
                <input className="input" placeholder="Lugar" value={newEvent.location || ''} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} />
                <textarea className="input" placeholder="Descripción" value={newEvent.description || ''} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
                <input className="input" placeholder="Link" value={newEvent.link || ''} onChange={e => setNewEvent({ ...newEvent, link: e.target.value })} />
                <input
                    type="file"
                    placeholder="Archivo para escritorio"
                    onChange={async e => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        const url = await handleFileUpload(file, 'events')
                        setNewEvent({ ...newEvent, file: url })
                    }} />
                <input
                    type="file"
                    placeholder="Archivo para móvil"
                    onChange={async e => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        const url = await handleFileUpload(file, 'events/mobile')
                        setNewEvent({ ...newEvent, mobile_file: url })
                    }} />
                <button onClick={addEvent} className="btn">Agregar Evento</button>
            </div>

            <ul>
                {events.map(ev => (
                    <li key={ev.id} className="border p-2 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{ev.title}</p>
                            <p>{ev.date} - {ev.location}</p>
                        </div>
                        <button onClick={() => deleteEvent(ev.id, 'events')} className="text-red-500">Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-2">Eventos Pasados</h2>
            <div className="mb-4 grid gap-2">
                <input className="input" placeholder="Título" value={newPastEvent.title || ''} onChange={e => setNewPastEvent({ ...newPastEvent, title: e.target.value })} />
                <input className="input" placeholder="Fecha" type="date" value={newPastEvent.date || ''} onChange={e => setNewPastEvent({ ...newPastEvent, date: e.target.value })} />
                <input className="input" placeholder="Lugar" value={newPastEvent.location || ''} onChange={e => setNewPastEvent({ ...newPastEvent, location: e.target.value })} />
                <textarea className="input" placeholder="Descripción" value={newPastEvent.description || ''} onChange={e => setNewPastEvent({ ...newPastEvent, description: e.target.value })} />
                <input
                    type="file"
                    placeholder="Imagen del evento pasado"
                    onChange={async e => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        const url = await handleFileUpload(file, 'past_events')
                        setNewPastEvent({ ...newPastEvent, image: url })

                    }} />
                <button onClick={addPastEvent} className="btn">Agregar Evento Pasado</button>
            </div>

            <ul>
                {pastEvents.map(ev => (
                    <li key={ev.id} className="border p-2 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{ev.title}</p>
                            <p>{ev.date} - {ev.location}</p>
                        </div>
                        <button onClick={() => deleteEvent(ev.id, 'past_events')} className="text-red-500">Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
