import express from 'express'
import {
  addToCartController,
  renderCartViewController,
  renderCheckoutViewController,
  renderIndexViewController,
  renderProductDetailController,
  renderProductsViewController
} from '~/controllers/shop.controllers'

const shopRouter = express.Router()

shopRouter.get('/', renderIndexViewController)

shopRouter.get('/products', renderProductsViewController)

shopRouter.get('/products/:productId', renderProductDetailController)

shopRouter.get('/cart', renderCartViewController)

shopRouter.post('/cart', addToCartController)

shopRouter.get('/checkout', renderCheckoutViewController)

export default shopRouter
