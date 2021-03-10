# Connecting Component to Express API
## Week 7: 23/03/2021

Currently, we are just using dummy data rendered from within the component (not recommended!). Of
course, we want to connect everything to our newly created API!

Best practices recommend defining a provider or service to handle the http calls. Services are great
because they are injectable, and they can also have its own injected dependencies. This makes testing
and reuse easier. Of course a service could go and get data from basically anywhere - a web service,
filesystem, or a mock data source.

Building on the example you've developed so far we are going to be developing a data service and
hooking it up to our application components (a Radar chart). This will give you an example by which
you can amend your own components to connect directly via a service to your database API.

> ### Milestone checklist
> - [ ] Essential: [Workshop walkthrough](videos/4.ogg)
> - [ ] Essential: [Introduction to Services](https://angular.io/tutorial/toh-pt4) (10 minutes)
> - [ ] Essential: Connect your dashboard to your API via a service
> - [ ] Recommended: [Read about httpClient module](https://angular.io/guide/http)
***
## Update your API
When you created your API (a few weeks ago) using Express you'll remember we just returned 'api works' when the API was called. We now need to update the API so that it returns something we can use in our charts (Data!). Initially we are going to serve the data from a static JSON file on the server. This is a placeholder for our Database. First create a file ```data.json``` in the same folder as your ```api.js``` file. Add the following data to the file:
```
{
	"radarChartLabels":["Q4","Q3","Q2","Q1"],
	"radarChartData":[{"data": [120, 130, 180, 70], "label": "1917"}, {"data": [90, 150, 200, 45], "label": "1918"}]
}
```
We can think of this file as a single return value from our API: it's a set of labels and data. Now you need to make sure this file is required in your api.js file (which will throw an error if not present) then parse and return this data if present when called. Update ```api.js```:
```
const express = require('express');
const router = express.Router();
const data = require('./data.json')

/* GET api listing. */
router.get('/', function (req, res) {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
})

module.exports = router;
```
Now try calling your api using the curl request demonstrated previously. Check the data is returned correctly. 

## Create a service

```shell
ng generate service data
```

This creates a data.service.ts in the src/app directory.

## Update the data service

We now need to make sure the service makes the right call to our API: ```src/app/data.service.ts```. We also need to make use of the HttpClient module to handle requests. 

```ts
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

We return to our app-Module and make sure to import the new servce:

```ts
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {DataService} from './data.service';

import {ChartsModule} from 'ng2-charts';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {RadarChartComponent} from './radar-chart/radar-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    RadarChartComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Editing the Radar chart

We can then make use of this service inside our components. Remember the component calls the
service: which in turn exposes the data to the HTML in the form of a structure. Ideally valiation
occurs on the server side.

```ts
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
          // now let's update the fields
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

Now let's look at the HTML and see how this pulls through from the component. We are reusing the
existing variable names we set before so there is little we need to do here now:

```html
<div style="display: block">
    <canvas baseChart
            [datasets]="radarChartData"
            [labels]="radarChartLabels"
            [chartType]="radarChartType"></canvas>
</div>
```

Build and serve the site using your express server to make sure it works! And congratulations,
you've created your first RESTful API!

