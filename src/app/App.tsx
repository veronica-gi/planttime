import { useState, useEffect } from "react"
import { PlantForm } from "../ui/components/PlantForm"
import { PlantCard } from "../ui/components/PlantCard"
import { PlantCalendar } from "../ui/components/PlantCalendar" // 👈 nuevo import
import { plantService } from "../core/services/plantService"
import type { Plant } from "../core/models/Plant"
import "../ui/styles/app.css"

function App() {
  const [plants, setPlants] = useState<Plant[]>([])

  useEffect(() => {
    setPlants(plantService.getAll())
  }, [])

  const handleAddPlant = (plant: Plant) => {
    setPlants((prev) => [...prev, plant])
  }

  const handleDeletePlant = (id: string) => {
    plantService.remove(id)
    setPlants((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-4">🌿 PlantTime</h1>

        {/* Formulario para registrar nuevas plantas */}
        <PlantForm onAdd={handleAddPlant} />

        {/* Lista de plantas registradas */}
        <div className="grid gap-4 mt-6">
          {plants.length === 0 ? (
            <p className="text-center text-gray-500">
              No tienes plantas registradas aún.
            </p>
          ) : (
            plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onDelete={handleDeletePlant}
              />
            ))
          )}
        </div>

        {/* Calendario de cuidados */}
        <PlantCalendar plants={plants} /> 
      </div>
    </div>
  )
}

export default App



