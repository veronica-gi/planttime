import { useState } from "react";
import { usePlants } from "../core/hooks/usePlants";
import { PlantCard } from "../ui/components/PlantCard";
import type { Plant } from "../core/models/Plant";
import "../ui/styles/app.css";

function App() {
  const { plants, addPlant, removePlant } = usePlants();
  const [name, setName] = useState("");

  const handleAdd = () => {
  if (!name.trim()) return;
  
  const newPlant: Plant = {
    id: crypto.randomUUID(),
    name,
    species: "",
    lastWatered: new Date(),
    wateringFrequency: 3, // valor por defecto (ej. cada 3 días)
    notes: "",
    imageUrl: ""
  };

  addPlant(newPlant);
  setName("");
};


  return (
    <div className="app">
      <h1>🌿 PlantTime</h1>

      <div className="add-plant">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la planta"
        />
        <button onClick={handleAdd}>Agregar</button>
      </div>

      <div className="plant-list">
        {plants.length === 0 ? (
          <p>No tienes plantas registradas aún.</p>
        ) : (
          plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} onDelete={removePlant} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;

