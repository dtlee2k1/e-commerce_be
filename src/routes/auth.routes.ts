import { Router } from 'express'
import { loginController, logoutController, renderLoginFormController } from '~/controllers/auth.controllers'

const authRouter = Router()

authRouter.get('/login', renderLoginFormController)

authRouter.post('/login', loginController)

authRouter.post('/logout', logoutController)

export default authRouter
