import { ObjectId, Schema, model, Types } from 'mongoose'

export interface ProductType {
  _id: ObjectId
  userId: ObjectId
  title: string
  imageUrl: string
  price: number
  description: string
  created_at?: Date
  updated_at?: Date
}

const productSchema = new Schema<ProductType>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      require: true
    },
    imageUrl: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    created_at: {
      type: Date,
      default: new Date()
    },
    updated_at: {
      type: Date,
      default: new Date()
    }
  },
  { versionKey: false }
)

const Product = model('Product', productSchema)
export default Product
