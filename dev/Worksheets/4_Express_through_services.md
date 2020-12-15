# Connecting Component to Express API

Currently we are just using dummy data rendered from within the component (not recommended!). Of course we want to connect everything to our newly created API!

Best practices recommend defining a provider or service to handle the http calls. Take a look at this introduction to services: https://angular.io/tutorial/toh-pt4
Services are great because they are injectable and they can also have its own injected dependencies. This makes testing and reuse easier. 

Of course a service could go and get data from basically anywhere - a web service, filesystem, or a mock data source.

> ### Milestone checklist
> - [ ] Essential: Workshop walkthrough
> - [ ] Essential: 
> - [ ] Recommended: 
***

## Create a service

```
ng generate service data
```

This creates a data.service.ts in the src/app directory. We then need to add it in the providers section of our module declaration. 

```
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
```

## Update the data service

We now need to make sure the service makes the right call: edit src/app/data.service.ts

```
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  public getAll(){
    return this.httpClient.get(this.REST_API_SERVER)
  }
}
```

## Import the new service

We return to our app-Component and make sure to import the new servce: 

```
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
```
## Editing the Radar chart

We can then make use of this service inside our components. Remember the component calls the service: which in turn exposes the data to the HTML in the form of a structure. Ideally valiation occurs on the server side. 

```
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {  
// This is what gets initialised by default
  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    {data: [120, 130, 180, 70], label: '2017'},
    {data: [90, 150, 200, 45], label: '2018'}
  ];

  stats: any = [];
  currentdata = null;
  currentIndex = -1;
  title = '';

  public radarChartType = 'radar';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.retrieveData();
  }

  retrieveData() {
    this.dataService.getAll().subscribe(
        data => {
          this.stats = data;
          // now lets update the fields
          this.radarChartLabels = this.stats.radarChartLabels;
          this.radarChartData = this.stats.radarChartData;
        },
        error => {
          console.log(error);
        });
  }

}

```

## Displaying the API data in the HTML

Now lets look at the HTML and see how this pulls through from the component. We are reusing the existing variable names we set before so there is little we need to do here now: 

```
<div style="display: block">
  <canvas baseChart
          [datasets]="radarChartData"
          [labels]="radarChartLabels"
          [chartType]="radarChartType"></canvas>
</div>
```

Build and serve the site using your express server to make sure it works! And congratulations you've created your first Restul API!

