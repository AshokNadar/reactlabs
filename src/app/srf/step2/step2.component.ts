import { Component, OnInit } from '@angular/core';
import { FormGroup,FormArray,FormBuilder,Validators } from '@angular/forms';
import { SRFService } from '../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { $ } from 'protractor';
@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  addEditForm:FormGroup;
  loading:boolean;
  init:boolean = true;
  submitted:boolean;
  constructor(
    private fb:FormBuilder,
    private srfService:SRFService,
    private toastrService:ToastrService,
    private router:Router,
    private route:ActivatedRoute
  ) { }
  srfId:number;
  manufacturerRequestsId:any;
  exsits:any=[];
  viewAs:number;
  ngOnInit() {
    this.manufacturerRequestsId = this.route.snapshot.paramMap.get('id');
    if(localStorage.srdId == undefined){
      this.router.navigateByUrl('home/projects');
    }else{
      var step1 = JSON.parse(localStorage.srdId);
      this.srfId = step1
    }
    if(localStorage.view !=undefined && localStorage.view == 1){
      this.viewAs = 1;
    }else{
      this.viewAs = 0;
    }
    this.addEditForm = this.fb.group({
      srfId:[this.srfId,Validators.required],
      products: this.fb.array([
        this.initForm(),
      ])
    })    
    this.init = true;
    this.getDefault();
    this.getExsist(this.srfId,this.manufacturerRequestsId);
    for(var i = 1;i<=10;i++){
      this.array.push(i);
    }
  }
  editView:any =[]
  getExsist(sid,id){ 
    this.srfService.exsistData(sid,id)
    .subscribe(
      data =>{
        this.editView = data;
        if(this.editView.productInfo){
          this.setValue(this.editView.productInfo);
        }else{
          this.selectedInformation[0] = '';
          this.limitSet[0]=1;
        }        
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
  selectedInformation:any=[]; 
  keyInfo:any =[];
  sampleInfo:any =[];
  setValue(data){
    var count = data.length; 
    for(var i = 1; i<count; i++){ 
      this.addForm();
    } 
    data.forEach((item,key) =>{
        this.addEditForm.get('products')['controls'][key].controls['productCategory'].setValue(item.productCategoryId)
        this.addEditForm.get('products')['controls'][key].controls['noOfSamples'].setValue(item.noOfSamples)
        this.addEditForm.get('products')['controls'][key].controls['modelNumber'].setValue(item.modelNumber)
        this.addEditForm.get('products')['controls'][key].controls['serialNumber'].setValue(item.serialNumber)
        this.sampleInfo = []
        item.sampleInfo.forEach(main=>{
          this.sampleInfo.push({display: main.serialNumber, value: main.serialNumber})
        })
        this.addEditForm.get('products')['controls'][key].controls['serialNumber'].setValue(this.sampleInfo)
        this.addEditForm.get('products')['controls'][key].controls['comments'].setValue(item.comments);
        this.limitSet[key]=item.noOfSamples;
        this.keyInfo = [];
        item.InfoSubmitted.forEach(list =>{
          this.keyInfo.push(list.informationSubmittedId)
          this.chooseInform(key,list.informationSubmittedId)
        })
        this.selectedInformation.push(this.keyInfo);
    })
  }
  array :any= []
  defaultData:any = [];
  getDefault(){
    this.loading = true; 
    this.srfService.getDefaultStep(2)
    .subscribe(
      data =>{
        this.loading = false;
        this.defaultData = data;
        this.init = false;
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
  initForm(){
    return this.fb.group({
      productCategory: ['', Validators.required],
      noOfSamples:  ['', Validators.required],
      modelNumber: ['', Validators.required],
      serialNumber: ['', Validators.required],
      informationSubmittedId: ['', Validators.required],
      comments: ['', Validators.required]
    });
  }
  addForm() {
    const control = <FormArray>this.addEditForm.controls['products'];
    control.push(this.initForm());
  }
  removeForm(i: number) {
    const control = <FormArray>this.addEditForm.controls['products'];
    control.removeAt(i);
  }
  get validate(){return this.addEditForm.controls}
  submitForm(){
    this.submitted  = true;
    if(this.addEditForm.invalid){
      return
    }
    this.loading = true;
    this.addEditForm.value
    this.srfService.createStepTwo(this.addEditForm.value)
    .subscribe(
      data =>{
        this.loading = false;
        this.router.navigateByUrl('/home/srf/step-3/'+this.manufacturerRequestsId);
        localStorage.setItem('step2',JSON.stringify(data));
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
  public IsValidField(field: string, i?:number) {
    if(i!=null){
      var f = this.addEditForm
        .get('products') //retrieve items FormArray
        .get(i.toString()) //retrieve items FormGroup
        .get(field); //retrieve items form field
      return (f.invalid && f.touched) || (f.invalid);
    }else{
      return (this.addEditForm.get(field).invalid && this.addEditForm.get(field).touched) || (this.addEditForm.get(field).invalid);            
    }  
  }
  limitSet:any = [];
  changeCount:any =[];
  getSamples(id,key){
    this.limitSet[key] = id;
    if(this.addEditForm.value.products[key].serialNumber != ''){
      this.addEditForm.value.products[key].serialNumber.forEach(item =>{
        if(this.changeCount.length < id){
          this.changeCount.push(item);
        }      
      })
      this.addEditForm.get('products')['controls'][key].controls['serialNumber'].setValue(this.changeCount)
    }    
  }
  setUp:any =[];
  values:any =[];
  chooseInform(key,value){ 
    if(this.setUp[key] == undefined){
      this.setUp[key] = [];
    }   
    const mop = this.setUp[key].indexOf(value);  
    if(mop == -1){
      this.setUp[key].push(value);
    }else{
      this.setUp[key].splice(mop,1);
    }
    this.addEditForm.get('products')['controls'][key].controls['informationSubmittedId'].setValue(this.setUp[key]);
  }
  checkChecked(key,id){
    if(this.selectedInformation[key] != undefined){
      const ins  = this.selectedInformation[key].indexOf(id)
      if(ins>-1){
        return true;
      }else{
        return false;
      }
    }
  }
}
