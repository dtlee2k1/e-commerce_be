import express from 'express'
import {
  addProductController,
  renderAdminPageController,
  renderAdminProductsPageController
} from '~/controllers/admin.controllers'

const adminRouter = express.Router()

// /admin/add-product => GET
adminRouter.get('/add-product', renderAdminPageController)

// /admin/products => GET
adminRouter.get('/products', renderAdminProductsPageController)

// /admin/add-product => POST
adminRouter.post('/add-product', addProductController)
export default adminRouter
