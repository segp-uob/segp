# Angular dashboard

A common usecase for the Angular framework, and indeed web applications in general, is to display data. In this workshop we will be extending the 'boilerplate' Angular application to include our own charts and data. We will be using a few other node modules so we will cover installing those and integrating third party tools (which you almost certainly will do!). 

## Create a template project
We are going to start with the boilerplate project previously created and add components. This should serve as a demonstration of how to get up and running with a fully responsive application. We are going to make use of the Bootstrap styling framework: The Bootstrap grid system uses containers that hold rows and column. Rows and columns are percentage based. It is the container that changes responsively.
```
ng new dashboard --routing

cd dashboard
npm install ng2-charts
npm install chart.js
npm install bootstrap
```
To make use of the charting framework we need to add the following script to the 'build' in the angular.jsonfile. This will ensure scripts are added where required to the HTML body. You can see in build: { } object; you just need to add this script:
```
"scripts": ["node_modules/chart.js/dist/Chart.js"]
```
We are making use of Bootstrap, so add the following line to styles.css:
```
@import '~bootstrap/dist/css/bootstrap.min.css';
```
## Create a menu component

Edit the boilerplate HTML in app.component.html
```
<div class="container">
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link" routerLink="/bar-chart">Bar Chart</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" routerLink="/doughnut-chart">Doughnut Chart</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" routerLink="/radar-chart">Radar Chart</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" routerLink="/pie-chart">Pie Chart</a>
    </li>
  </ul>
  <div>
      <router-outlet></router-outlet>
  </div>
</div>
```
## Creata a Bar Chart
```
ng g c bar-chart
```
This adds:

1. src/app/bar-chart/bar-chart.component.html
2. src/app/bar-chart/bar-chart.component.ts
3. src/app/bar-chart/bar-chart.component.css
4. src/app/bar-chart/bar-chart.component.spec.ts

Open bar-chart.component.html and replace the boilerplate <p>bar-chart works!</p>content with:
```
<div>
  <div style="display: block">
    <canvas baseChart
            [datasets]="barChartData"
            [labels]="barChartLabels"
            [options]="barChartOptions"
            [legend]="barChartLegend"
            [chartType]="barChartType">
    </canvas>
  </div>
</div>
```
Here we’re using the baseChart directive which is added to a canvas element. Furthermore the attributes datasets, labels, options, legend and chartType are bound to class members which are added to the implementation of class MyBarChartComponent in my-bar-chart-component.ts:
```
import { Component, OnInit } from '@angular/core';@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {  constructor() { }  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];  ngOnInit() {
  }}
```
## Create a Doghnut
```
ng g c doughnut-chart
```
Again update doughnut-chart.component.html:
```
<div style="display: block">
  <canvas baseChart
              [data]="doughnutChartData"
              [labels]="doughnutChartLabels"
              [chartType]="doughnutChartType"></canvas>
</div>
```
And insert the following TS into doughnut-chart.component.ts
```
import { Component, OnInit } from '@angular/core';@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class MyDoughnutChartComponent implements OnInit {  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';  constructor() { }  ngOnInit() {
  }}
```
## Create a Radar chart

Again we’re starting by creating a new component:
```
ng g c radar-chart
```
Here is the HTML code which needs to be inserted in my-radar-chart.component.html:
```
<div style="display: block">
  <canvas baseChart
          [datasets]="radarChartData"
          [labels]="radarChartLabels"
          [chartType]="radarChartType"></canvas>
</div>
```
And in my-radar-chart.component.ts:
```
import { Component, OnInit } from '@angular/core';@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    {data: [120, 130, 180, 70], label: '2017'},
    {data: [90, 150, 200, 45], label: '2018'}
  ];
  public radarChartType = 'radar';  constructor() { }  ngOnInit() {
  }}
```
## Pie Chart Example

The final component is used to add a pie chart example to our application:
```
ng g c pie-chart
```
HTML code in my-pie-chart.component.html:
```
<div style="display: block">
  <canvas baseChart
          [data]="pieChartData"
          [labels]="pieChartLabels"
          [chartType]="pieChartType"></canvas>
</div>

In pie-chart.component.ts:

import { Component, OnInit } from '@angular/core';@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';  constructor() { }  ngOnInit() {
  }}
```
# Router Configuration

Finally we need to make sure that the router configuration is in place. This ensures that when components are called our service knows where to render the data from. We will be coming back to the topic of routing a lot of the coming weeks - for now a basic example: 

## Update app.module
First we need to make sure the main imports are present to reflect our additions: 

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
## Update app.routing-module.ts
Next we make sure the routing is in place:

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

const routes: Routes = [
  {path: 'bar-chart', component: BarChartComponent},
  {path: 'doughnut-chart', component: DoughnutChartComponent},
  {path: 'radar-chart', component: RadarChartComponent},
  {path: 'pie-chart', component: PieChartComponent},
  {path: '**', component: BarChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
## Running the example! 
```
ng serve
```
As a result you should now be able to see the basic application. Crucially the data is served by the components themselves (TS) at the moment. Obviously the next step is to connect up to a fully functioning API via Express and Node. 

