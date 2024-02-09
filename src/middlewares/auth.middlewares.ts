import { Request, Response, NextFunction } from 'express'

export const protectedRouteValidator = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/')
  }
  next()
}
