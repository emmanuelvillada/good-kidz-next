'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";


export default function Map() {

    const customIcon = new L.Icon({
        iconUrl: "/marker-icon.png", // copia este archivo desde node_modules/leaflet/dist/images
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "/marker-shadow.png",
        shadowSize: [41, 41],
    });
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
            <Marker position={[6.2442, -75.5812]} icon={customIcon}>
                <Popup>
                    Fundación Good Kidz <br /> Medellín, Colombia
                </Popup>
            </Marker>
        </MapContainer>
    );
}
