import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  createUser: FormGroup;
  editUserForm: FormGroup;
  submitted:boolean;
  loading:boolean;
  p:number;
  searchQuery:string;
  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService:ToastrService,
  ) {
    this.createUser = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:[''],
      email:['',Validators.required],
      mobile:[''],
      isdCode:[''],
      mandatoryChangePassword:['',Validators.required],
      displayName:['',Validators.required],
      roleId:['',Validators.required]
    });
    this.editUserForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:[''],
      email:['',Validators.required],
      mobile:[''],
      isdCode:[''],
      mandatoryChangePassword:['',Validators.required],
      status:['',Validators.required],
      displayName:['',Validators.required],
      roleId:['',Validators.required],
      id:['',Validators.required]
    });
  }

  ngOnInit() {
    this.listUsers();
    this.listRoles();   
  }
  close(){
    this.createUser.reset();
    this.submitted = false;
    this.loading = false;
  }
  //List users
  listusers:any=[]
  listUsers(){
    this.loading = true;
    this.userService.getUsers()
    .subscribe(
      data =>{
        this.loading = false;
        this.listusers = data;       
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
  mandatoryChangePassword : number;
// Create users
get f(){ return this.createUser.controls}
  changePassword(mandatoryChangePassword){
    if(mandatoryChangePassword == 0){
      mandatoryChangePassword = 1
    }else{
      mandatoryChangePassword = 0
    }
    this.mandatoryChangePassword = mandatoryChangePassword;
    this.createUser.controls['mandatoryChangePassword'].setValue(mandatoryChangePassword);
  }
  create(){
    this.submitted = true;
    if(this.createUser.invalid){
      return;
    }
    this.loading = true;
    this.userService.createUser(this.createUser.value)
    .subscribe(
      data =>{
        this.loading = false;
        this.toastrService.info("User Created Successfully",'React Labs');
        this.listUsers();
        $('#createUserModal').modal('toggle');
      },error =>{ 
        this.submitted = false;
        this.loading = false;
        if(error.length>0){
          error.forEach(message =>{
            this.toastrService.error(message.param+" "+message.msg,'React Labs')
          })
        }else{        
          this.toastrService.error(error.msg,'React Labs')
        }
      }
    )
  }
  status:number;
  //Edit Users
  edituser(id){
    this.listusers.forEach(list =>{
      if(id == list.id){
        this.editUserForm.controls['id'].setValue(list.id);
        this.editUserForm.controls['firstName'].setValue(list.firstName);
        this.editUserForm.controls['lastName'].setValue(list.lastName)
        this.editUserForm.controls['email'].setValue(list.email);
        this.editUserForm.controls['mobile'].setValue(list.mobile)
        this.editUserForm.controls['isdCode'].setValue(list.isdCode);
        this.editUserForm.controls['displayName'].setValue(list.displayName);       
        this.editUserForm.controls['roleId'].setValue(list.roleId);
        this.editUserForm.controls['status'].setValue(list.status);
        this.editUserForm.controls['mandatoryChangePassword'].setValue(list.mandatoryChangePassword);
        this.status = list.status;
        this.mandatoryChangePassword = list.mandatoryChangePassword;
      }
    })
  }  
  changeStatus(status){
    if(status == 0){
      status = 1
    }else{
      status = 0
    }
    this.status = status;
    this.editUserForm.controls['status'].setValue(status);
  }

  updateChangePassword(mandatoryChangePassword){
    if(mandatoryChangePassword == 0){
      mandatoryChangePassword = 1
    }else{
      mandatoryChangePassword = 0
    }
    this.mandatoryChangePassword = mandatoryChangePassword;
    this.editUserForm.controls['mandatoryChangePassword'].setValue(mandatoryChangePassword);
  }
  get g(){ return this.editUserForm.controls}
  edit(){
    this.submitted = true;
    if(this.editUserForm.invalid){
      return;
    }
    this.loading = true;
    this.userService.updateUser(this.editUserForm.value)
    .subscribe(
      data =>{
        this.submitted = false;
        this.loading = false;
        this.toastrService.info("Updated Successfully",'React Labs');
        this.listUsers();
        $('#editUserModal').modal('toggle');
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
  roleslist:any =[];
  listRoles(){
    this.loading = true;
    this.userService.getRoles()
    .subscribe(
      data =>{
        this.loading = false;
        this.roleslist = data;       
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
}
