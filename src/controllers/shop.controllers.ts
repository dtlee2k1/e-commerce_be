import { Request, Response, NextFunction } from 'express'
import { ProductReqParams } from '~/models/requests/Product.requests'
import productService from '~/services/products.services'

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

export const renderCartViewController = (req: Request, res: Response, next: NextFunction) => {
  res.render('shop/cart', { pageTitle: 'Cart', path: '/cart' })
}

export const renderCheckoutViewController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await productService.fetchAll()
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout', products })
}

export const addToCartController = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body
  res.redirect('/cart')
}
