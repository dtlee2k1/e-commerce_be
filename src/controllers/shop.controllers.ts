import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import { ProductReqParams } from '~/models/requests/Product.requests'
import User from '~/models/schemas/User.schema'
import productService from '~/services/products.services'
import userService from '~/services/users.services'

export const renderIndexViewController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await productService.fetchAll()
  res.render('shop/index', { pageTitle: 'Shop', path: '/', products })
}

export const renderProductsViewController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await productService.fetchAll()
  res.render('shop/product-list', { pageTitle: 'All products', path: '/products', products })
}

export const renderProductDetailController = async (
  req: Request<ProductReqParams>,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params
  const product = await productService.findById(productId)
  res.render('shop/product-detail', { pageTitle: 'Product detail', path: '/products', product })
}

export const renderCartViewController = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user as User
  const products = await userService.getCart((_id as ObjectId).toString())

  res.render('shop/cart', { pageTitle: 'Cart', path: '/cart', products })
}

export const renderOrdersViewController = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user as User
  const orders = await userService.getOrders(_id as ObjectId)
  res.render('shop/orders', { pageTitle: 'Checkout', path: '/orders', orders })
}

export const renderCheckoutViewController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await productService.fetchAll()
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout', products })
}

export const addToCartController = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body
  const { _id } = req.user as User

  const product = await productService.findById(productId)
  await userService.addToCart((_id as ObjectId).toString(), product)

  res.redirect('/cart')
}

export const deleteCartItemsController = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body
  const { _id } = req.user as User
  const product = await productService.findById(productId)
  await userService.deleteCartItem((_id as ObjectId).toString(), product)
  res.redirect('/cart')
}

export const addOrderController = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user as User

  await userService.addOrder((_id as ObjectId).toString())

  res.redirect('/cart')
}
