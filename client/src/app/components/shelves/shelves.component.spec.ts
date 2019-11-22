import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelvesComponent } from './shelves.component';

describe('ShelvesComponent', () => {
  let component: ShelvesComponent;
  let fixture: ComponentFixture<ShelvesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelvesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
