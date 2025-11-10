import type { Plant } from "../../core/models/Plant"

interface PlantCardProps {
  plant: Plant
  onDelete?: (id: string) => void
}

export function PlantCard({ plant, onDelete }: PlantCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-zinc-800">
      {plant.imageUrl && (
        <img
          src={plant.imageUrl}
          alt={plant.name}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
      )}
      <h3 className="text-lg font-semibold">{plant.name}</h3>
      <p className="text-sm text-gray-500">
        Último riego: {new Date(plant.lastWatered).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500">
        Frecuencia: cada {plant.wateringFrequency} días
      </p>
      {onDelete && (
        <button
          onClick={() => onDelete(plant.id)}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Eliminar
        </button>
      )}
    </div>
  )
}
