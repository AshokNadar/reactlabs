import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerRequestComponent } from './manufacturer-request.component';

describe('ManufacturerRequestComponent', () => {
  let component: ManufacturerRequestComponent;
  let fixture: ComponentFixture<ManufacturerRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
