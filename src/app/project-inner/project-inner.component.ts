import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterService, ProjectService } from '../_services';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/en';

declare var $: any;

@Component({
  selector: 'app-project-inner',
  templateUrl: './project-inner.component.html',
  styleUrls: ['./project-inner.component.css']
})
export class ProjectInnerComponent implements OnInit {
  projectId: any;
  addSamplesForm: FormGroup;
  editSamplesForm: FormGroup;
  commentForm: FormGroup;
  addWatcherForm: FormGroup;
  loading = false;
  id: any;
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
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private toastrService: ToastrService
  ) { }



  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];
    this.projectList();
    this.listusers();
    this.listStatus();
    this.commentList();
    this.getHistory();
    this.listWatcher();
    // this.getSamples();
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      projectId: [this.projectId, Validators.required],
    })
    this.addWatcherForm = this.fb.group({
      user_id: ['', Validators.required],
      product_id: [this.projectId, Validators.required],
    })
    this.addSamplesForm = this.fb.group({
      serialNumber: ['', Validators.required],
      productId: [this.projectId, Validators.required]
    })
    this.editSamplesForm = this.fb.group({
      id: ['', Validators.required],
      serialNumber: ['', Validators.required],
      productId: [this.projectId, Validators.required],
      receivedDate: ['', Validators.required]
    })

  }
  projectDetails: any = [];
  projectList() {
    this.loading = true;
    this.processing = true;
    this.masterService.getOneProject(this.projectId)
      .subscribe(
        data => {
          this.processing = false;
          this.loading = false;
          (data != null) ? this.projectDetails = data : this.projectDetails = [];
        }, error => {
          this.loading = false;
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )
  }
  //Project Status
  projectStatus: any = [];
  listStatus() {
    this.loading = true;
    this.masterService.projectStatus()
      .subscribe(
        data => {
          this.loading = false;
          this.projectStatus = data;
        }, error => {
          this.loading = false;
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )
  }
  userslist: any = [];
  listusers() {
    this.loading = true;
    this.masterService.userList(2)
      .subscribe(
        data => {
          this.loading = false;
          this.userslist = data;
        }, error => {
          this.loading = false;
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )
  }
  // Samples List

  samples: any = [];
  getSamples() {
    this.loading = true;
    this.processing = true;
    this.masterService.getsamples(this.projectId)
      .subscribe(
        data => {
          this.processing = false;
          this.loading = false;
          (data != null) ? this.samples = data : this.samples = [];
        }, error => {
          this.loading = false;
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )
  }
  // Add Samples
  get f() { return this.addWatcherForm.controls }
  get s() { return this.addSamplesForm.controls }
  createSamples() {
    this.loading = true;
    this.masterService.addSamples(this.addSamplesForm.value)
      .subscribe(
        data => {
          this.loading = false;
          this.toastrService.info('Samples are addded successfully', 'React Labs')
          this.addSamplesForm.reset();
          $('#samples').modal('toggle');
          this.ngOnInit();
        }, error => {
          this.loading = false;
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )
  }
  //Update Samples
  editData(id) {
    this.projectDetails.sampleInfo.forEach(list => {
      if (id == list.id) {
        this.editSamplesForm.controls['id'].setValue(list.id);
        this.editSamplesForm.controls['serialNumber'].setValue(list.serialNumber);
        this.editSamplesForm.controls['receivedDate'].setValue(list.receivedDate)
      }
    })
  }
  get h() { return this.editSamplesForm.controls }
  editsamples() {
    this.submitted = true;
    if (this.editSamplesForm.invalid) {
      return;
    }
    this.loading = true;
    this.masterService.updateSamples(this.editSamplesForm.value)
      .subscribe(
        data => {
          this.submitted = false;
          this.loading = false;
          this.toastrService.info("Updated Successfully", 'React Labs');

        }, error => {
          this.loading = false;
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )
  }
  listComments: any = [];
  submitted: boolean;
  loadComment: boolean;
  commentList() {
    this.loadComment = true;
    this.projectService.getComments(this.projectId)
      .subscribe(
        data => {
          this.loadComment = false;
          this.commentForm.controls['projectId'].setValue(this.projectId);
          this.listComments = data;
        }, error => {
          this.loadComment = false;
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )
  }

  addComments() {
    if (this.commentForm.invalid) {
      this.toastrService.error("Enter the comment", 'React Labs')
      return
    }
    this.loadComment = true;
    var req = this.commentForm.value;
    this.commentForm.reset();
    this.projectService.addComment(req)
      .subscribe(
        data => {
          this.commentList();
        }, error => {
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )
  }
  historyList: any = [];
  getHistory() {
    this.projectService.getLogs(this.projectId)
      .subscribe(
        data => {
          this.historyList = data;
        }, error => {
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )
  }
  addWatchers() {
    this.loading = true;
    this.projectService.addWatchUser(this.addWatcherForm.value)
      .subscribe(
        data => {
          this.loading = false;
          this.toastrService.info('Watcher Added Successfully', 'React Labs')
          this.addWatcherForm.reset();
          this.addWatcherForm['controls']['product_id'].setValue(this.projectId);
          $('#watcher').modal('toggle');
          this.ngOnInit();
        }, error => {
          this.loading = false;
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )
  }
  watcherList: any = [];
  listWatcher() {
    this.loading = true;
    this.masterService.userList(3)
      .subscribe(
        data => {
          this.loading = false;
          this.watcherList = data;
        }, error => {
          this.loading = false;
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )
  }
  processing: boolean;
  removeWatcher(id) {
    this.processing = true;
    this.projectService.removeWatchUser(this.projectId, id)
      .subscribe(
        data => {
          this.toastrService.info('Watcher Removed Successfully', 'React Labs')
          this.ngOnInit();
        }, error => {
          this.processing = false;
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )
  }
  userStatus: number;
  settingStatus: number;
  statusChoose(id) {
    this.settingStatus = id;
  }
  userChoose(id) {
    this.userStatus = id;
  }
  updateLoading: boolean;
  saveStatus() {
    if (this.settingStatus == null) {
      this.toastrService.error("Change the status before update", 'React Labs');
      return;
    } else {
      if (this.settingStatus == 3) {
        if (this.userStatus == null) {
          this.toastrService.error("Please assign the user before update", 'React Labs');
          return;
        }
      }
    }
    this.updateLoading = true;
    this.projectService.updateStatus({ id: this.projectId, statusId: this.settingStatus, userId: this.userStatus })
      .subscribe(
        data => {
          this.updateLoading = false;
          this.toastrService.info("Updated Successfully", 'React Labs');
        }, error => {
          this.updateLoading = false;
          if (error.length > 0) {
            error.forEach(message => {
              this.toastrService.error(message.msg, 'React Labs')
            })
          } else {
            this.toastrService.error(error.msg, 'React Labs')
          }
        }
      )

  }
}
