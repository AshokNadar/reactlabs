import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SRFService } from '../../_services';
import { Route } from '@angular/compiler/src/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/en';
@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  addEditForm:FormGroup
  constructor(
    private router:Router,
    private toastrService:ToastrService,
    private srfService:SRFService,
    private route:ActivatedRoute,
    private fb : FormBuilder
  ) { }
  srfId:any;
  manufacturerRequestsId:any;
  init:boolean = true;
  submitted:boolean;
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale,
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control mb-2', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };
  viewAs:number;
  ngOnInit() {
    this.init = true;
    this.manufacturerRequestsId = this.route.snapshot.paramMap.get('id');
    if(localStorage.srdId == undefined){
      this.router.navigateByUrl('home/projects');
    }else{
      var step1 = JSON.parse(localStorage.srdId);
      this.srfId = step1;
      this.getExsist(this.srfId,this.manufacturerRequestsId);
    }
    if(localStorage.view !=undefined && localStorage.view == 1){
      this.viewAs = 1;
    }else{
      this.viewAs = 0;
    }
    this.minDate = new Date(Date.now())
    this.getDeclartion();
    this.addEditForm = this.fb.group({
      testSamplesSubmitted:['',Validators.required],
      serviceChargesAdvance:['',Validators.required],
      handleProducts:['',Validators.required],
      productsWithoutCertificate:['',Validators.required],
      sampleSubmittedReturnUntested:['',Validators.required],
      reserveRightCancel:['',Validators.required],
      samplesSubmittedBISWitnessTesting:['',Validators.required],
      disputeAgreement:['',Validators.required],
      writtenApprovalToLab:['',Validators.required],
      srfId:[this.srfId,Validators.required],
      name:['',Validators.required],
      designation:['',Validators.required],
      date:['',Validators.required],
    })
  }
  
  declarationList:any = [];
  getDeclartion(){
    this.srfService.declaration()
    .subscribe(
      data =>{
        this.init = false;
        this.declarationList = data;
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
  editView:any =[]
  getExsist(sid,id){ 
    this.loading = true;
    this.srfService.exsistData(sid,id)
    .subscribe(
      data =>{
        this.loading = false;
        this.editView = data;
        if(this.editView.declarationInfo != null){
        this.setValue(this.editView.declarationInfo);
        }
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
  minDate:any;
  loading:boolean;
  get validate(){return this.addEditForm.controls};
  submitForm(){
    this.submitted = true;
    this.checkAndReturn();
    if(this.addEditForm.invalid){
      return;
    }
    this.loading = true;
    this.srfService.createStepThree(this.addEditForm.value)
    .subscribe(
      data =>{
        this.loading = false;
        this.router.navigateByUrl('/home/srf/step-4/'+this.manufacturerRequestsId);
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
  setValue(data){
    if(data.testSamplesSubmitted == 1){
      this.addEditForm.controls['testSamplesSubmitted'].setValue(true)
    }else{
      this.addEditForm.controls['testSamplesSubmitted'].setValue(false)
    }

    if(data.serviceChargesAdvance == 1){
      this.addEditForm.controls['serviceChargesAdvance'].setValue(true)
    }else{
      this.addEditForm.controls['serviceChargesAdvance'].setValue(false)
    }
    if(data.handleProducts == 1){
      this.addEditForm.controls['handleProducts'].setValue(true)
    }else{
      this.addEditForm.controls['handleProducts'].setValue(false)
    }
    if(data.productsWithoutCertificate == 1){
      this.addEditForm.controls['productsWithoutCertificate'].setValue(true)
    }else{
      this.addEditForm.controls['productsWithoutCertificate'].setValue(false)
    }
    if(data.sampleSubmittedReturnUntested == 1){
      this.addEditForm.controls['sampleSubmittedReturnUntested'].setValue(true)
    }else{
      this.addEditForm.controls['sampleSubmittedReturnUntested'].setValue(false)
    }
    if(data.reserveRightCancel == 1){
      this.addEditForm.controls['reserveRightCancel'].setValue(true)
    }else{
      this.addEditForm.controls['reserveRightCancel'].setValue(false)
    }
    if(data.samplesSubmittedBISWitnessTesting == 1){
      this.addEditForm.controls['samplesSubmittedBISWitnessTesting'].setValue(true)
    }else{
      this.addEditForm.controls['samplesSubmittedBISWitnessTesting'].setValue(false)
    }
    if(data.disputeAgreement == 1){
      this.addEditForm.controls['disputeAgreement'].setValue(true)
    }else{
      this.addEditForm.controls['disputeAgreement'].setValue(false)
    }
    if(data.writtenApprovalToLab == 1){
      this.addEditForm.controls['writtenApprovalToLab'].setValue(true)
    }else{
      this.addEditForm.controls['writtenApprovalToLab'].setValue(false)
    }
    this.addEditForm.controls['name'].setValue(data.name)
    this.addEditForm.controls['designation'].setValue(data.designation)
    this.addEditForm.controls['date'].setValue(data.date)
  }
  insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string;
  }
  checkAndReturn(){
    if(this.addEditForm.controls['testSamplesSubmitted'].value == true){
      this.addEditForm.controls['testSamplesSubmitted'].setValue(1);
    }else{
      this.addEditForm.controls['testSamplesSubmitted'].setValue('');
    }
    if(this.addEditForm.controls['testSamplesSubmitted'].value == true){
      this.addEditForm.controls['testSamplesSubmitted'].setValue(1);
    }else{
      this.addEditForm.controls['testSamplesSubmitted'].setValue('');
    }
    if(this.addEditForm.controls['serviceChargesAdvance'].value == true){
      this.addEditForm.controls['serviceChargesAdvance'].setValue(1);
    }else{
      this.addEditForm.controls['serviceChargesAdvance'].setValue('');
    }
    if(this.addEditForm.controls['handleProducts'].value == true){
      this.addEditForm.controls['handleProducts'].setValue(1);
    }else{
      this.addEditForm.controls['handleProducts'].setValue('');
    }
    if(this.addEditForm.controls['productsWithoutCertificate'].value == true){
      this.addEditForm.controls['productsWithoutCertificate'].setValue(1);
    }else{
      this.addEditForm.controls['productsWithoutCertificate'].setValue('');
    }
    if(this.addEditForm.controls['sampleSubmittedReturnUntested'].value == true){
      this.addEditForm.controls['sampleSubmittedReturnUntested'].setValue(1);
    }else{
      this.addEditForm.controls['sampleSubmittedReturnUntested'].setValue('');
    }
    if(this.addEditForm.controls['reserveRightCancel'].value == true){
      this.addEditForm.controls['reserveRightCancel'].setValue(1);
    }else{
      this.addEditForm.controls['reserveRightCancel'].setValue('');
    }
    if(this.addEditForm.controls['samplesSubmittedBISWitnessTesting'].value == true){
      this.addEditForm.controls['samplesSubmittedBISWitnessTesting'].setValue(1);
    }else{
      this.addEditForm.controls['samplesSubmittedBISWitnessTesting'].setValue('');
    }
    if(this.addEditForm.controls['disputeAgreement'].value == true){
      this.addEditForm.controls['disputeAgreement'].setValue(1);
    }else{
      this.addEditForm.controls['disputeAgreement'].setValue('');
    }
    if(this.addEditForm.controls['writtenApprovalToLab'].value == true){
      this.addEditForm.controls['writtenApprovalToLab'].setValue(1);
    }else{
      this.addEditForm.controls['writtenApprovalToLab'].setValue('');
    }
  }
}
