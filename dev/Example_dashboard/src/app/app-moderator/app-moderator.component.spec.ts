import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModeratorComponent } from './app-moderator.component';

describe('AppModeratorComponent', () => {
  let component: AppModeratorComponent;
  let fixture: ComponentFixture<AppModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppModeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
