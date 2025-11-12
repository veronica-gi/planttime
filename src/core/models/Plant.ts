export interface Plant {
  id: string
  name: string
  species?: string
  lastWatered: Date
  wateringFrequency: number // en días
  lastFertilized?: Date
  fertilizingFrequency: number
  notes?: string
  imageUrl?: string
}

