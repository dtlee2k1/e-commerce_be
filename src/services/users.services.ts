import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import { UserReqBody } from '~/models/requests/User.requests'
import { ProductType } from '~/models/schemas/Product.schema'
import User from '~/models/schemas/User.schema'

class UserService {
  async save(payload: UserReqBody) {
    await databaseService.users.insertOne(new User({ ...payload }))
  }

  async findById(userId: string) {
    const user = await databaseService.users.findOne({ _id: new ObjectId(userId) })

    if (!user) throw new Error('User not found')

    return user
  }

  async getCart(userId: string) {
    const user = await this.findById(userId)
    const productIds = user.cart.map((item) => item.productId)

    const cartProducts = await databaseService.products.find({ _id: { $in: productIds } }).toArray()

    const cartItems = cartProducts.map((product) => ({
      ...product,
      quantity: user.cart.find((item) => item.productId.equals(product._id))?.quantity
    }))

    return cartItems
  }

  async addToCart(userId: string, product: ProductType) {
    const user = await this.findById(userId)

    const cartProductIndex = user.cart.findIndex((item) => item.productId.equals(product._id))
    const updatedCartItems = [...user.cart]
    let newQuantity = 1

    if (cartProductIndex !== -1) {
      newQuantity = user.cart[cartProductIndex].quantity + 1
      updatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
      updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity })
    }

    await databaseService.users.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          cart: updatedCartItems
        }
      }
    )
  }

  async deleteCartItem(userId: string, product: ProductType) {
    const user = await this.findById(userId)

    const updatedCartItems = user.cart.filter((item) => !item.productId.equals(product._id))

    await databaseService.users.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          cart: updatedCartItems
        }
      }
    )
  }
}

const userService = new UserService()
export default userService
