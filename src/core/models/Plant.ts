export interface Plant {
  id: string
  name: string
  species?: string
  lastWatered: Date
  wateringFrequency: number // en días
  notes?: string
  imageUrl?: string
}
