// import { omit } from 'lodash'
// import databaseService from './database.services'
// import { ObjectId } from 'mongodb'
// import { UserReqBody } from '~/models/requests/User.requests'
// import Order from '~/models/schemas/Order.schema'
// import { ProductType } from '~/models/schemas/Product.schema'
// import User from '~/models/schemas/User.schema'

// class UserService {
//   async save(payload: UserReqBody) {
//     await databaseService.users.insertOne(new User({ ...payload }))
//   }

//   async findById(userId: string) {
//     const user = await databaseService.users.findOne({ _id: new ObjectId(userId) })

//     if (!user) throw new Error('User not found')

//     return user
//   }

//   async getCart(userId: string) {
//     const user = await this.findById(userId)
//     const productIds = user.cart.map((item) => item.productId)

//     const cartProducts = await databaseService.products.find({ _id: { $in: productIds } }).toArray()

//     const cartItems = cartProducts.map((product) => ({
//       ...omit(product, ['created_at', 'updated_at']),
//       quantity: user.cart.find((item) => item.productId.equals(product._id))?.quantity || 0
//     }))

//     return cartItems
//   }

//   async addToCart(userId: string, product: ProductType) {
//     const user = await this.findById(userId)

//     const cartProductIndex = user.cart.findIndex((item) => item.productId.equals(product._id))
//     const updatedCartItems = [...user.cart]
//     let newQuantity = 1

//     if (cartProductIndex !== -1) {
//       newQuantity = user.cart[cartProductIndex].quantity + 1
//       updatedCartItems[cartProductIndex].quantity = newQuantity
//     } else {
//       updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity })
//     }

//     await databaseService.users.updateOne(
//       { _id: new ObjectId(userId) },
//       {
//         $set: {
//           cart: updatedCartItems
//         }
//       }
//     )
//   }

//   async deleteCartItem(userId: string, product: ProductType) {
//     const user = await this.findById(userId)

//     const updatedCartItems = user.cart.filter((item) => !item.productId.equals(product._id))

//     await databaseService.users.updateOne(
//       { _id: new ObjectId(userId) },
//       {
//         $set: {
//           cart: updatedCartItems
//         }
//       }
//     )
//   }

//   async getOrders(userId: ObjectId) {
//     const orders = await databaseService.orders.find({ 'user._id': userId }).toArray()
//     return orders
//   }

//   async addOrder(userId: string) {
//     const user = await this.findById(userId)
//     const orderItems = await this.getCart(userId)

//     await Promise.all([
//       databaseService.orders.insertOne(
//         new Order({
//           user: {
//             _id: new ObjectId(userId),
//             username: user.username
//           },
//           items: orderItems
//         })
//       ),
//       databaseService.users.updateOne(
//         { _id: new ObjectId(userId) },
//         {
//           $set: {
//             cart: []
//           }
//         }
//       )
//     ])
//   }
// }

// const userService = new UserService()
// export default userService
