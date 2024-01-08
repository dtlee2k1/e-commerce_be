export interface ProductType {
  id?: string
  title: string
  imageUrl: string
  price: number
  description: string
}

export class Product {
  id: string
  title: string
  imageUrl: string
  price: number
  description: string

  constructor({ title, imageUrl, price, description }: ProductType) {
    this.id = Date.now().toString()
    this.title = title
    this.imageUrl = imageUrl
    this.price = price
    this.description = description
  }
}
