import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminComponent } from './app-admin.component';

describe('AppAdminComponent', () => {
  let component: AppAdminComponent;
  let fixture: ComponentFixture<AppAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
