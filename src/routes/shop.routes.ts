import express from 'express'
import {
  renderCartPageController,
  renderCheckoutPageController,
  renderIndexPageController,
  renderProductsPageController
} from '~/controllers/shop.controllers'

const shopRouter = express.Router()

shopRouter.get('/', renderIndexPageController)

shopRouter.get('/products', renderProductsPageController)

shopRouter.get('/cart', renderCartPageController)

shopRouter.get('/checkout', renderCheckoutPageController)

export default shopRouter
