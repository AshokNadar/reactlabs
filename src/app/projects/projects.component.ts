import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MasterService } from '../_services';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  addForm:FormGroup;
  editForm:FormGroup;
  submitted:boolean;
  loading:boolean;
  searchQuery:string;
  p:number;
  constructor(
    private fb:FormBuilder,
    private masterService:MasterService,
    private toastrService:ToastrService
  ) { 
    this.addForm = this.fb.group({
      name:['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      contact:['',Validators.required],
      description:['',Validators.required],
      company:['',Validators.required],
      productName:['',Validators.required],
      purpose:['',Validators.required],
      productTypeId:['',Validators.required],
      testingStandardId:['',Validators.required],
    })
    this.editForm = this.fb.group({
      id:['',Validators.required],
      name:['',Validators.required],    
      email: ['',[Validators.required,Validators.email]],
      contact:['',Validators.required],
      description:['',Validators.required],
      company:['',Validators.required],
      productName:['',Validators.required],
      purpose:['',Validators.required],
      productTypeId:['',Validators.required],
      testingStandardId:['',Validators.required],
    })
  }

  ngOnInit() {
    this.projectList();
    // this.listProducts();
    // this.listStandard();
    this.listStatus();
  }

  projectStatus:any =[];
  listStatus(){
    this.loading = true;
    this.masterService.requestStatus()
    .subscribe(
      data =>{
        this.loading = false;
        this.projectStatus = data;
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
  listManufacturer:any =[];
  projectList(){
    this.loading = true;
    this.masterService.projectList()
    .subscribe(
      data =>{
        this.loading = false; 
        (data!=null)?this.listManufacturer = data:this.listManufacturer = [];
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
  saveSrf(data){
    if(data!= '' && data!= null){
      localStorage.setItem('srdId',JSON.stringify(data.id));
    }
  }
  get f(){ return this.addForm.controls}
  create(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    this.loading = true;
    this.masterService.createManufactureRequest(this.addForm.value)
    .subscribe(
      data =>{
        this.loading = false;
        this.toastrService.info("Created Successfully",'React Labs');
        this.projectList();
        $('#exampleModal').modal('toggle');
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
    this.listManufacturer.forEach(list =>{
      if(id == list.id){
        this.editForm.controls['id'].setValue(list.id);
        this.editForm.controls['name'].setValue(list.name);
        this.editForm.controls['email'].setValue(list.email)
        this.editForm.controls['contact'].setValue(list.contact)
        this.editForm.controls['description'].setValue(list.description)
        this.editForm.controls['company'].setValue(list.company)
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
        this.projectList();
        $('#exampleModalEdit').modal('toggle')
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
    this.addForm.reset();
    this.editForm.reset();
    this.submitted = false;
    this.loading = false;
  }
  deleteItem(id){
    this.masterService.deleteManufacturer(id)
    .subscribe(
      data =>{
        this.toastrService.info("Deleted Successfully",'React Labs');
        this.projectList();
      },error =>{
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
  changeStatus(id,status){
    this.masterService.changeRequestStatus({id:id,statusId:status})
    .subscribe(
      data =>{
        this.toastrService.info("Updated Successfully",'React Labs');
        this.projectList();
      },error =>{
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
