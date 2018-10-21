import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
 
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }
 
    login(data) {        
        return this.http.post<any>(environment.apiURL+'auth/login', data)
            .pipe(map((res:any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('reactUser', JSON.stringify({ token: res.token }));
                    localStorage.setItem('roleId', JSON.stringify(res.roleId));
                    localStorage.setItem('userName', res.name);                    
                }
            }));
    }
    forgotPassword(data){
        return this.http.post(environment.apiURL+'auth/forgotPassword',data);
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('reactUser');
    }
}