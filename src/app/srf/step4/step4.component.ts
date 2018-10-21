import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  constructor(
    private route:ActivatedRoute
  ) { }
  manufacturerRequestsId:any
  ngOnInit() {
    this.manufacturerRequestsId = this.route.snapshot.paramMap.get('id');
  }

}
