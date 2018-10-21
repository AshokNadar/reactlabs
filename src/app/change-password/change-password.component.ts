import { Component, OnInit } from '@angular/core';
import { PasswordValidation } from './password-validator';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { UserService } from '../_services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassword:FormGroup;
  loading:boolean;
  submitted:boolean;
  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService:ToastrService
  ) { }
  
  ngOnInit() {
    this.changePassword = this.formBuilder.group({
      old_password:['',Validators.compose([Validators.required,Validators.minLength(6)])],
      password:['',Validators.compose([Validators.required,Validators.minLength(6)])],
      confirm_password: ['',Validators.compose([Validators.required,Validators.minLength(6)])]
    }, {
      validator: PasswordValidation.MatchPassword 
    });
  }
  get f(){ return this.changePassword.controls;}
  submit(){ 
      this.submitted = true;
      if(this.changePassword.invalid){
        return;
      }
      this.loading = true;
      this.userService.changePassword(this.changePassword.value)
      .subscribe(
        data =>{
          this.submitted = false;
          this.loading = false;
          this.toastrService.success('Updated Successfully','React Labs');
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
