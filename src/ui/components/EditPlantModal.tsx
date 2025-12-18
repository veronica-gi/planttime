import { useState, useEffect } from "react"
import type { Plant } from "../../core/models/Plant"

interface EditPlantModalProps {
  plant: Plant
  isOpen: boolean
  onClose: () => void
  onSave: (plant: Plant) => void
}

export function EditPlantModal({ plant, isOpen, onClose, onSave }: EditPlantModalProps) {
  const [name, setName] = useState("")
  const [species, setSpecies] = useState("")
  const [wateringFrequency, setWateringFrequency] = useState<number>(1)
  const [fertilizingFrequency, setFertilizingFrequency] = useState<number>(0)
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    setName(plant.name)
    setSpecies(plant.species || "")
    setWateringFrequency(plant.wateringFrequency)
    setFertilizingFrequency(plant.fertilizingFrequency || 0)
    setImageUrl(plant.imageUrl || "")
  }, [plant])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSave({
      ...plant,
      name,
      species,
      wateringFrequency,
      fertilizingFrequency,
      imageUrl: imageUrl || undefined,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar planta</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nombre"
            required
          />

          <input
            className="w-full p-2 border rounded"
            value={species}
            onChange={e => setSpecies(e.target.value)}
            placeholder="Especie"
          />

          <input
            type="number"
            min="1"
            className="w-full p-2 border rounded"
            value={wateringFrequency}
            onChange={e => setWateringFrequency(Number(e.target.value))}
          />

          <input
            type="number"
            min="0"
            className="w-full p-2 border rounded"
            value={fertilizingFrequency}
            onChange={e => setFertilizingFrequency(Number(e.target.value))}
          />

          <input
            className="w-full p-2 border rounded"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="URL imagen"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
