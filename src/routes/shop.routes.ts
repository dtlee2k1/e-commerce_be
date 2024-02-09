import { Router } from 'express'
import {
  addOrderController,
  addToCartController,
  deleteCartItemsController,
  renderCartViewController,
  renderCheckoutViewController,
  renderIndexViewController,
  renderOrdersViewController,
  renderProductDetailController,
  renderProductsViewController
} from '~/controllers/shop.controllers'
import { protectedRouteValidator } from '~/middlewares/auth.middlewares'

const shopRouter = Router()

shopRouter.get('/', renderIndexViewController)

shopRouter.get('/products', renderProductsViewController)

shopRouter.get('/products/:productId', renderProductDetailController)

shopRouter.get('/cart', protectedRouteValidator, renderCartViewController)

shopRouter.get('/orders', protectedRouteValidator, renderOrdersViewController)

shopRouter.post('/cart', addToCartController)

shopRouter.post('/cart-delete-item', deleteCartItemsController)

shopRouter.post('/create-order', addOrderController)

shopRouter.get('/checkout', protectedRouteValidator, renderCheckoutViewController)

export default shopRouter
