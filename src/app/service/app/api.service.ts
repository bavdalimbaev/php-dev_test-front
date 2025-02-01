import {Config} from "../../config/config";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  public get<T>(route: string, routeParams?: object, options?: object) {
    return this.http.get<T>(Config.getUrl(route, routeParams || {}), options || {})
  }

  public post<T>(route: string, formData: FormData | any, routeParams?: object, options?: object) {
    return this.http.post<T>(Config.getUrl(route, routeParams || {}), formData, options || {})
  }

  public delete<T>(route: string, routeParams?: object, options?: object) {
    return this.http.delete<T>(Config.getUrl(route, routeParams || {}), options || {})
  }

  public put<T>(route: string, formData: FormData, routeParams?: object, options?: object) {
    return this.http.put<T>(Config.getUrl(route, routeParams || {}), formData, options || {})
  }

  public postJSON<T>(route: string, json: object, routeParams?: object, options?: object) {
    return this.http.post<T>(Config.getUrl(route, routeParams || {}), json, options || {})
  }

  public putJSON<T>(route: string, json: object, routeParams?: object, options?: object) {
    return this.http.put<T>(Config.getUrl(route, routeParams || {}), json, options || {})
  }
}
