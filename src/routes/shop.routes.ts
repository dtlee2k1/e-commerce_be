import express from 'express'
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

const shopRouter = express.Router()

shopRouter.get('/', renderIndexViewController)

shopRouter.get('/products', renderProductsViewController)

shopRouter.get('/products/:productId', renderProductDetailController)

shopRouter.get('/cart', renderCartViewController)

shopRouter.get('/orders', renderOrdersViewController)

shopRouter.post('/cart', addToCartController)

shopRouter.post('/cart-delete-item', deleteCartItemsController)

shopRouter.post('/create-order', addOrderController)

// shopRouter.get('/checkout', renderCheckoutViewController)

export default shopRouter
