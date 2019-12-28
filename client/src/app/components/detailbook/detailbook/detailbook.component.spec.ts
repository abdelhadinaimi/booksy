import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailbookComponent } from './detailbook.component';

describe('DetailbookComponent', () => {
  let component: DetailbookComponent;
  let fixture: ComponentFixture<DetailbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
