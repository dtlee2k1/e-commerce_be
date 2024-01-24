import { Collection, Db, MongoClient } from 'mongodb'
import Product from '~/models/schemas/Product.schema'
import 'dotenv/config'
import User from '~/models/schemas/User.schema'
import Order from '~/models/schemas/Order.schema'

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PRODUCTS_COLLECTION, DB_USERS_COLLECTION, DB_ORDERS_COLLECTION } =
  process.env
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@bookstore.qzftzpb.mongodb.net/?retryWrites=true&w=majority`

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    this.client = new MongoClient(uri)

    this.db = this.client.db(DB_NAME)
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error:', error)
    }
  }

  get products(): Collection<Product> {
    return this.db.collection(DB_PRODUCTS_COLLECTION as string)
  }

  get users(): Collection<User> {
    return this.db.collection(DB_USERS_COLLECTION as string)
  }

  get orders(): Collection<Order> {
    return this.db.collection(DB_ORDERS_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
