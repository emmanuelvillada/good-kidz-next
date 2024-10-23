export default function Maintenance() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-verde-goodkidz mb-4">
            ¡Estamos en mantenimiento!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            La página estará disponible nuevamente pronto. Gracias por tu paciencia.
          </p>
          <svg
            className="w-16 h-16 text-verde-goodkidz mx-auto mb-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m0 0h-.01M12 12h.01M19 12l-7 8-7-8M5 12h14"
            />
          </svg>
          
        </div>
      </div>
    );
  }
  