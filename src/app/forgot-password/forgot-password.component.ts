import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router'
declare var $:any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm:FormGroup;
  loading:boolean;
  submitted:boolean;
  constructor(
    private fb:FormBuilder,
    private toastrService:ToastrService,
    private authenticationService :AuthenticationService,
    private router:Router
  ) { 
    this.forgotPasswordForm = fb.group({
      email:['',[Validators.required,Validators.email]]
    })
  }

  ngOnInit() {
    localStorage.clear();
    $('#forgotModal').modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    }); 
  }
  closeModal(){
    $('#forgotModal').modal('toggle'); 
    this.router.navigateByUrl('/send-request');
  }
  get f(){ return this.forgotPasswordForm.controls;}
  sendRequest(){
    this.submitted = true;
    if(this.forgotPasswordForm.invalid){
      return
    }
    this.loading = true;
    this.authenticationService.forgotPassword(this.forgotPasswordForm.value)
    .subscribe(
      data =>{
        this.loading = false;
        this.forgotPasswordForm.reset();
        this.submitted = false;
        this.toastrService.info("Mail Sent Successfully",'React Labs')
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
