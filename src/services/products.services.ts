// import databaseService from './database.services'
// import Product, { ProductType } from '~/models/schemas/Product.schema'
// import { ObjectId } from 'mongodb'

// class ProductService {
//   async save(payload: ProductType) {
//     const { _id, ...productData } = payload

//     if (_id) {
//       await databaseService.products.updateOne(
//         { _id },
//         {
//           $set: {
//             ...productData
//           },
//           $currentDate: {
//             updated_at: true
//           }
//         }
//       )
//     } else await databaseService.products.insertOne(new Product({ ...productData }))
//   }

//   async fetchAll() {
//     const products = await databaseService.products.find({}).toArray()
//     return products
//   }

//   async findById(id: string) {
//     const product = await databaseService.products.findOne({ _id: new ObjectId(id) })
//     if (!product) throw new Error('Product not found')
//     return product
//   }

//   async deleteById(id: string) {
//     try {
//       await Promise.all([
//         databaseService.products.deleteOne({ _id: new ObjectId(id) }),
//         databaseService.users.updateMany(
//           { 'cart.productId': new ObjectId(id) },
//           {
//             $pull: {
//               cart: {
//                 productId: new ObjectId(id)
//               }
//             }
//           }
//         )
//       ])
//     } catch (error) {
//       console.error('Error delete product:', error)
//     }
//   }
// }

// const productService = new ProductService()
// export default productService
