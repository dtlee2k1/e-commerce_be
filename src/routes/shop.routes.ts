import express from 'express'
import { renderShopPageController } from '~/controllers/products.controllers'

const shopRouter = express.Router()

shopRouter.get('/', renderShopPageController)
export default shopRouter
