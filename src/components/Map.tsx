import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const location = {
    lat: 6.2442, // Latitud de Medellín
    lng: -75.5812, // Longitud de Medellín
};

export default function Map() {
    return (
        <section className="container mx-auto py-12">
            <h2 className="text-3xl font-bold text-center">Nuestra Ubicación</h2>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
                    <Marker position={location} />
                </GoogleMap>
            </LoadScript>
        </section>
    );
}
