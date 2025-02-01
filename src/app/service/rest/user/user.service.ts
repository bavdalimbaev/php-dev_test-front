import {Config} from "../../../config/config";
import {inject, Injectable} from "@angular/core";
import {ApiService} from "../../app/api.service";
import {map, Observable} from "rxjs";
import {ISuccess, TSuccessResponse} from "../../../config/response.interface";
import {IUserInfo} from "./user.interface";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api: ApiService = inject(ApiService)

  public getList(): Observable<IUserInfo[]> {
    return this.api.get<any>(Config.user.getList)
      .pipe(map((response: any) => response.data))
  }

  public get(id: number): Observable<IUserInfo> {
    return this.api.get<any>(Config.getUrl(Config.user.get, {id}))
      .pipe(map((response: any) => response.data))
  }

  public create(data: any): Observable<IUserInfo> {
    return this.api.postJSON<any>(Config.user.create, data)
      .pipe(map((response: any) => response.data))
  }

  public update(id: number, data: any): Observable<IUserInfo> {
    return this.api.putJSON<any>(Config.getUrl(Config.user.update, {id}), data)
      .pipe(map((response: any) => response.data))
  }

  public delete(id: number): Observable<ISuccess> {
    return this.api.delete<TSuccessResponse>(Config.getUrl(Config.user.delete, {id}))
      .pipe(map((response: TSuccessResponse) => response.data))
  }
}
