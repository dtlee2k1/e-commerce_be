import path from 'path'
import express, { Request, Response, NextFunction } from 'express'
import adminRouter from './routes/admin.routes'
import shopRouter from './routes/shop.routes'

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve('public')))

app.use('/admin', adminRouter)
app.use(shopRouter)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).render('404', { pageTitle: 'Page not Found', path: null })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
