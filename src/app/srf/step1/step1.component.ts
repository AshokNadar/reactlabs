import { Component, OnInit } from '@angular/core';
import { SRFService } from  '../../_services';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { $ } from 'protractor';
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  loading:boolean;
  init:boolean = true;
  addEditForm:FormGroup;
  submitted:boolean;
  manufacturerRequestsId:any;
  exsits:number;
  constructor(
    private srfService:SRFService,
    private toastrService:ToastrService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute
  ) { }
  viewAs:number;
  ngOnInit() {
    this.init = true;
    this.manufacturerRequestsId = this.route.snapshot.paramMap.get('id');
    this.getDefault();
    if(localStorage.view !=undefined && localStorage.view == 1){
      this.viewAs = 1;
    }else{
      this.viewAs = 0;
    }
    if(localStorage.srdId != undefined){
      this.exsits = JSON.parse(localStorage.srdId);
      this.getExsist(this.exsits,this.manufacturerRequestsId);
    }
    this.addEditForm = this.fb.group({
      id:[this.exsits],
      manufacturerRequestsId:[this.manufacturerRequestsId,Validators.required],
      personName: ['',Validators.required],
      personAddress1: ['',Validators.required],
      personCity: ['',Validators.required],
      personPincode: ['',[Validators.required,Validators.maxLength(6)]],
      personCountryId: ['',Validators.required],
      personMobile: ['',[Validators.required]],
      personEmail: ['',[Validators.required,Validators.email]],
      companyName: ['',Validators.required],
      companyAddress1: ['',Validators.required],
      companyCity: ['',Validators.required],
      companyPincode: ['',[Validators.required,Validators.maxLength(6)]],
      companyCountryId: ['',Validators.required],
      companyMobile: ['',[Validators.required]],
      companyEmail: ['',[Validators.required,Validators.email]],
      testingSpecificationId: ['',Validators.required],
      testingRequirementsId: ['',Validators.required],
      testingWitnessId: ['',Validators.required],
      testingPurposeId: ['',Validators.required],
      testingReportId: ['',Validators.required],
      testingContinueId: ['',Validators.required],
      testingFailureInformId: ['',Validators.required],
      testingSampleCollectionId: ['',Validators.required],
    })
  }
  editView:any =[]
  getExsist(sid,id){ 
    this.srfService.exsistData(sid,id)
    .subscribe(
      data =>{
        this.editView = data;
        this.setValue(this.editView);
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
  setValue(data){
    var personalInfo = this.editView.generalInfo[0];
    var companyInfo = this.editView.generalInfo[1];
    this.addEditForm.controls['personName'].setValue(personalInfo.name)
    this.addEditForm.controls['personAddress1'].setValue(personalInfo.address1)
    this.addEditForm.controls['personCity'].setValue(personalInfo.city)
    this.addEditForm.controls['personPincode'].setValue(personalInfo.pincode)
    this.addEditForm.controls['personCountryId'].setValue(personalInfo.countryId)
    this.addEditForm.controls['personMobile'].setValue(personalInfo.mobile)
    this.addEditForm.controls['personEmail'].setValue(personalInfo.email)
    this.addEditForm.controls['companyName'].setValue(companyInfo.name)
    this.addEditForm.controls['companyAddress1'].setValue(companyInfo.address1)
    this.addEditForm.controls['companyCity'].setValue(companyInfo.city)
    this.addEditForm.controls['companyPincode'].setValue(companyInfo.pincode)
    this.addEditForm.controls['companyCountryId'].setValue(companyInfo.countryId)
    this.addEditForm.controls['companyMobile'].setValue(companyInfo.mobile)
    this.addEditForm.controls['companyEmail'].setValue(companyInfo.email)
    this.addEditForm.controls['testingSpecificationId'].setValue(this.editView.testSpecification.id)
    this.addEditForm.controls['testingRequirementsId'].setValue(this.editView.testingRequirement.id)
    this.addEditForm.controls['testingWitnessId'].setValue(this.editView.testingWitness.id)
    this.addEditForm.controls['testingPurposeId'].setValue(this.editView.testingPurpose.id)
    this.addEditForm.controls['testingReportId'].setValue(this.editView.testingReport.id)
    this.addEditForm.controls['testingContinueId'].setValue(this.editView.testingContinue.id)
    this.addEditForm.controls['testingFailureInformId'].setValue(this.editView.testingFailureInform.id)
    this.addEditForm.controls['testingSampleCollectionId'].setValue(this.editView.testingSampleCollection.id)
  }
  defaultData:any = [];
  getDefault(){
    this.loading = true; 
    this.srfService.getDefaultStep(1)
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
  get validate(){ return this.addEditForm.controls};
  resp:any =[];
  submitForm(){
    this.submitted = true;
    if(this.addEditForm.invalid){
      return
    }
    this.loading = true;
    this.srfService.createStepOne(this.addEditForm.value)
    .subscribe(
      data =>{
        this.loading = false;
        this.router.navigateByUrl('/home/srf/step-2/'+this.manufacturerRequestsId);
        this.resp = data;
        localStorage.setItem('srdId',JSON.stringify(this.resp.id));
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
