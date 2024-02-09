export interface UserReqBody {
  email: string
  username: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface RegisterReqBody {
  email: string
  password: string
  confirm_password: string
}
