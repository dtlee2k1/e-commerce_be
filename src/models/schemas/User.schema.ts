import { Model, ObjectId, Schema, Types, model } from 'mongoose'
import { ProductType } from './Product.schema'
import { Document } from 'mongoose'

interface CartItemType {
  productId: ObjectId
  quantity: number
}

export interface UserType extends Document {
  _id?: ObjectId
  username: string
  email: string
  password: string
  cart: {
    items: CartItemType[]
  }
  created_at?: Date
  updated_at?: Date
}
interface IUserMethods {
  addToCart(product: ProductType): Promise<this>
  deleteCartItem(productId: ObjectId): Promise<this>
  clearCart(): Promise<this>
}

export type UserModel = Model<UserType, unknown, IUserMethods>

const userSchema = new Schema<UserType, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    cart: {
      items: [
        {
          productId: { type: Types.ObjectId, ref: 'Product', required: true },
          quantity: { type: Number, required: true }
        }
      ]
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

userSchema.method('addToCart', async function addToCart(product: ProductType) {
  const cartProductIndex = this.cart.items.findIndex((item) => String(item.productId) === String(product._id))

  if (cartProductIndex !== -1) {
    this.cart.items[cartProductIndex].quantity += 1
  } else {
    this.cart.items.push({ productId: product._id, quantity: 1 })
  }

  return this.save()
})

userSchema.method('deleteCartItem', async function deleteCartItem(productId: ObjectId) {
  const updatedCartItems = this.cart.items.filter((item) => String(item.productId) !== String(productId))
  this.cart.items = updatedCartItems

  return this.save()
})

const User = model('User', userSchema)
export default User
