import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ProductReqBody } from '~/models/requests/Product.requests'
import Product from '~/models/schemas/Product.schema'
import { UserType } from '~/models/schemas/User.schema'

export const renderAdminProductsViewController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await Product.find({})
  res.render('admin/products', {
    pageTitle: 'Admin Products',
    path: '/admin/products',
    products,
    isAuthenticated: req.session.isLoggedIn
  })
}

export const renderAddProductViewController = (req: Request, res: Response, next: NextFunction) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  })
}

export const renderEditProductViewController = async (req: Request, res: Response, next: NextFunction) => {
  const editMode = req.query.edit
  const { productId } = req.params
  const product = await Product.findById(productId)

  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: JSON.parse(editMode as string),
    product,
    isAuthenticated: req.session.isLoggedIn
  })
}

export const addProductController = async (
  req: Request<ParamsDictionary, any, ProductReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { title, imageUrl, price, description } = req.body
  const { _id: userId } = req.user as UserType
  const product = new Product({ title, imageUrl, price, description, userId })
  await product.save()

  res.redirect('/')
}

export const editProductController = async (
  req: Request<ParamsDictionary, any, ProductReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { productId, title, imageUrl, price, description } = req.body
  await Product.findByIdAndUpdate(productId, { title, imageUrl, price, description })

  res.redirect('/admin/products')
}

export const deleteProductController = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params
  await Product.deleteOne({ _id: productId })
  res.redirect('/admin/products')
}
