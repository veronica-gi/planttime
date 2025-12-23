import { useState} from "react";
import type { Plant } from "../../core/models/Plant";
import { plantService } from "../../core/services/plantService";

export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>(plantService.getAll());


  const addPlant = (plant: Plant) => {
    plantService.add(plant);
    setPlants(plantService.getAll());
  };

  const removePlant = (id: string) => {
    plantService.remove(id);
    setPlants(plantService.getAll());
  };

  const updatePlant = (plant: Plant) => {
    plantService.update(plant);  
    setPlants(plantService.getAll());
  };

  return { plants, addPlant, removePlant, updatePlant };
}

