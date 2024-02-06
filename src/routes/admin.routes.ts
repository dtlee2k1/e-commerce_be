import { Router } from 'express'
import {
  addProductController,
  deleteProductController,
  editProductController,
  renderAddProductViewController,
  renderAdminProductsViewController,
  renderEditProductViewController
} from '~/controllers/admin.controllers'

const adminRouter = Router()

// /admin/add-product => GET
adminRouter.get('/add-product', renderAddProductViewController)

// // /admin/products => GET
adminRouter.get('/products', renderAdminProductsViewController)

// /admin/add-product => POST
adminRouter.post('/add-product', addProductController)

// // /admin/edit-product/:productId => GET
adminRouter.get('/edit-product/:productId', renderEditProductViewController)

// /admin/add-product => POST
adminRouter.post('/edit-product', editProductController)

// // /admin/add-product => DELETE
adminRouter.post('/delete-product/:productId', deleteProductController)

export default adminRouter
