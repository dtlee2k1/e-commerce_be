import express from 'express'
import { Request, Response, NextFunction } from 'express'

const adminRouter = express.Router()

// /admin/add-product => GET
adminRouter.get('/add-product', (req: Request, res: Response, next: NextFunction) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' })
})

export const products: any = []

// /admin/add-product => POST
adminRouter.post('/add-product', (req: Request, res: Response, next: NextFunction) => {
  products.push({ title: req.body.title })
  res.redirect('/')
})
export default adminRouter
