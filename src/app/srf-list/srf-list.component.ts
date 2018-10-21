import { Component, OnInit } from '@angular/core';
import { SRFService } from '../_services'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-srf-list',
  templateUrl: './srf-list.component.html',
  styleUrls: ['./srf-list.component.css']
})
export class SrfListComponent implements OnInit {
  loading:boolean;
  p:number;
  constructor(
    private srfService:SRFService,
    private toastrService:ToastrService
  ) { }

  ngOnInit() {
    this.listAll();
  }
  dataList:any =[];
  listAll(){
    this.loading = true;
    this.srfService.getSrf()
    .subscribe(
      data =>{
        this.loading = false;
        (data!=null)?this.dataList = data:this.dataList = [];
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
