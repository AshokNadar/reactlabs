import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validator, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetailsForm: FormGroup;
  loading = false;
  submitted:boolean;
  hideShow:boolean;

  constructor(
    private fb:FormBuilder,
    private userservice:UserService,
    private toasterservice:ToastrService
  ) {
    this.userDetailsForm = this.fb.group({
      id:['',Validators.required],
      email:['',Validators.required],
      mobile:[''],
      firstName:[''],
      lastName:['']
    })   
    
   }
   
  ngOnInit() {
    this.getUser();
    this.hideShow = false;
  }
  addClass:number;
  activInactiv(){
    if(this.hideShow == true){
      this.addClass = 0;
      this.hideShow = false;
    }else if(this.hideShow == false){
      this.hideShow = true;
      this.addClass = 1;
    }
  }
  getuser:any = []
  getUser(){
      this.loading = true;
      this.userservice.getProfile()
      .subscribe(
        data =>{
          this.loading = false; 
          (data!=null)?this.getuser = data:this.getuser = [];
          this.userDetailsForm.controls['firstName'].setValue(this.getuser.firstName); 
          this.userDetailsForm.controls['lastName'].setValue(this.getuser.lastName); 
          this.userDetailsForm.controls['mobile'].setValue(this.getuser.mobile); 
          this.userDetailsForm.controls['email'].setValue(this.getuser.email); 
          this.userDetailsForm.controls['id'].setValue(this.getuser.id); 
        },error =>{
          this.loading = false;
          if(error.length>0){
            error.forEach(message =>{
              this.toasterservice.error(message.msg,'React Labs')
            })
          }else{        
            this.toasterservice.error(error.msg,'React Labs')
          }
        }
      )
    }
    get f(){ return this.userDetailsForm.controls}
    update(){
      this.submitted = true;
      if(this.userDetailsForm.invalid){
        return;
      }
      this.loading = true;
      this.userservice.updateProfile(this.userDetailsForm.value)
      .subscribe(
        data =>{
          this.submitted = false;
          this.loading = false;
          this.toasterservice.info("Updated Successfully",'React Labs');
          this.activInactiv();
          this.getUser();

          
        },error =>{
          this.loading = false;
          if(error.length>0){
            error.forEach(message =>{
              this.toasterservice.error(message.msg,'React Labs')
            })
          }else{        
            this.toasterservice.error(error.msg,'React Labs')
          }
        }
      )
    }
}
