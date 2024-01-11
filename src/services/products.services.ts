import { PRODUCTS_DATA_DIR } from '~/constants/dir'
import { Product, ProductType } from '~/models/schemas/Product.schema'
import { readFileAsync, writeFileAsync } from '~/utils/file'
import cartService from './cart.services'

class ProductService {
  async save(payload: ProductType) {
    try {
      const products: ProductType[] = await readFileAsync(PRODUCTS_DATA_DIR)

      if (payload.id) {
        const productIndex = products.findIndex((product) => product.id === payload.id)

        if (productIndex !== -1) {
          const deltaPrice = payload.price - products[productIndex].price
          products[productIndex] = payload

          if (deltaPrice !== 0) {
            await cartService.updateProduct(payload.id, deltaPrice)
          }
        }
      } else {
        products.push(new Product(payload))
      }
      await writeFileAsync(PRODUCTS_DATA_DIR, products)
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  async fetchAll() {
    return (await readFileAsync(PRODUCTS_DATA_DIR)) as ProductType[]
  }

  async findById(id: string) {
    const products: ProductType[] = await readFileAsync(PRODUCTS_DATA_DIR)
    const foundProduct = products.find((product) => product.id === id)
    if (!foundProduct) {
      throw new Error('Product not found')
    }
    return foundProduct
  }

  async deleteById(id: string) {
    try {
      const products: ProductType[] = await readFileAsync(PRODUCTS_DATA_DIR)
      const product = products.find((product) => product.id === id)
      const updatedProducts = products.filter((product) => product.id !== id)

      if (product) {
        await Promise.all([
          cartService.deleteProduct(id, product.price),
          writeFileAsync(PRODUCTS_DATA_DIR, updatedProducts)
        ])
      }
    } catch (error) {
      console.error('Error delete product:', error)
    }
  }
}

const productService = new ProductService()
export default productService
