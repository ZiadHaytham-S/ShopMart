import { CategoryI } from "./categories"
import { SubcategoryI } from "./subcategories"

export interface ProductI {
  sold: number
  images: string[]
  subcategory: SubcategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  availableColors: unknown[]
  imageCover: string
  category: CategoryI
  brand: CategoryI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}