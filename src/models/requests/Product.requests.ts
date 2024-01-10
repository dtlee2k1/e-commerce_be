import { ParamsDictionary } from 'express-serve-static-core'

export interface ProductReqBody {
  productId: string
  title: string
  imageUrl: string
  price: number
  description: string
}

export interface ProductReqParams extends ParamsDictionary {
  productId: string
}
