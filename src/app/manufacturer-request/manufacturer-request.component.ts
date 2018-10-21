import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MasterService } from '../_services';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-manufacturer-request',
  templateUrl: './manufacturer-request.component.html',
  styleUrls: ['./manufacturer-request.component.css']
})
export class ManufacturerRequestComponent implements OnInit {
  registerForm:FormGroup;
  loading:boolean;
  submitted:boolean;
  constructor(
    private fb:FormBuilder,
    private masterService:MasterService,
    private toastrService:ToastrService
  ) { 
    this.registerForm = fb.group({
      name:['',[Validators.required,Validators.maxLength(255)]],
      company:['',[Validators.required,Validators.maxLength(255)]],
      email:['',[Validators.required,Validators.email,Validators.maxLength(255)]],
      contact:['',[Validators.required,Validators.maxLength(20)]],
      description:['',[Validators.required,Validators.maxLength(1000)]],
      productName:['',[Validators.required,Validators.maxLength(255)]],
      testingStandardId:['',Validators.required],
      purpose:['',[Validators.required,Validators.maxLength(255)]],
      productTypeId:['',Validators.required],
    })
  }

  ngOnInit() {
    this.listStandard();
    this.listProducts();
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
  get f() { return this.registerForm.controls; }
  submitRequest(){
    this.submitted = true; 
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.masterService.createManufactureRequest(this.registerForm.value)
    .subscribe(
      data =>{
        this.loading = false;
        this.registerForm.reset();
        this.submitted = false;
        $('#registereModal').modal({
          show: true,
          backdrop: 'static',
          keyboard: false
        }); 
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
