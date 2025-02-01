export interface IUserInfo {
  id: number
  name: string
  email: string
  password: string
  profile?: IUserProfile
  created_at: string
}

export interface IUserProfile {
  id: number
  bio: string
  created_at: string
}


export interface IUserCreate {
  name: string
  email: string
  password: string
  bio?: string
}

