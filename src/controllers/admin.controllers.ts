import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ProductReqBody } from '~/models/requests/Product.requests'
import productService from '~/services/products.services'

export const renderAdminViewController = (req: Request, res: Response, next: NextFunction) => {
  res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' })
}

export const renderAdminProductsViewController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await productService.fetchAll()
  res.render('admin/products', { pageTitle: 'Admin Products', path: '/admin/products', products })
}

export const addProductController = async (
  req: Request<ParamsDictionary, any, ProductReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { title, imageUrl, price, description } = req.body
  await productService.save({ title, imageUrl, price: Number(price), description })
  res.redirect('/')
}
