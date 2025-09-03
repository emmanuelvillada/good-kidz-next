// src/lib/imageCompression.ts
import imageCompression from "browser-image-compression";

export const compressImage = async (file: File) => {
    const options = {
        maxSizeMB: 1.5, // Comprimir imágenes a aproximadamente 1.5MB
        maxWidthOrHeight: 1920, // Escalar si es más grande
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);

        return compressedFile;
    } catch (error) {
        console.error("Error al comprimir la imagen:", error);
        return file; // Retorna el original si falla la compresión
    }
};