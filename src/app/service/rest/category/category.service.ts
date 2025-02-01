import {inject, Injectable} from "@angular/core";
import {ApiService} from "../../app/api.service";
import {map, Observable} from "rxjs";
import {Config} from "../../../config/config";
import {ICategory, ICategoryProduct} from "./category.interface";
import {ISuccess} from "../../../config/response.interface";

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api: ApiService = inject(ApiService)

  public getList(): Observable<ICategory[]> {
    return this.api.get<any>(Config.category.getList)
      .pipe(map((response: any) => response.data))
  }

  public get(id: number): Observable<ICategory> {
    return this.api.get<any>(Config.getUrl(Config.category.get, {id}))
      .pipe(map((response: any) => response.data))
  }

  public create(data: any): Observable<ICategory> {
    return this.api.postJSON<any>(Config.category.create, data)
      .pipe(map((response: any) => response.data))
  }

  public update(id: number, data: any): Observable<ICategory> {
    return this.api.putJSON<any>(Config.getUrl(Config.category.update, {id}), data)
      .pipe(map((response: any) => response.data))
  }

  public product(id: number, data: ICategoryProduct): Observable<ICategory> {
    return this.api.postJSON<any>(Config.getUrl(Config.category.update, {id}), data)
      .pipe(map((response: any) => response.data))
  }

  public delete(id: number): Observable<ISuccess> {
    return this.api.delete<any>(Config.getUrl(Config.category.delete, {id}))
      .pipe(map((response: any) => response.data))
  }
}
