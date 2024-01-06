import { Request, Response, NextFunction } from 'express'

export const render404PageController = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).render('404', { pageTitle: 'Page not Found', path: null })
}
