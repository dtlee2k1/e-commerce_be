export interface ProductType {
  title: string
}

export class Product {
  title: string

  constructor({ title }: ProductType) {
    this.title = title
  }
}
