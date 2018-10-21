import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment' 

@Injectable({ providedIn: 'root' })
export class SRFService {
    constructor(private http: HttpClient) { }
 
    getDefaultStep(id){
        return this.http.get(environment.apiURL+'srf/data?step='+id);
    }
    createStepOne(data){
        return this.http.post(environment.apiURL+'srf/createStep1',data);
    }
    exsistData(sid,id){
        return this.http.get(environment.apiURL+'srf?id='+sid+'manufacturerRequestId='+id);
    }
    createStepTwo(data){
        return this.http.post(environment.apiURL+'srf/createStep2',data);
    }
    createStepThree(data){
        return this.http.post(environment.apiURL+'srf/createStep3',data);
    }
    getSrf(){
        return this.http.get(environment.apiURL+'srf');
    }
    declaration(){
        return this.http.get(environment.apiURL+'declaration');
    }
}