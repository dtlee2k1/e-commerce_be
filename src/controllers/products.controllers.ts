import { Request, Response, NextFunction } from 'express'
import productService from '~/services/products.services'

export const renderAddProductPageController = (req: Request, res: Response, next: NextFunction) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' })
}

export const addProductController = async (req: Request, res: Response, next: NextFunction) => {
  await productService.save({ title: req.body.title })
  res.redirect('/')
}

export const renderShopPageController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await productService.fetchAll()
  res.render('shop', { pageTitle: 'Shop', path: '/', products })
}
