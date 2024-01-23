import { ObjectId } from 'mongodb'
import { ProductType } from './Product.schema'

interface CartItemType {
  productId: ObjectId
  quantity: number
}

interface UserType {
  _id?: ObjectId
  username: string
  email: string
  cart?: CartItemType[]
  created_at?: Date
  updated_at?: Date
}

export default class User {
  _id?: ObjectId
  username: string
  email: string
  cart: CartItemType[]
  created_at: Date
  updated_at: Date

  constructor({ _id, username, email, cart, created_at, updated_at }: UserType) {
    const date = new Date()

    this._id = _id
    this.username = username
    this.email = email
    this.cart = cart || []
    this.created_at = created_at || date
    this.updated_at = updated_at || date
  }
}
