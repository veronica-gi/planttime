import type { Plant } from "../models/Plant"

const STORAGE_KEY = "plants"

export const plantService = {
  getAll(): Plant[] {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  },

  saveAll(plants: Plant[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants))
  },

  add(plant: Plant) {
    const plants = this.getAll()
    plants.push(plant)
    this.saveAll(plants)
  },

  remove(id: string) {
    const plants = this.getAll().filter((p) => p.id !== id)
    this.saveAll(plants)
  },
}
