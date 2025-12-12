import { Droplet, Calendar, Leaf, Trash2 } from "lucide-react"
import type { Plant } from "../../core/models/Plant"

interface PlantCardProps {
  plant: Plant
  onDelete?: (id: string) => void
  onUpdate?: (plant: Plant) => void
}

export function PlantCard({ plant, onDelete, onUpdate }: PlantCardProps) {
  return (
    <div className="
      w-72 bg-white dark:bg-zinc-800 rounded-3xl shadow-lg 
      overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1
    ">
      
      {/* Imagen */}
      <div className="h-44 bg-gray-200 dark:bg-zinc-700">
        {plant.imageUrl ? (
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Leaf size={40} />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold">{plant.name}</h3>

        {/* Especie */}
        {plant.species && (
          <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center gap-2">
            <Leaf size={16} /> {plant.species}
          </p>
        )}

        {/* Último riego */}
        <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center gap-2">
          <Calendar size={16} />
          Último riego:{" "}
          {new Date(plant.lastWatered).toLocaleDateString()}
        </p>

        {/* Frecuencias */}
        <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center gap-2">
          <Droplet size={16} />
          Riego cada {plant.wateringFrequency} días
        </p>

        {plant.fertilizingFrequency && (
          <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center gap-2">
            🌱 Fertilización cada {plant.fertilizingFrequency} días
          </p>
        )}

        {/* Botones */}
        <div className="flex flex-col gap-2">
          {onDelete && (
            <button
              onClick={() => onDelete(plant.id)}
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
            >
              <Trash2 size={18} />
              Eliminar
            </button>
          )}

          {onUpdate && (
            <button
              onClick={() => {
                const newName = prompt("Nombre de la planta", plant.name)
                if (!newName) return

                const newSpecies = prompt("Especie", plant.species || "")
                if (newSpecies === null) return

                const newImageUrl = prompt("URL de la foto", plant.imageUrl || "")
                if (newImageUrl === null) return

                const newWateringFrequency = prompt("Frecuencia de riego (días)", plant.wateringFrequency.toString())
                if (!newWateringFrequency) return

                const newFertilizingFrequency = prompt(
                  "Frecuencia de fertilización (días)",
                  plant.fertilizingFrequency?.toString() || ""
                )
                if (!newFertilizingFrequency) return

                onUpdate({
                  ...plant,
                  name: newName,
                  species: newSpecies,
                  imageUrl: newImageUrl || undefined,
                  wateringFrequency: Number(newWateringFrequency),
                  fertilizingFrequency: Number(newFertilizingFrequency),
                })
              }}
              className="w-full flex items-center justify-center gap-2 bg-white text-green-600 border border-green-600 py-2 rounded-xl hover:bg-green-50 transition"
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}


