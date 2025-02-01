import {inject, Injectable} from "@angular/core"
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http"
import {catchError, Observable, throwError} from "rxjs"
import {Router} from "@angular/router"
import {UntilDestroy} from "@ngneat/until-destroy";
import {NotifyAbstract} from "../service/app/notify.abstract";
import {Config} from "./config";

@UntilDestroy({checkProperties: true})
@Injectable({providedIn: 'root'})
export class MainInterceptor extends NotifyAbstract implements HttpInterceptor {
  private router: Router = inject(Router)

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has('X-Skip-Interceptor')) {
      const req: HttpRequest<any> = request.clone({
        headers: request.headers
          .set('Access-Control-Allow-Origin', Config.frontend)
          .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
          // eslint-disable-next-line max-len
          .set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin,X-Requested-With,Content-Type,Authorization,Access-Control-Expose-Headers'),
      })

      return next.handle(req)
        .pipe(catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            this.handleError(error)
          }

          return throwError(error)
        }))
    }

    return next.handle(request)
      .pipe(catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this.handleError(error)
        }

        return throwError(error)
      }))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.instant('error', 'Вы не авторизованы')
      this.router.navigate(['/login']).finally()
    } else {
      this.instant('error', error.error.message || error.message)
    }
    return []
  }
}
