import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectManagementComponent } from './object-management.component';

describe('ObjectManagementComponent', () => {
  let component: ObjectManagementComponent;
  let fixture: ComponentFixture<ObjectManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
