import { PRODUCTS_DATA_DIR } from '~/constants/dir'
import { Product, ProductType } from '~/models/schemas/Product.schema'
import { readFileAsync, writeFileAsync } from '~/utils/file'

class ProductService {
  async save(payload: ProductType) {
    try {
      const products: ProductType[] = await readFileAsync(PRODUCTS_DATA_DIR)
      products.push(new Product(payload))
      await writeFileAsync(PRODUCTS_DATA_DIR, products)
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  async fetchAll() {
    return readFileAsync(PRODUCTS_DATA_DIR)
  }

  async findById(id: string) {
    const products: ProductType[] = await readFileAsync(PRODUCTS_DATA_DIR)
    const foundProduct = products.find((product) => product.id === id)
    return foundProduct
  }
}

const productService = new ProductService()
export default productService
