import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MasterService } from '../_services';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  styleUrls: ['./acl.component.css']
})
export class AclComponent implements OnInit {

  addForm:FormGroup;
  editForm:FormGroup;
  submitted:boolean;
  loading:boolean;
  searchQuery:string;
  p:number;
  constructor(
    private fb:FormBuilder,
    private masterService:MasterService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute
  ) { }
  roleId:number;
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.roleId = params['id'];
      this.TableList(this.roleId);
    });
  }
  listTable:any =[];
  TableList(id){
    this.loading = true;
    this.masterService.roleActions(id)
    .subscribe(
      data =>{
        this.loading = false;
        (data!=null)?this.listTable = data:this.listTable = [];
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
  changeStatus(id,status){
    if(status == 0){
      status = 1
    }else{
      status = 0
    }
    var req = {
      actionId:id,
      status:status,
      role_id:this.roleId
    }
    this.masterService.updatePermission(req)
    .subscribe(
      data =>{
        this.toastrService.info("Update Successfully",'React Labs')
        this.TableList(this.roleId);
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


