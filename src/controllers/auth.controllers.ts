import { Request, Response, NextFunction } from 'express'
import User from '~/models/schemas/User.schema'

export const renderLoginFormController = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.session.user)
  res.render('auth/login', { pageTitle: 'Login', path: '/login', isAuthenticated: false })
}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById('65b69f26f94b27eda3a08657')

    if (user === null) {
      throw new Error('User not found')
    }
    req.session.isLoggedIn = true
    req.session.user = user
    req.session.save(() => {
      res.redirect('/')
    })
  } catch (error) {
    console.log(error)
  }
}

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.session.destroy(() => {
      res.redirect('/')
    })
  } catch (error) {
    console.log(error)
  }
}
