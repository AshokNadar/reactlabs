import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrfListComponent } from './srf-list.component';

describe('SrfListComponent', () => {
  let component: SrfListComponent;
  let fixture: ComponentFixture<SrfListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrfListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
