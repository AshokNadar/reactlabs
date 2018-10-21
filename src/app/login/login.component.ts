import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { FormGroup,FormBuilder,Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
declare var $:any; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(
    private fb :FormBuilder,
    private authenticationService:AuthenticationService,
    private toastrService:ToastrService,
    private router:Router
  ) {
    this.loginForm = fb.group({
      'email': ['',[Validators.required,Validators.email]],
      'password':['',Validators.required]
    }) 
   }
  loading:boolean;
  submitted:boolean;
  ngOnInit() {    
    localStorage.clear();
    $('#loginModal').modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    }); 
  }
  closeModal(){
    $('#loginModal').modal('toggle'); 
    this.router.navigateByUrl('/send-request');
  }
  closeModalOne(){
    $('#loginModal').modal('toggle'); 
    this.router.navigateByUrl('/forgot-password');
  }
  get f() { return this.loginForm.controls; }
  submitLogin(){
    this.submitted = true; 
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.loginForm.value)
    .subscribe(
      data =>{
        this.loading = false;
        $('#loginModal').modal('toggle'); 
        this.router.navigateByUrl('home/dashboard');
        this.toastrService.info("Login Successfully",'React Labs')
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
