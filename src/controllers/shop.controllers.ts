import { Request, Response, NextFunction } from 'express'
import productService from '~/services/products.services'

export const renderProductsPageController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await productService.fetchAll()
  res.render('shop/product-list', { pageTitle: 'All products', path: '/products', products })
}

export const renderIndexPageController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await productService.fetchAll()
  res.render('shop/index', { pageTitle: 'Shop', path: '/', products })
}

export const renderCartPageController = async (req: Request, res: Response, next: NextFunction) => {
  res.render('shop/cart', { pageTitle: 'Cart', path: '/cart' })
}

export const renderCheckoutPageController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await productService.fetchAll()
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout', products })
}
