import type { Plant } from "../../core/models/Plant"

interface PlantCardProps {
  plant: Plant
  onDelete?: (id: string) => void
}

export function PlantCard({ plant, onDelete }: PlantCardProps) {
  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString()

  return (
    <div className="p-4 border rounded-xl shadow-md bg-white dark:bg-zinc-800 hover:shadow-lg transition">
      
      {/* Imagen */}
      {plant.imageUrl ? (
        <img
          src={plant.imageUrl}
          alt={plant.name}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 dark:bg-zinc-700 rounded-lg mb-3 flex items-center justify-center text-gray-500">
          Sin imagen
        </div>
      )}

      {/* Nombre */}
      <h3 className="text-xl font-bold">{plant.name}</h3>

      {/* Especie */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span className="font-medium">Especie:</span> {plant.species}
      </p>

      {/* Último riego */}
      <p className="text-sm text-gray-700 dark:text-gray-300">
        🌧️ Último riego: {formatDate(plant.lastWatered)}
      </p>

      {/* Frecuencia de riego */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
        💧 Riego cada {plant.wateringFrequency} días
      </p>

      {/* Fertilización (opcional) */}
      {plant.fertilizingFrequency && (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          🌱 Fertilización cada {plant.fertilizingFrequency} días
        </p>
      )}

      {/* Botón eliminar */}
      {onDelete && (
        <button
          onClick={() => onDelete(plant.id)}
          className="mt-3 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition w-full"
        >
          Eliminar
        </button>
      )}
    </div>
  )
}


