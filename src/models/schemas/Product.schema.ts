import { ObjectId } from 'mongodb'

export interface ProductType {
  _id?: ObjectId
  userId: ObjectId
  title: string
  imageUrl: string
  price: number
  description: string
  created_at?: Date
  updated_at?: Date
}

export default class Product {
  _id?: ObjectId
  userId: ObjectId
  title: string
  imageUrl: string
  price: number
  description: string
  created_at: Date
  updated_at: Date

  constructor({ _id, userId, title, imageUrl, price, description, created_at, updated_at }: ProductType) {
    const date = new Date()

    this._id = _id || new ObjectId()
    this.userId = userId
    this.title = title
    this.imageUrl = imageUrl
    this.price = price
    this.description = description
    this.created_at = created_at || date
    this.updated_at = updated_at || date
  }
}
