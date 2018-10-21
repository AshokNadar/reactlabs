import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MasterService } from '../_services';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
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
      address:['',Validators.required],
      phoneNo:['',Validators.required],
    })
    this.editForm = this.fb.group({
      id:['',Validators.required],
      name:['',Validators.required],    
      email: ['',[Validators.required,Validators.email]],
      address:['',Validators.required],
      phoneNo:['',Validators.required],
    })
  }

  ngOnInit() {
    this.manufacturerList();
  }
  listManufacturer:any =[];
  manufacturerList(){
    this.loading = true;
    this.masterService.getAllManufacturer()
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
  get f(){ return this.addForm.controls}
  create(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    this.loading = true;
    this.masterService.createManufacturer(this.addForm.value)
    .subscribe(
      data =>{
        this.loading = false;
        this.toastrService.info("Created Successfully",'React Labs');
        this.manufacturerList();
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
        this.editForm.controls['address'].setValue(list.address)
        this.editForm.controls['email'].setValue(list.email)
        this.editForm.controls['phoneNo'].setValue(list.phoneNo)
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
    this.masterService.updateManufacturer(this.editForm.value)
    .subscribe(
      data =>{
        this.submitted = false;
        this.loading = false;
        this.toastrService.info("Updated Successfully",'React Labs');
        this.manufacturerList();
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
        this.manufacturerList();
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


