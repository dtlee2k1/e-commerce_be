import { Request, Response, NextFunction } from 'express'
import { ProductReqParams } from '~/models/requests/Product.requests'
import Order from '~/models/schemas/Order.schema'
import Product, { ProductType } from '~/models/schemas/Product.schema'
import User, { UserType } from '~/models/schemas/User.schema'

export const renderIndexViewController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await Product.find({})
  res.render('shop/index', { pageTitle: 'Shop', path: '/', products, isAuthenticated: req.session.isLoggedIn })
}

export const renderProductsViewController = async (req: Request, res: Response, next: NextFunction) => {
  const products = await Product.find({})
  res.render('shop/product-list', {
    pageTitle: 'All products',
    path: '/products',
    products,
    isAuthenticated: req.session.isLoggedIn
  })
}

export const renderProductDetailController = async (
  req: Request<ProductReqParams>,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params
  const product = await Product.findById(productId)
  res.render('shop/product-detail', {
    pageTitle: 'Product detail',
    path: '/products',
    product,
    isAuthenticated: req.session.isLoggedIn
  })
}

export const renderCartViewController = async (req: Request, res: Response, next: NextFunction) => {
  const user = await (req.user as UserType).populate('cart.items.productId')
  const products = user.cart.items
  res.render('shop/cart', { pageTitle: 'Cart', path: '/cart', products, isAuthenticated: req.session.isLoggedIn })
}

export const renderOrdersViewController = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user as UserType
  const orders = await Order.find({ userId: _id })

  res.render('shop/orders', { pageTitle: 'Orders', path: '/orders', orders, isAuthenticated: req.session.isLoggedIn })
}

export const renderCheckoutViewController = async (req: Request, res: Response, next: NextFunction) => {
  // const products = Order.find({})
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
    products: [],
    isAuthenticated: req.session.isLoggedIn
  })
}

export const addToCartController = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body
  const { _id } = req.user as UserType
  const product = await Product.findById(productId)
  const user = await User.findById(_id)

  if (!user) {
    throw new Error('User not found')
  }
  await user.addToCart(product as ProductType)
  res.redirect('/cart')
}

export const deleteCartItemsController = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body

  const { _id: userId } = req.user as UserType
  const user = await User.findById(userId)
  if (!user) {
    throw new Error('User not found')
  }
  await user.deleteCartItem(productId)

  res.redirect('/cart')
}

export const addOrderController = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user as UserType

  const user = await (req.user as UserType).populate('cart.items.productId')
  if (!user) {
    throw new Error('User not found')
  }
  const order = new Order({
    userId: _id,
    products: user.cart.items.map((item) => ({
      product: { ...item.productId },
      quantity: item.quantity
    }))
  })

  await Promise.all([order.save(), User.updateOne({ _id }, { 'cart.items': [] })])

  res.redirect('/orders')
}
