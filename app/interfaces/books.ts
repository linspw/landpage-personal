
export type BookStatus = 'read' | 'reading' | 'queued' | 'wishlist'

export interface Book {
  title: string
  author: string
  themes: string[]
  rating?: number // Nota de 0 a 10 (ex: 9.5)
  readDate?: string // Format: "YYYY-MM" (e.g., "2025-12")
  favorite?: boolean
  status?: BookStatus // 'read' = lido, 'reading' = lendo, 'queued' = na fila
}
