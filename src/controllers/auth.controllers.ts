import { Request, Response, NextFunction } from 'express'
import User from '~/models/schemas/User.schema'
import bcrypt from 'bcrypt'
import { ParamsDictionary } from 'express-serve-static-core'
import { LoginReqBody, RegisterReqBody } from '~/models/requests/User.requests'

export const renderLoginFormController = async (req: Request, res: Response, next: NextFunction) => {
  let message: string | null
  const errorMessages = req.flash('error')
  errorMessages.length > 0 ? (message = errorMessages[0]) : (message = null)

  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: false,
    errorMessage: message
  })
}

export const renderSignupFormController = async (req: Request, res: Response, next: NextFunction) => {
  let message: string | null
  const errorMessages = req.flash('error')
  errorMessages.length > 0 ? (message = errorMessages[0]) : (message = null)

  res.render('auth/signup', { pageTitle: 'Signup', path: '/signup', isAuthenticated: false, errorMessage: message })
}

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      req.flash('error', 'Invalid email or password')
      return res.redirect('/login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      req.flash('error', 'Invalid email or password')
      return res.redirect('/login')
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

export const signupController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      req.flash('error', 'Email already exists')
      return res.redirect('/signup')
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ email, password: hashedPassword })
    await user.save()
    res.redirect('/login')
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
