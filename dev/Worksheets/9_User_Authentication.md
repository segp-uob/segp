# User Auth

To personalise the experience your Application users have, and to ensure the security of their data, we must impliment some kind of user authentication. At this point an application can really take off as you can provide completely unique experiences and render content based on user determined data. 

There are a lot of third party services (Like Auth0 & Okta) that will handle user authentication for you. Using a third party authentication provider has many advantages but naturally you must pay to use these services. We will be implimenting a very basic form of authentication so you can use as 'proof of concept'; but there are good reasons why this area would need more work should you choose to launch your application publically. 

> ### Milestone checklist
> - Essential: Workshop walkthrough
> - Essential: 
> - Recommended: [Introduction to JSON web tokens](https://jwt.io/introduction/)
***

# Overview

A fully implimented authenticaiton process in Angular would follow the below structure: 
![User Authentication process](https://bezkoder.com/wp-content/uploads/2020/07/angular-10-jwt-authentication-overview.png "Authentication flow")

## Create component
```
ng g s _services/auth
ng g s _services/token-storage
ng g s _services/user

ng g c login
ng g c register
ng g c home
ng g c profile
ng g c app-admin
ng g c app-moderator
ng g c app-user
```

Open app.module.ts, then import FormsModule & authInterceptorProviders (which we will complete soon) and all the components you've just created. Your app.module.ts should look like this:
```
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
// For user auth
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AppAdminComponent } from './app-admin/app-admin.component';
import { AppModeratorComponent } from './app-moderator/app-moderator.component';
import { AppUserComponent } from './app-user/app-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AppAdminComponent,
    AppModeratorComponent,
    AppUserComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PieChartComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule
  ],
  providers: [authInterceptorProviders,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }


```

## Creating services

### Authentication
We update auth.service.ts:
```
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}
```
We update token-storage.service.ts
```
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
```
And finally user.service.ts
```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserApp(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorApp(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminApp(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
```
### HTTP Interceptor

Now we return to the auth.interceptor.ts file and update:
```
import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
```
## Creating components

### Register
Within register.component.ts we must binds form data (username, email, password) from template to AuthService.register() method that returns an Observable object.
```
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
```
Now lets create a template to test the component
```
<div class="col-md-12">
  <div class="card card-container">
    <img
      id="profile-img"
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      class="profile-img-card"
    />
    <form
      *ngIf="!isSuccessful"
      name="form"
      (ngSubmit)="f.form.valid && onSubmit()"
      #f="ngForm"
      novalidate
    >
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          name="username"
          [(ngModel)]="form.username"
          required
          minlength="3"
          maxlength="20"
          #username="ngModel"
        />
        <div class="alert-danger" *ngIf="f.submitted && username.invalid">
          <div *ngIf="username.errors.required">Username is required</div>
          <div *ngIf="username.errors.minlength">
            Username must be at least 3 characters
          </div>
          <div *ngIf="username.errors.maxlength">
            Username must be at most 20 characters
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          name="email"
          [(ngModel)]="form.email"
          required
          email
          #email="ngModel"
        />
        <div class="alert-danger" *ngIf="f.submitted && email.invalid">
          <div *ngIf="email.errors.required">Email is required</div>
          <div *ngIf="email.errors.email">
            Email must be a valid email address
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          name="password"
          [(ngModel)]="form.password"
          required
          minlength="6"
          #password="ngModel"
        />
        <div class="alert-danger" *ngIf="f.submitted && password.invalid">
          <div *ngIf="password.errors.required">Password is required</div>
          <div *ngIf="password.errors.minlength">
            Password must be at least 6 characters
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block">Sign Up</button>
      </div>

      <div class="alert alert-warning" *ngIf="f.submitted && isSignUpFailed">
        Signup failed!<br />{{ errorMessage }}
      </div>
    </form>

    <div class="alert alert-success" *ngIf="isSuccessful">
      Your registration is successful!
    </div>
  </div>
</div>
```
### Login
Now lets update login.component.ts:
```
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
```
And update the HTML with validation
```
<div class="col-md-12">
  <div class="card card-container">
    <img
      id="profile-img"
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      class="profile-img-card"
    />
    <form
      *ngIf="!isLoggedIn"
      name="form"
      (ngSubmit)="f.form.valid && onSubmit()"
      #f="ngForm"
      novalidate
    >
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          name="username"
          [(ngModel)]="form.username"
          required
          #username="ngModel"
        />
        <div
          class="alert alert-danger"
          role="alert"
          *ngIf="f.submitted && username.invalid"
        >
          Username is required!
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          name="password"
          [(ngModel)]="form.password"
          required
          minlength="6"
          #password="ngModel"
        />
        <div
          class="alert alert-danger"
          role="alert"
          *ngIf="f.submitted && password.invalid"
        >
          <div *ngIf="password.errors.required">Password is required</div>
          <div *ngIf="password.errors.minlength">
            Password must be at least 6 characters
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block">
          Login
        </button>
      </div>
      <div class="form-group">
        <div
          class="alert alert-danger"
          role="alert"
          *ngIf="f.submitted && isLoginFailed"
        >
          Login failed: {{ errorMessage }}
        </div>
      </div>
    </form>

    <div class="alert alert-success" *ngIf="isLoggedIn">
      Logged in as {{ roles }}.
    </div>
  </div>
</div>
```

### Profile page
Update profile.component.ts:
```
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

}
```
And render a template:
```
<div class="container" *ngIf="currentUser; else loggedOut">
  <header class="jumbotron">
    <h3>
      <strong>{{ currentUser.username }}</strong> Profile
    </h3>
  </header>
  <p>
    <strong>Token:</strong>
    {{ currentUser.accessToken.substring(0, 20) }} ...
    {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
  </p>
  <p>
    <strong>Email:</strong>
    {{ currentUser.email }}
  </p>
  <strong>Roles:</strong>
  <ul>
    <li *ngFor="let role of currentUser.roles">
      {{ role }}
    </li>
  </ul>
</div>

<ng-template #loggedOut>
  Please login.
</ng-template>

```

## Calling user service
We use home.component.ts to call for content based on user authentication: 
```
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
```
With html:
```
<div class="container">
  <header class="jumbotron">
    <p>{{ content }}</p>
  </header>
</div>
```
## Private components
These Components are role-based. But authorization will be processed by back-end.
We only need to call UserService methods:

    getUserApp()
    getModeratorApp()
    getAdminApp()

Here is an example for appAdminComponent.
appModeratorComponent & appUserComponent are similar.

app-admin/app-admin.component.ts

## Updating routes
```
// user related components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AppUserComponent } from './app-user/app-user.component';
import { AppModeratorComponent } from './app-moderator/app-moderator.component';
import { AppAdminComponent } from './app-admin/app-admin.component';

const routes: Routes = [
  {path: 'bar-chart', component: BarChartComponent},
  {path: 'doughnut-chart', component: DoughnutChartComponent},
  {path: 'radar-chart', component: RadarChartComponent},
  {path: 'pie-chart', component: PieChartComponent},
  {path: '**', component: PieChartComponent}
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'profile', component: ProfileComponent },
  {path: 'user', component: AppUserComponent },
  {path: 'mod', component: AppModeratorComponent },
  {path: 'admin', component: AppAdminComponent },
  {path: '', redirectTo: 'home', pathMatch: 'full' }
];
```

# Further reading

To impliment a full authentication process use the [following example](https://jasonwatmore.com/post/2020/07/18/angular-10-user-registration-and-login-example-tutorial) from Jason Watmore.

# License Notice

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
