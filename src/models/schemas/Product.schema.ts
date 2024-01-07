export interface ProductType {
  title: string
  imageUrl: string
  price: number
  description: string
}

export class Product {
  title: string
  imageUrl: string
  price: number
  description: string

  constructor({ title, imageUrl, price, description }: ProductType) {
    this.title = title
    this.imageUrl = imageUrl
    this.price = price
    this.description = description
  }
}
