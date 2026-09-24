export type Category = 'All' | 'Ceramics' | 'Textiles' | 'Woodwork' | 'Objects'

export type Product = {
  id: string
  name: string
  category: Exclude<Category, 'All'>
  price: number
  description: string
  image: string
  badge?: string
  details: string[]
}
