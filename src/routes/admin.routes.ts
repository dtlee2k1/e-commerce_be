import express from 'express'
import { addProductController, renderAddProductPageController } from '~/controllers/products.controllers'

const adminRouter = express.Router()

// /admin/add-product => GET
adminRouter.get('/add-product', renderAddProductPageController)

// /admin/add-product => POST
adminRouter.post('/add-product', addProductController)
export default adminRouter
