import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment' 

@Injectable({ providedIn: 'root' })
export class ProjectService {
    constructor(private http: HttpClient) { }
    getComments(id){
        return this.http.get(environment.apiURL+'comments/list-comment?projectId='+id);
    }
    addComment(data){
        return this.http.post(environment.apiURL+'comments/add-comment ',data);
    }
    getLogs(id){
        return this.http.get(environment.apiURL+'projects/log?id='+id);
    }
    addWatchUser(data){
        return this.http.post(environment.apiURL+'watcher/add-watcher',data);
    }
    removeWatchUser(pid,id){
        return this.http.post(environment.apiURL+'watcher/remove-watcher',{product_id:pid,user_id:id});
    }
    updateStatus(data){
        return this.http.put(environment.apiURL+'projects/statusUpdate',data);
    }
}
