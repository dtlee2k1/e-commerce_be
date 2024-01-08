import express from 'express'
import {
  addProductController,
  renderAdminViewController,
  renderAdminProductsViewController
} from '~/controllers/admin.controllers'

const adminRouter = express.Router()

// /admin/add-product => GET
adminRouter.get('/add-product', renderAdminViewController)

// /admin/products => GET
adminRouter.get('/products', renderAdminProductsViewController)

// /admin/add-product => POST
adminRouter.post('/add-product', addProductController)
export default adminRouter
