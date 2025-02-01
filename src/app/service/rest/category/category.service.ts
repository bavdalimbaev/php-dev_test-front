import {inject, Injectable} from "@angular/core";
import {ApiService} from "../../app/api.service";
import {map, Observable} from "rxjs";
import {Config} from "../../../config/config";

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api: ApiService = inject(ApiService)

  public getList(): Observable<any[]> {
    return this.api.get<any>(Config.category.getList)
      .pipe(map((response: any) => response.data))
  }

  public get(id: number): Observable<any[]> {
    return this.api.get<any>(Config.getUrl(Config.category.get, {id}))
      .pipe(map((response: any) => response.data))
  }

  public create(data: any): Observable<any[]> {
    return this.api.postJSON<any>(Config.category.create, data)
      .pipe(map((response: any) => response.data))
  }

  public update(id: number, data: any): Observable<any[]> {
    return this.api.putJSON<any>(Config.getUrl(Config.category.update, {id}), data)
      .pipe(map((response: any) => response.data))
  }

  public delete(id: number): Observable<any[]> {
    return this.api.delete<any>(Config.getUrl(Config.category.delete, {id}))
      .pipe(map((response: any) => response.data))
  }
}
