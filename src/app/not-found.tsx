export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
            <p className="text-lg mt-2">Lo sentimos, la página que buscas no existe.</p>
            <a href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Volver al inicio</a>
        </div>
    );
}
