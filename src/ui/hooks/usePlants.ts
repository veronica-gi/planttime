import { useState, useEffect } from "react";
import type { Plant } from "../models/Plant";
import { plantService } from "../services/plantService";

export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    setPlants(plantService.getAll());
  }, []);

  const addPlant = (plant: Plant) => {
    plantService.add(plant);
    setPlants(plantService.getAll());
  };

  const removePlant = (id: string) => {
    plantService.remove(id);
    setPlants(plantService.getAll());
  };

  return { plants, addPlant, removePlant };
}

