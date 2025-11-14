import { useState, useEffect } from "react"
import { PlantForm } from "../ui/components/PlantForm"
import { PlantCard } from "../ui/components/PlantCard"
import { PlantCalendar } from "../ui/components/PlantCalendar"
import { plantService } from "../core/services/plantService"
import type { Plant } from "../core/models/Plant"
import "../ui/styles/app.css"

function App() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [view, setView] = useState<"plants" | "calendar">("plants")

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
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center mb-2">🌿 PlantTime</h1>

        {/* NAV VIEW SELECTOR */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setView("plants")}
            className={`px-4 py-2 rounded-md font-semibold ${
              view === "plants"
                ? "bg-green-600 text-white"
                : "bg-gray-300 dark:bg-zinc-700"
            }`}
          >
            Mis plantas
          </button>

          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded-md font-semibold ${
              view === "calendar"
                ? "bg-green-600 text-white"
                : "bg-gray-300 dark:bg-zinc-700"
            }`}
          >
            Calendario
          </button>
        </div>

        {/* SELECTED VIEW */}
        {view === "plants" && (
          <>
            <PlantForm onAdd={handleAddPlant} />

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
          </>
        )}

        {view === "calendar" && <PlantCalendar plants={plants} />}
      </div>
    </div>
  )
}

export default App




