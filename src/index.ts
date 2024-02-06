import 'dotenv/config'
import path from 'path'
import mongoose from 'mongoose'
import express, { Request, Response, NextFunction } from 'express'
import adminRouter from './routes/admin.routes'
import shopRouter from './routes/shop.routes'
import { render404ViewController } from './controllers/errors.controllers'
import { initFolder } from './utils/file'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import authRouter from './routes/auth.routes'
import MongoDBStore from 'connect-mongodb-session'
import session from 'express-session'
import User, { UserType } from './models/schemas/User.schema'

const port = 3000
const app = express()

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@bookstore.qzftzpb.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const MongoStore = MongoDBStore(session)

const store = new MongoStore({
  uri,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 24 * 7
})

mongoose
  .connect(uri)
  .then(() => {
    console.log('You successfully connected to MongoDB!')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  })

initFolder()

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve('public')))

app.use(
  session({
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: false,
    store
  })
)

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session) {
      return next()
    }

    const user = await User.findById(req.session.user?._id)

    req.user = user as UserType
    next()
  } catch (error) {
    console.log(error)
  }
})

app.use('/admin', adminRouter)
app.use(shopRouter)
app.use(authRouter)

app.use(render404ViewController)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
