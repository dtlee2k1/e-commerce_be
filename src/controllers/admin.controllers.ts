import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { ProductReqBody } from '~/models/requests/Product.requests'
import User from '~/models/schemas/User.schema'
import productService from '~/services/products.services'

export const renderAdminProductsViewController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await productService.fetchAll()
  res.render('admin/products', { pageTitle: 'Admin Products', path: '/admin/products', products })
}

export const renderAddProductViewController = (req: Request, res: Response, next: NextFunction) => {
  res.render('admin/edit-product', { pageTitle: 'Add Product', path: '/admin/add-product', editing: false })
}

export const renderEditProductViewController = async (req: Request, res: Response, next: NextFunction) => {
  const editMode = req.query.edit
  const { productId } = req.params
  const product = await productService.findById(productId)

  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: JSON.parse(editMode as string),
    product
  })
}

export const addProductController = async (
  req: Request<ParamsDictionary, any, ProductReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { title, imageUrl, price, description } = req.body
  const { _id: userId } = req.user as User
  await productService.save({ title, imageUrl, price: +price, description, userId: userId as ObjectId })
  res.redirect('/')
}

export const editProductController = async (
  req: Request<ParamsDictionary, any, ProductReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { productId, title, imageUrl, price, description } = req.body
  const { _id: userId } = req.user as User

  await productService.save({
    _id: new ObjectId(productId),
    title,
    imageUrl,
    price: +price,
    description,
    userId: userId as ObjectId
  })

  res.redirect('/admin/products')
}

export const deleteProductController = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params
  await productService.deleteById(productId)
  res.redirect('/admin/products')
}
