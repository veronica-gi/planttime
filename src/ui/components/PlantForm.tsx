import { useState } from "react"
import type { Plant } from "../../core/models/Plant"
import { useImagePreview } from "../hooks/useImagePreview"

interface PlantFormProps {
  onAdd: (plant: Plant) => void
}

export function PlantForm({ onAdd }: PlantFormProps) {
  const [name, setName] = useState("")
  const [species, setSpecies] = useState("")
  const [wateringFrequency, setWateringFrequency] = useState<number | "">("")
  const [fertilizingFrequency, setFertilizingFrequency] = useState<number | "">("")

  const { file: imageFile, preview: imagePreview, handleChange: handleImageChange, reset: resetImage } = useImagePreview()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || wateringFrequency === "" || fertilizingFrequency === "") {
      alert("Por favor, completa los campos obligatorios 🌱")
      return
    }

    const newPlant: Plant = {
      id: crypto.randomUUID(),
      name,
      species,
      lastWatered: new Date(),
      wateringFrequency: Number(wateringFrequency),
      notes: "",
      imageUrl: imagePreview || undefined,
      fertilizingFrequency: Number(fertilizingFrequency),
    }

    onAdd(newPlant)

    setName("")
    setSpecies("")
    setWateringFrequency("")
    setFertilizingFrequency("")
    resetImage()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md">
      <div>
        <label className="block text-sm font-semibold mb-1">Nombre de la planta *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded-md bg-gray-50 dark:bg-zinc-700 dark:border-zinc-600"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Especie</label>
        <input
          type="text"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-50 dark:bg-zinc-700 dark:border-zinc-600"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Foto de la planta (opcional)</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Frecuencia de riego (días) *</label>
          <input
            type="number"
            min="1"
            value={wateringFrequency}
            onChange={(e) => setWateringFrequency(e.target.value ? Number(e.target.value) : "")}
            required
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-zinc-700 dark:border-zinc-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Frecuencia de fertilizante (días) *</label>
          <input
            type="number"
            min="1"
            value={fertilizingFrequency}
            onChange={(e) => setFertilizingFrequency(e.target.value ? Number(e.target.value) : "")}
            required
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-zinc-700 dark:border-zinc-600"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full"
      >
        Agregar planta
      </button>
    </form>
  )
}




