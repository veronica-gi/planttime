import { useState } from "react"
import type { Plant } from "../../core/models/Plant"

interface PlantCalendarProps {
  plants: Plant[]
}

interface CalendarEvent {
  date: Date
  type: "Riego" | "Fertilización"
  plant: Plant
}

export function PlantCalendar({ plants }: PlantCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startWeekDay = (firstDayOfMonth.getDay() + 6) % 7 // lunes=0

  const handlePrevMonth = () => setCurrentMonth(new Date(year, month - 1, 1))
  const handleNextMonth = () => setCurrentMonth(new Date(year, month + 1, 1))

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()

  // Construir semanas completas (7 días cada una)
  const weeks: (Date | null)[][] = []
  let currentDay = 1 - startWeekDay
  while (currentDay <= daysInMonth) {
    const week: (Date | null)[] = []
    for (let i = 0; i < 7; i++) {
      if (currentDay > 0 && currentDay <= daysInMonth) {
        week.push(new Date(year, month, currentDay))
      } else {
        week.push(null)
      }
      currentDay++
    }
    weeks.push(week)
  }

  // Generar eventos de riego y fertilización
  const events: CalendarEvent[] = []
  plants.forEach((plant) => {
    const startDate = new Date(plant.lastWatered)

    // Riego
    if (plant.wateringFrequency) {
      let next = new Date(startDate)
      while (next <= lastDayOfMonth) {
        if (next.getMonth() === month) events.push({ date: new Date(next), type: "Riego", plant })
        next.setDate(next.getDate() + plant.wateringFrequency)
      }
    }

    // Fertilización
    if (plant.fertilizingFrequency) {
      let next = new Date(startDate)
      while (next <= lastDayOfMonth) {
        if (next.getMonth() === month) events.push({ date: new Date(next), type: "Fertilización", plant })
        next.setDate(next.getDate() + plant.fertilizingFrequency)
      }
    }
  })

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md">
      {/* Cabecera del mes */}
      <div className="flex justify-between items-center mb-3">
        <button onClick={handlePrevMonth} className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 rounded-md">←</button>
        <h2 className="text-xl font-semibold">{currentMonth.toLocaleString("es-ES", { month: "long", year: "numeric" })}</h2>
        <button onClick={handleNextMonth} className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 rounded-md">→</button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-sm text-gray-500 mb-2">
        {["L", "M", "X", "J", "V", "S", "D"].map((d) => <div key={d}>{d}</div>)}
      </div>

      {/* Semanas */}
      <div className="grid grid-cols-7 gap-1">
        {weeks.map((week, wi) =>
          week.map((day, di) => {
            const dayEvents = day ? events.filter(ev => isSameDay(ev.date, day)) : []
            return (
              <div
                key={`${wi}-${di}`}
                className="border border-gray-200 dark:border-zinc-700 rounded-md min-h-[80px] p-1 text-sm relative bg-gray-50 dark:bg-zinc-900"
              >
                {day && (
                  <>
                    <div className="absolute top-1 right-1 text-xs text-gray-400">{day.getDate()}</div>
                    <div className="mt-4 space-y-1">
                      {dayEvents.map((ev, i) => (
                        <div
                          key={i}
                          className={`text-xs px-1 py-0.5 rounded ${
                            ev.type === "Riego"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          }`}
                        >
                          {ev.type} ({ev.plant.name})
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}





