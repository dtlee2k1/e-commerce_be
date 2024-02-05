import { Model, ObjectId, Schema, Types, model } from 'mongoose'
import { ProductType } from './Product.schema'

interface OrderItem {
  product: ProductType
  quantity: number
}

export interface OrderType {
  _id: ObjectId
  userId: ObjectId
  products: OrderItem[]
  created_at?: Date
}

const orderSchema = new Schema<OrderType>(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: {
          type: Object,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    created_at: {
      type: Date,
      default: new Date()
    }
  },
  { versionKey: false }
)

const Order = model('Order', orderSchema)
export default Order
