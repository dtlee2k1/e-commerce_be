export interface ProductInCart {
  id: string
  quantity: number
}

interface CartType {
  products: ProductInCart[]
  totalPrice: number
}

export class Cart {
  products: ProductInCart[]
  totalPrice: number
  constructor({ products, totalPrice }: CartType) {
    this.products = products
    this.totalPrice = totalPrice
  }
}
