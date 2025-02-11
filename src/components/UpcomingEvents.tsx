import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
}

export default function UpcomingEvents() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .order("date", { ascending: true })
                .gte("date", new Date().toISOString());

            if (error) {
                console.error("Error fetching events:", error);
                return;
            }

            if (data) setEvents(data);
        }

        fetchEvents();
    }, []);

    return (
        <section className="container mx-auto py-12">
            <h2 className="text-3xl font-bold text-center">Próximos Eventos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {events.map((event: Event) => (
                    <div key={event.id} className="border p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                        <p className="text-gray-600">{event.date}</p>
                        <p className="text-gray-500">{event.location}</p>
                        <Button className="mt-3 bg-verde-goodkidz">Más Información</Button>
                    </div>
                ))}
            </div>
        </section>
    );
}
