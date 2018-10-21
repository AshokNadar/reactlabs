import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment' 
import { EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class UserService {
    @Output() users: EventEmitter<any> = new EventEmitter();
    constructor(private http: HttpClient) { }
 
    getUsers() {
        return this.http.get(environment.apiURL+'users');
    }
    changePassword(data){
        return this.http.put(environment.apiURL+'users/changePassword',data);
    }

    createUser(data) {
        return this.http.post(environment.apiURL + 'users/create', data);           
    }
    getRoles() {
        return this.http.get(environment.apiURL+'roles');
    }
    updateUser(data){
        return this.http.put(environment.apiURL+'users/update',data);
    }
    // Profile Services
    getProfile(){
        return this.http.get(environment.apiURL+'users/profile');
    }
    updateProfile(data){
        return this.http.put(environment.apiURL+'users/updateProfile',data);
    }
}