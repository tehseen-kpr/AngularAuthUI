import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, catchError, of, switchMap, throwError} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Router } from '@angular/router';
import { TokenApiModel } from 'src/app/models/token-api.models';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService,private router:Router) {}
  /* request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myToken=this.auth.getToken();

    if(myToken){
      request=request.clone({
        setHeaders:{Authorization:`Bearer ${myToken}`} //string concatinations
       
      })
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
           /*  alert('Token is expired please login again');
            this.router.navigate(['login']); */
          /*  return this.handleUnAuthorizeError(request,next); */
          return this.handleUnAuthorizedError(request,next);
          
          }

         }

         return throwError(()=>err);
        /* return throwError(()=>new Error('some other error occured')); */
      })
    );
  }
  //:Observable<HttpEvent<any>>
  //:Observable<any>
  handleUnAuthorizedError(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{
    var tokenApiModel=new TokenApiModel();

    tokenApiModel.accessToken=this.auth.getToken()!;
    tokenApiModel.refreshToken=this.auth.getRefreshToken()!;

    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);

        return next.handle(req.clone({
          setHeaders:{Authorization:`Bearer ${data.accessToken}`}
        }))

      }),
      catchError(()=>{
        return throwError(()=>{
          alert('Token is expired please login again');
          this.router.navigate(['login']);
        })
      })

    )


    /* return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders:{Authorization:`Bearer ${data.accessToken}`} //string concatinations
         
        })
        return next.handle(req);
      }
    )),
    catchError((err:any)=>{
      return throwError(()=>{
        alert('Token is expired please login again');
        this.router.navigate(['login']);
      
          })
    }) */

    
  }
}
