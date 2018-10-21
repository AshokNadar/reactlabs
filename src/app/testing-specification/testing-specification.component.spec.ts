import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingSpecificationComponent } from './testing-specification.component';

describe('TestingSpecificationComponent', () => {
  let component: TestingSpecificationComponent;
  let fixture: ComponentFixture<TestingSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
