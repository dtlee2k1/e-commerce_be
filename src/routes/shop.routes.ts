import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { products } from './admin.routes'

const shopRouter = express.Router()

shopRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('shop', { pageTitle: 'Shop', path: '/', products })
})

export default shopRouter
