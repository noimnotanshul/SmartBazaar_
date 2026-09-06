export type Product = {
  id: string
  name: string
  brand?: string | null
  price: number
  mrp?: number | null
  floor_price: number
  category?: string | null
  images?: string[] | null
  stock: number
  rating?: number | null
  review_count?: number | null
  approved?: boolean
}
