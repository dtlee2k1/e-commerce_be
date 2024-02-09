import { Router } from 'express'
import {
  loginController,
  logoutController,
  renderLoginFormController,
  renderSignupFormController,
  signupController
} from '~/controllers/auth.controllers'

const authRouter = Router()

authRouter.get('/login', renderLoginFormController)

authRouter.get('/signup', renderSignupFormController)

authRouter.post('/login', loginController)

authRouter.post('/signup', signupController)

authRouter.post('/logout', logoutController)

export default authRouter
