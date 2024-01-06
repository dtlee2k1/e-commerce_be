import { PRODUCTS_DATA_DIR } from '~/constants/dir'
import { Product, ProductType } from '~/models/schemas/Product.schema'
import { readFileAsync, writeFileAsync } from '~/utils/file'

class ProductService {
  async save({ title }: ProductType) {
    try {
      const products: ProductType[] = await readFileAsync(PRODUCTS_DATA_DIR)
      products.push(new Product({ title }))
      await writeFileAsync(PRODUCTS_DATA_DIR, products)
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  async fetchAll() {
    return readFileAsync(PRODUCTS_DATA_DIR)
  }
}

const productService = new ProductService()
export default productService
