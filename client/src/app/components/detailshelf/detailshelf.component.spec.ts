import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailshelfComponent } from './detailshelf.component';

describe('DetailshelfComponent', () => {
  let component: DetailshelfComponent;
  let fixture: ComponentFixture<DetailshelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailshelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailshelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
