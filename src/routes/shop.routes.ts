import path from 'path'
import express from 'express'
import { Request, Response, NextFunction } from 'express'

const shopRouter = express.Router()

shopRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.resolve('src/views/shop.html'))
})

export default shopRouter
