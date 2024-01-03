import path from 'path'
import express from 'express'
import { Request, Response, NextFunction } from 'express'

const adminRouter = express.Router()

// /admin/add-product => GET
adminRouter.get('/add-product', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.resolve('src/views/add-product.html'))
})

// /admin/add-product => POST
adminRouter.post('/add-product', (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  res.redirect('/')
})

export default adminRouter
