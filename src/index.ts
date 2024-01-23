import path from 'path'
import express, { Request, Response, NextFunction } from 'express'
import adminRouter from './routes/admin.routes'
import shopRouter from './routes/shop.routes'
import { render404ViewController } from './controllers/errors.controllers'
import { initFolder } from './utils/file'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import databaseService from './services/database.services'
import userService from './services/users.services'
const port = 3000
const app = express()

databaseService.connect()

initFolder()

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve('public')))

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.findById('65ae9d5bd99887cb31b15a2e')

    if (user === null) {
      throw new Error('User not found')
    }
    req.user = user
    next()
  } catch (error) {
    console.log(error)
  }
})

app.use('/admin', adminRouter)
app.use(shopRouter)

app.use(render404ViewController)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
