import { ObjectId } from 'mongodb'

interface OrderItem {
  _id: ObjectId
  quantity: number
  userId: ObjectId
  title: string
  imageUrl: string
  price: number
  description: string
}

interface User {
  _id: ObjectId
  username: string
}

interface OrderType {
  _id?: ObjectId
  user: User
  items: OrderItem[]
  created_at?: Date
}

export default class Order {
  _id?: ObjectId
  user: User
  items: OrderItem[]
  created_at: Date

  constructor({ _id, user, items, created_at }: OrderType) {
    const date = new Date()

    this._id = _id
    this.user = user
    this.items = items
    this.created_at = created_at || date
  }
}
