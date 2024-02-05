import 'dotenv/config'
import mongoose from 'mongoose'

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@bookstore.qzftzpb.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

class DatabaseService {
  constructor() {
    // Kết nối sử dụng Mongoose
    mongoose.connect(uri)
  }

  connect() {
    mongoose.connection.on('connected', () => {
      console.log('You successfully connected to MongoDB!')
    })

    mongoose.connection.on('error', (error) => {
      console.error('Error connecting to MongoDB:', error)
    })
  }
}

const databaseService = new DatabaseService()
export default databaseService
