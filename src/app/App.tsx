import { useState, useEffect } from "react"
import { PlantForm } from "../ui/components/PlantForm"
import { PlantCard } from "../ui/components/PlantCard"
import { PlantCalendar } from "../ui/components/PlantCalendar"
import { plantService } from "../core/services/plantService"
import type { Plant } from "../core/models/Plant"



function App() {
  const [plants, setPlants] = useState<Plant[]>(() => plantService.getAll())
  const [view, setView] = useState<"plants" | "calendar">("plants")

  const handleAddPlant = (plant: Plant) => {
    const updated = [...plants, plant]
    setPlants(updated)
    plantService.saveAll(updated)
  }

  const handleDeletePlant = (id: string) => {
    const updated = plants.filter(p => p.id !== id)
    setPlants(updated)
    plantService.saveAll(updated)
  }

  return (
    
    <div className="min-h-screen bg-green-100 dark:bg-zinc-900 text-gray-900 dark:text-white p-6 flex justify-center">
      <div className="w-full max-w-none space-y-6">

        <h1 className="text-3xl font-bold text-center">🌿 PlanTime 🌿</h1>

        {/* NAV VIEW SELECTOR */}
        <div className="flex justify-center gap-4 mb-6">
          {["plants", "calendar"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as "plants" | "calendar")}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                view === v
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400 dark:hover:bg-zinc-600"
              }`}
            >
              {v === "plants" ? "Mis plantas" : "Calendario"}
            </button>
          ))}
        </div>

        {/* SELECTED VIEW */}
        {view === "plants" && (
          <div className="flex flex-col items-center">
            <PlantForm onAdd={handleAddPlant} />

            <div className="grid gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3 justify-center">
              {plants.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
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
          </div>
        )}

        {view === "calendar" && (
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
            <PlantCalendar plants={plants} />
          </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App






