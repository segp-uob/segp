import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserComponent } from './app-user.component';

describe('AppUserComponent', () => {
  let component: AppUserComponent;
  let fixture: ComponentFixture<AppUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
