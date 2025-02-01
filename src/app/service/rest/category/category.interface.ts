import {IProduct} from "../product/product.interface";

export interface ICategory {
  id: number
  title: string
  created_at: string

  products: IProduct[]
}

export interface ICategoryCreate {
  title: string
}

export interface ICategoryProduct {
  product_ids: number[]
}

