import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let reactUser = JSON.parse(localStorage.getItem('reactUser'));
        var staticAuth = 'cmVhY3RsYWJzOmQ0ZTI2OTFhNDE1ZTU3NjQ5MWJiZDg2ZDYwZjI5MTAw'
        if (reactUser && reactUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${staticAuth}`,
                    "x-access-token": `${reactUser.token}`
                }
            });
        }else{ 
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic  ${staticAuth}`,
                }
            });
        }
 
        return next.handle(request);
    }
}