import {inject, Injectable} from "@angular/core";
import {ApiService} from "../../app/api.service";
import {map, Observable} from "rxjs";
import {Config} from "../../../config/config";
import {ISuccess} from "../../../config/response.interface";
import {IProduct, IProductCategory} from "./product.interface";
import {ICategory, ICategoryProduct} from "../category/category.interface";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api: ApiService = inject(ApiService)

  public getList(): Observable<IProduct[]> {
    return this.api.get<any>(Config.product.getList)
      .pipe(map((response: any) => response.data))
  }

  public get(id: number): Observable<IProduct> {
    return this.api.get<any>(Config.getUrl(Config.product.get, {id}))
      .pipe(map((response: any) => response.data))
  }

  public create(data: any): Observable<IProduct> {
    return this.api.postJSON<any>(Config.product.create, data)
      .pipe(map((response: any) => response.data))
  }

  public update(id: number, data: any): Observable<IProduct> {
    return this.api.putJSON<any>(Config.getUrl(Config.product.update, {id}), data)
      .pipe(map((response: any) => response.data))
  }

  public category(id: number, data: IProductCategory): Observable<IProduct> {
    return this.api.postJSON<any>(Config.getUrl(Config.product.category, {id}), data)
      .pipe(map((response: any) => response.data))
  }

  public delete(id: number): Observable<ISuccess> {
    return this.api.delete<any>(Config.getUrl(Config.product.delete, {id}))
      .pipe(map((response: any) => response.data))
  }
}
