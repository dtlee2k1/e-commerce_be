import { Request, Response, NextFunction } from 'express'
export const products: any = []

export const renderShopPageController = (req: Request, res: Response, next: NextFunction) => {
  res.render('shop', { pageTitle: 'Shop', path: '/', products })
}

export const renderAddProductPageController = (req: Request, res: Response, next: NextFunction) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' })
}

export const addProductController = (req: Request, res: Response, next: NextFunction) => {
  products.push({ title: req.body.title })
  res.redirect('/')
}
