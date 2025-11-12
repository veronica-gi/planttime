import type { Plant } from "../../core/models/Plant"

interface PlantCalendarProps {
  plants: Plant[]
}

export function PlantCalendar({ plants }: PlantCalendarProps) {
  const today = new Date()

  // Función para calcular los días desde la última acción
  const daysSince = (date: Date) => {
    const diff = Math.floor(
      (today.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    )
    return diff
  }

  // Determinar si toca riego o fertilizante
  const getStatus = (plant: Plant) => {
    const days = daysSince(plant.lastWatered)
    const needsWater = days >= plant.wateringFrequency
    const needsFertilizer =
      plant.fertilizingFrequency && days >= plant.fertilizingFrequency

    if (needsWater && needsFertilizer) return "💧🌿 Riego y fertilizante"
    if (needsWater) return "💧 Riego"
    if (needsFertilizer) return "🌿 Fertilizante"
    return `✅ Próximo en ${Math.min(
      plant.wateringFrequency - days,
      plant.fertilizingFrequency - days
    )} días`
  }

  return (
    <div className="mt-8 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Calendario de cuidado 🌱</h2>

      {plants.length === 0 ? (
        <p className="text-gray-500">No tienes plantas registradas aún.</p>
      ) : (
        <ul className="space-y-3">
          {plants.map((plant) => (
            <li
              key={plant.id}
              className="p-3 border rounded-md flex items-center justify-between dark:border-zinc-700"
            >
              <div>
                <p className="font-medium">{plant.name}</p>
                <p className="text-sm text-gray-500">
                  Último riego: {new Date(plant.lastWatered).toLocaleDateString()}
                </p>
              </div>
              <span className="text-sm font-semibold">
                {getStatus(plant)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
