'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';




export default function Map() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Solo habilita render en cliente
    }, []);




    const [positions, setPositions] = useState<[number, number][]>([]);

    useEffect(() => {
        const fetchPositions = async () => {
            const { data, error } = await supabase
                .from('locations')
                .select('latitude, longitude');

            if (error) {
                console.error('Error fetching positions:', error);
                return;
            }

            if (data) {
                const newPositions = data.map(
                    (item: { latitude: number; longitude: number }) =>
                        [item.latitude, item.longitude] as [number, number]
                );
                setPositions(newPositions);
            }
        };

        fetchPositions();
    }, []);

    const customIcon = new L.Icon({
        iconUrl: "/marker-icon.png", // copia este archivo desde node_modules/leaflet/dist/images
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "/marker-shadow.png",
        shadowSize: [41, 41],
    });

    if (!mounted) {
        return <div>Cargando mapa...</div>;
    }
    return (
        <MapContainer
            center={[6.2442, -75.5812]} // Coordenadas de Medellín
            zoom={15}
            style={{ height: '400px', width: '100%' }}
            scrollWheelZoom={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {positions.map((position, index) => (
                <Marker key={index} position={position} icon={customIcon}>
                    <Popup>
                        Fundación Good Kidz <br /> Medellín, Colombia
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
