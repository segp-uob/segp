import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let html: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AppComponent ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      html = fixture.debugElement;

      fixture.detectChanges();
    });
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title set as 'dashboard'`, () => {
    expect(component.title).toEqual('dashboard');
  });

  it('should render title', () => {
    expect(
      html.query(
        By.css('.content span')
      ).nativeElement.textContent
    ).toContain('dashboard app is running!');
  });

  describe('when logged in', () => {
    beforeEach(() => {
      // Simulate logged in state
      component.isLoggedIn = true;
      fixture.detectChanges();
    });

    afterEach(() => {
      component.isLoggedIn = false;
      fixture.detectChanges();
    });

    it('should display the logout link when logged in', () => {
      const logoutLink = html.query(By.css('#logout-link'));
      expect(component.isLoggedIn).toEqual(true);
      expect(logoutLink).toBeTruthy();
    });

    it('should call the logout function when logout link is pressed', fakeAsync(() => {
      spyOn(component, 'logout');
      const logoutLink = fixture.debugElement.query(By.css('#logout-link'));
      logoutLink.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      expect(component.logout).toHaveBeenCalled();
    }));

  });

});
