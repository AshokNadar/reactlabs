import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
@Injectable({ providedIn: 'root' })
export class MasterService {
    constructor(private http: HttpClient) { }
 
    getAllProductType() {
        return this.http.get(environment.apiURL+'productTypes?sort=asc');
    }
    createProductType(data){
        return this.http.post(environment.apiURL+'productTypes/create',data);
    }
    updateProductType(data){
        return this.http.put(environment.apiURL+'productTypes/update',data);
    }
    deleteProductType(id){
        return this.http.delete(environment.apiURL+'productTypes/remove?id='+id);
    }
    // manufacturer service call starts
    getAllManufactureRequest() {
        return this.http.get(environment.apiURL+'manufactureRequests?sort=asc');
    }
    createManufactureRequest(data){
        return this.http.post(environment.apiURL+'manufactureRequests/create',data);
    }
    updateManufactureRequest(data){
        return this.http.put(environment.apiURL+'manufactureRequests/update',data);
    }
    deleteManufactureRequest(id){
        return this.http.delete(environment.apiURL+'manufactureRequests/remove?id='+id);
    }

    // testing standard starts here

    getAllTestingStandard() {
        return this.http.get(environment.apiURL+'testingStandard?sort=asc');
    }
    createTestingStandard(data){
        return this.http.post(environment.apiURL+'testingStandard/create',data);
    }
    updateTestingStandard(data){
        return this.http.put(environment.apiURL+'testingStandard/update',data);
    }
    deleteTestingStandard(id){
        return this.http.delete(environment.apiURL+'testingStandard/remove?id='+id);
    }

    // roles services starts here
    getAllRole(){
        return this.http.get(environment.apiURL+'roles');
    }
    createRole(data){
        return this.http.post(environment.apiURL+'roles/create',data);
    }
    updateRole(data){
        return this.http.put(environment.apiURL+'roles/update',data);
    }
    deleteRole(id){
        return this.http.delete(environment.apiURL+'roles/remove?id='+id);
    }

    // manufacturer services starts here
    getAllManufacturer(){
        return this.http.get(environment.apiURL+'manufacturer');
    }
    createManufacturer(data){
        return this.http.post(environment.apiURL+'manufacturer/create',data);
    }
    updateManufacturer(data){
        return this.http.put(environment.apiURL+'manufacturer/update',data);
    }
    deleteManufacturer(id){
        return this.http.delete(environment.apiURL+'manufacturer/remove?id='+id);
    }

    createManufacturerLogin(data){
        return this.http.post(environment.apiURL+'manufactureRequests/createAfterLogin',data);
    }

    uploadSRFDocs(data){
        return this.http.put(environment.apiURL+'srf/uploadSrf',data);
    }

    approveStatus(data){
        return this.http.put(environment.apiURL+'srf/statusUpdate',data);
    }

    requestStatus(){
        return this.http.get(environment.apiURL+'manufactureRequestsStatus');
    }
    changeRequestStatus(data){
        return this.http.put(environment.apiURL+'manufactureRequests/updateStatus',data);
    }

    // testing tables starts here
    getAllTestingTable() {
        return this.http.get(environment.apiURL+'testingTypes?sort=asc');
    }
    createTestingTable(data){
        return this.http.post(environment.apiURL+'testingTypes/create',data);
    }
    updateTestingTable(data){
        return this.http.put(environment.apiURL+'testingTypes/update',data);
    }
    deleteTestingTable(id){
        return this.http.delete(environment.apiURL+'testingTypes/remove?id='+id);
    }
    roleActions(id){
        return this.http.get(environment.apiURL+'actions?role_id='+id);
    }
    updatePermission(data){
        return this.http.post(environment.apiURL+'roleActions/add-update-permission',data);
    }

    //Testing Specification starts here
    getAllTestingSpecification() {
        return this.http.get(environment.apiURL+'testingSpecifications');
    }
    createTestingSpecification(data){
        return this.http.post(environment.apiURL+'testingSpecifications/create',data);
    }
    updateTestingSpecification(data){
        return this.http.put(environment.apiURL+'testingSpecifications/update',data);
    }
    deleteTestingSpecification(id){
        return this.http.delete(environment.apiURL+'testingSpecifications/remove?id='+id);
    }

    // purpose starts here
    getAllPurpose(){
        return this.http.get(environment.apiURL+'testingPurposes');
    }
    createPurpose(data){
        return this.http.post(environment.apiURL+'testingPurposes/create',data);
    }
    updatePurpose(data){
        return this.http.put(environment.apiURL+'testingPurposes/update',data);
    }
    deletePurpose(id){
        return this.http.delete(environment.apiURL+'testingPurposes/remove?id='+id);
    }

    // testingSampleCollections starts here
    getAllSampleCollections(){
        return this.http.get(environment.apiURL+'testingSampleCollections');
    }
    createSampleCollections(data){
        return this.http.post(environment.apiURL+'testingSampleCollections/create',data);
    }
    updateSampleCollections(data){
        return this.http.put(environment.apiURL+'testingSampleCollections/update',data);
    }
    deleteSampleCollections(id){
        return this.http.delete(environment.apiURL+'testingSampleCollections/remove?id='+id);
    }

    // testingRequirements starts here
    getAllRequirements(){
        return this.http.get(environment.apiURL+'testingRequirements');
    }
    createRequirements(data){
        return this.http.post(environment.apiURL+'testingRequirements/create',data);
    }
    updateRequirements(data){
        return this.http.put(environment.apiURL+'testingRequirements/update',data);
    }
    deleteRequirements(id){
        return this.http.delete(environment.apiURL+'testingRequirements/remove?id='+id);
    }

    projectList(){
        return this.http.get(environment.apiURL+'projects/index');
    }
    getOneProject(id){
        return this.http.get(environment.apiURL+'projects/index?id='+id);
    }
    projectStatus(){
        return this.http.get(environment.apiURL+'projectStatus');
    }
    userList(id){
        return this.http.get(environment.apiURL+'users?role='+id);
    }
     // Samples
     getsamples(id){
        return this.http.get(environment.apiURL+'project/get-samples?productId='+id);
    }
    addSamples(data){
        return this.http.put(environment.apiURL+'projectSamples/create',data);
    }
    updateSamples(data){
        return this.http.put(environment.apiURL+'projectSamples/update-sample',data);
    }
}
