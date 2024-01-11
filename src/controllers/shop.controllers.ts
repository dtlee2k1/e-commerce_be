import { Request, Response, NextFunction } from 'express'
import { ProductReqParams } from '~/models/requests/Product.requests'
import { ProductInCart } from '~/models/schemas/Cart.schema'
import cartService from '~/services/cart.services'
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

export const renderCartViewController = async (req: Request, res: Response, next: NextFunction) => {
  const cart = await cartService.getCart()
  const products = await productService.fetchAll()
  const cartProducts: ProductInCart[] = []

  products.forEach((product) => {
    const cartProductData = cart.products.find((prod) => prod.id === product.id)
    if (cartProductData) {
      cartProducts.push({ productData: product, quantity: cartProductData.quantity })
    }
  })

  res.render('shop/cart', { pageTitle: 'Cart', path: '/cart', products: cartProducts })
}

export const renderCheckoutViewController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await productService.fetchAll()
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout', products })
}

export const addToCartController = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body

  const product = await productService.findById(productId)

  await cartService.addProduct(productId, product.price)

  res.redirect('/cart')
}

export const deleteCartProductController = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body
  const product = await productService.findById(productId)
  await cartService.deleteProduct(productId, product.price)
  res.redirect('/cart')
}
