import { PlantCard } from "../ui/components/PlantCard"
import type { Plant } from "../core/models/Plant"
import "../ui/styles/app.css"

function App() {
  const plants: Plant[] = [] // inicialmente vacío

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Mis Plantas</h1>

      {plants.length === 0 ? (
        <p>No tienes plantas registradas.</p>
      ) : (
        plants.map(plant => <PlantCard key={plant.id} plant={plant} />)
      )}
    </main>
  )
}

export default App
