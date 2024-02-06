import { UserType } from './models/schemas/User.schema'

declare module 'express' {
  interface Request {
    user?: UserType
  }
}

declare module 'express-session' {
  interface SessionData {
    isLoggedIn?: boolean
    user?: UserType
  }
}
