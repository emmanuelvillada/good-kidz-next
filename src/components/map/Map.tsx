'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
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
            <Marker position={[6.2442, -75.5812]}>
                <Popup>
                    Fundación Good Kidz <br /> Medellín, Colombia
                </Popup>
            </Marker>
        </MapContainer>
    );
}
