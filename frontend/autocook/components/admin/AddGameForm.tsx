"use client";

import { useState } from "react";

export default function AddGameForm({casinoId, onConfirm}: {casinoId: string, onConfirm: () => void}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !casinoId || !image) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    // Convertir l'image en Base64
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result?.toString().split(",")[1]; // Retire le préfixe `data:image/png;base64,`
        const response = await fetch("/api/game", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            casinoId,
            imageData: base64Image, // On envoie l'image encodée
          }),
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout du jeu");

        setMessage("Jeu ajouté avec succès !");
        setName("");
        setImage(null);
        onConfirm();
        window.location.reload();
      } catch (error) {
        console.error(error);
        setMessage("Erreur lors de l'ajout du jeu.");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold">Ajouter un Jeu</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nom du jeu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}
