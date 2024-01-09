import { CART_DATA_DIR } from '~/constants/dir'
import { readFileAsync, writeFileAsync } from '~/utils/file'
import { Cart, ProductInCart } from '~/models/schemas/Cart.schema'

class CartService {
  async addProduct(id: string, productPrice: number) {
    try {
      const cart: Cart = await readFileAsync(CART_DATA_DIR, new Cart({ products: [], totalPrice: 0 }))
      const existingProductIndex = cart.products.findIndex((product) => product.id === id)

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1
      } else {
        const newProduct: ProductInCart = { id, quantity: 1 }
        cart.products.push(newProduct)
      }

      cart.totalPrice += productPrice

      await writeFileAsync(CART_DATA_DIR, cart)
    } catch (error) {
      console.error('Error adding product to cart:', error)
    }
  }
}

const cartService = new CartService()
export default cartService
