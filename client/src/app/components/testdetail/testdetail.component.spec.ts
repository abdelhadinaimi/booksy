import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdetailComponent } from './testdetail.component';

describe('TestdetailComponent', () => {
  let component: TestdetailComponent;
  let fixture: ComponentFixture<TestdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
