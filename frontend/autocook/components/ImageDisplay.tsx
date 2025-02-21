"use client";
import { useState, useEffect } from "react";

export default function ImageDisplay({ imageData }: { imageData: Record<string, number> }) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        if (!imageData || Object.keys(imageData).length === 0) {
            console.warn("Image data is empty or invalid.");
            return;
        }

        try {
            // Convertir l'objet en Uint8Array
            const byteArray = new Uint8Array(Object.values(imageData));
            
            // Créer un Blob avec le bon type (JPEG ici)
            const blob = new Blob([byteArray], { type: "image/jpeg" }); // Ajuste selon le format

            // Générer une URL d’objet
            const url = URL.createObjectURL(blob);
            setImageSrc(url);

            // Nettoyage de l’URL pour éviter les fuites mémoire
            return () => URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error processing image:", error);
        }
    }, [imageData]);

    return imageSrc ? <img src={imageSrc} style={{
        width: "200px", // ou une valeur fixe
        height: "200px", // Hauteur souhaitée
        objectFit: "cover", // Coupe l’image tout en gardant les proportions
      }} className="rounded" alt="Game Image" /> : <p>Chargement...</p>;
}
