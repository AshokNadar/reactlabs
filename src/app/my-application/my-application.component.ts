import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MasterService } from '../_services';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-my-application',
  templateUrl: './my-application.component.html',
  styleUrls: ['./my-application.component.css']
})
export class MyApplicationComponent implements OnInit {
  loading:boolean;
  submitted:boolean;
  p:number;
  searchQuery:string;
  constructor(
    private masterService:MasterService,
    private toastrService:ToastrService,
    private fb:FormBuilder
  ){
  }
  statusFrom:FormGroup;
  createRequest:FormGroup;
  editForm:FormGroup;
  userId:number;
  ngOnInit(){
    this.userId = JSON.parse(localStorage.roleId)
    localStorage.removeItem('srdId');
    localStorage.removeItem('view');
    this.statusFrom = this.fb.group({
      statusId:['',Validators.required],
      id:['',Validators.required],
      comments:['',Validators.required]
    })
    this.createRequest = this.fb.group({
      productName:['',Validators.required],
      purpose:['',Validators.required],
      productTypeId:['',Validators.required],
      testingStandardId:['',Validators.required],
      description:['',Validators.required],
    })
    this.editForm = this.fb.group({
      id:['',Validators.required],
      description:['',Validators.required], 
      productName:['',Validators.required],
      purpose:['',Validators.required],
      productTypeId:['',Validators.required],
      testingStandardId:['',Validators.required],
    })
    this.listAll();
    this.listProducts();
    this.listStandard();
  }
  standardList:any=[]
  listStandard(){
    this.loading = true;
    this.masterService.getAllTestingStandard()
    .subscribe(
      data =>{
        this.loading = false;
        this.standardList = data;
      },error=>{
        this.loading = false;
        if(error.length>0){
          error.forEach(message =>{
            this.toastrService.error(message.msg,'React Labs')
          })
        }else{        
          this.toastrService.error(error.msg,'React Labs')
        }
      }
    )
  }
  productList:any=[];
  listProducts(){
    this.loading = true;
    this.masterService.getAllProductType()
    .subscribe(
      data =>{
        this.loading = false;
        this.productList = data;
      },error=>{
        this.loading = false;
        if(error.length>0){
          error.forEach(message =>{
            this.toastrService.error(message.msg,'React Labs')
          })
        }else{        
          this.toastrService.error(error.msg,'React Labs')
        }
      }
    )
  }
  dataList:any =[];
  listAll(){
    this.loading = true;
    this.masterService.getAllManufactureRequest()
    .subscribe(
      data =>{
        this.loading = false;
        (data!=null)?this.dataList = data:this.dataList = [];
      },
      error =>{
        this.submitted = false;
        this.loading = false;
        if(error.length>0){
          error.forEach(message =>{
            this.toastrService.error(message.msg,'React Labs')
          })
        }else{        
          this.toastrService.error(error.msg,'React Labs')
        }
      }
    )
  }
  chooseStatus(id,status){
    this.statusFrom.controls['statusId'].setValue(status);
    this.statusFrom.controls['id'].setValue(id);
  }
  saveSrf(data){
    if(data!= '' && data!= null){
      localStorage.setItem('srdId',JSON.stringify(data.id));
    }
  }
  changeStatus(){
    this.loading = true;
    this.masterService.changeRequestStatus(this.statusFrom.value)
    .subscribe(
      data =>{
        $('#commentModal').modal('toggle');
        this.listAll();
      },error =>{
        this.submitted = false;
        this.loading = false;
        if(error.length>0){
          error.forEach(message =>{
            this.toastrService.error(message.msg,'React Labs')
          })
        }else{        
          this.toastrService.error(error.msg,'React Labs')
        }
      }
    )
  }
  submitForm(){
    this.submitted = true;
    if(this.createRequest.invalid){
      return;
    }
    this.loading = true;
    this.masterService.createManufacturerLogin(this.createRequest.value)
    .subscribe(
      data =>{  
        this.submitted = false;
        this.loading = false;
        this.createRequest.reset();
        this.toastrService.info("Created Successfully",'React Labs');
        this.listAll();
        $('#createModalLabel').modal('toggle')
      },error =>{
        this.submitted = false;
        this.loading = false;
        if(error.length>0){
          error.forEach(message =>{
            this.toastrService.error(message.msg,'React Labs')
          })
        }else{        
          this.toastrService.error(error.msg,'React Labs')
        }
      }
    )
  }
  editData(id){
    this.dataList.forEach(list =>{
      if(id == list.id){
        this.editForm.controls['id'].setValue(list.id);
        this.editForm.controls['description'].setValue(list.description) 
        this.editForm.controls['productName'].setValue(list.productName)
        this.editForm.controls['purpose'].setValue(list.purpose)
        this.editForm.controls['productTypeId'].setValue(list.ProductType.id)
        this.editForm.controls['testingStandardId'].setValue(list.TestingStandard.id)
      }
    })
  }  
  get g(){ return this.editForm.controls}
  update(){
    this.submitted = true;
    if(this.editForm.invalid){
      return;
    }
    this.loading = true;
    this.masterService.updateManufactureRequest(this.editForm.value)
    .subscribe(
      data =>{
        this.submitted = false;
        this.loading = false;
        this.toastrService.info("Updated Successfully",'React Labs');
        this.listAll();
        $('#updateModal').modal('toggle')
      },error =>{
        this.loading = false;
        if(error.length>0){
          error.forEach(message =>{
            this.toastrService.error(message.msg,'React Labs')
          })
        }else{        
          this.toastrService.error(error.msg,'React Labs')
        }
      }
    )
  }
  close(){
    this.createRequest.reset();
    this.editForm.reset();
    this.submitted = false;
    this.loading = false;
  }
  uploadLoading:any=[];
  readUpload(id,sid,event){
    this.uploadLoading[id] = true;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let formData = new FormData()
      formData.append('file',file)
      formData.append('srfId',sid)
      this.masterService.uploadSRFDocs(formData)
      .subscribe(
        data =>{
          this.uploadLoading[id] = false;
          this.listAll();
        },error =>{
          this.uploadLoading[id] = false;
          if(error.length>0){
            error.forEach(message =>{
              this.toastrService.error(message.msg,'React Labs')
            })
          }else{        
            this.toastrService.error(error.msg,'React Labs')
          }
        }
      )
    }
  }
  saveView(){
    localStorage.setItem('view',"1");
  }
  approve:any=[];
  srfState(id,status){
    this.approve ={
      id:id,
      statusId:status
    }
  }
  approveSRF(){
    this.loading = true;
    this.masterService.approveStatus(this.approve)
    .subscribe(
      data =>{
        this.loading = false;
        this.toastrService.info("Approved SRF Successfully",'React Labs');
        this.listAll();
        $('#approveModal').modal('toggle')
      },error =>{
        this.loading = false;
          if(error.length>0){
            error.forEach(message =>{
              this.toastrService.error(message.msg,'React Labs')
            })
          }else{        
            this.toastrService.error(error.msg,'React Labs')
          }
      }
    )
  }
}


