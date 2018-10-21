import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingStandradComponent } from './testing-standrad.component';

describe('TestingStandradComponent', () => {
  let component: TestingStandradComponent;
  let fixture: ComponentFixture<TestingStandradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingStandradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingStandradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
