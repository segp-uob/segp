#Connecting Component to Express API

Currently we are just using dummy data rendered from within the component (not recommended!). Of course we want to connect everything to our newly created API!

Best practices recommend defining a provider or service to handle the http calls. Take a look at this introduction to services: https://angular.io/tutorial/toh-pt4
Services are great because they are injectable and they can also have its own injected dependencies. This makes testing and reuse easier. 

Of course a service could go and get data from basically anywhere - a web service, filesystem, or a mock data source.

## Create a service

'''
ng generate service data
'''

This creates a data.service.ts in the src/app directory. We then need to add it in the providers section of our module declaration. 

'''
// Imports commented out 
import { DataService } from './data.service'; // Add the data service here

// Routes

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [DataService], // Add the data service here
  bootstrap: [AppComponent]
})
export class AppModule { }
'''

## Update the data service

We now need to make sure the service makes the right call: edit src/app/data.service.ts

'''
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  // Get all data from the API
  getAllData() {
    return this.http.get('/api/data')
      .pipe(map((response: any) => response.json()));
  }
}
'''

## Import the new service

We return to our app-Component and make sure to import the new servce: 

'''
import { Component, OnInit } from '@angular/core'; // need to make sure we import oninit
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';
}

// need to ensure we include a dectorator and export calss as abstract

@Component({
  template: ''
})

export abstract class DataComponent implements OnInit {
  // instantiate data to an empty array
  data: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.dataService.getAllData().subscribe(data => {
      this.data = data;
    });
  }
}
'''

## Displaying the new data

And finally, we'll just display the posts in the view.

