import path from 'path'
import express from 'express'
import adminRouter from './routes/admin.routes'
import shopRouter from './routes/shop.routes'
import { render404ViewController } from './controllers/errors.controllers'
import { initFolder } from './utils/file'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const port = 3000
const app = express()

initFolder()

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve('public')))

app.use('/admin', adminRouter)
app.use(shopRouter)

app.use(render404ViewController)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
