import {IUserInfo} from "../user/user.interface";
import {ICategory} from "../category/category.interface";

export interface IProduct {
  id: number
  title: string
  description?: string
  price: number
  user_id: number
  created_at: string

  user: IUserInfo
  categories: ICategory[]
}

export interface IProductCreate {
  title: string
  description: string
  price: number
  user_id: number
}

export interface IProductCategory {
  category_ids: number[]
}
