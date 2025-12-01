import { useState } from "react"

export function useImagePreview() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null
    setFile(selected)

    if (selected) {
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(selected)
    } else {
      setPreview(null)
    }
  }

  const reset = () => {
    setFile(null)
    setPreview(null)
  }

  return { file, preview, handleChange, reset }
}

