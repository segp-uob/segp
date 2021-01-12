# Angular dashboard

A common usecase for the Angular framework, and indeed SPAs in general, is to display data. In the past complex and custom desktop software was required to create interactive 'data dashboards'. Now we can do everything in the modern web browser. Angular is brilliant for data driven applications but data viz tools are not included 'out of the box'. In this workshop we will therefore be extending the 'boilerplate' Angular application to include our own charts and data. We will be using a few other node modules so we will cover installing those and integrating third party tools (which you almost certainly will do!). Everyone should try to complete the walkthrough this week as it gives a solid foundation to understand how a MEAN stack site works...!

> ### Milestone checklist
> - [ ] Essential: [Workshop walkthrough](videos/3.ogg)
> - [ ] Recommended: [Intro to Chart.js (3 minutes)](https://www.youtube.com/watch?v=2UVHI9UaONw)
> - [ ] Recommended: [Intro to Bootstrap (60 minutes)](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
> - [ ] Essential: Add charts.js to your project and follow the worksheet task
> - [ ] Going further: [Angular Material Design](https://material.angular.io/components/categories)
> - [ ] Going further: [Explore other charts to integrate](https://www.chartjs.org/samples/latest/)
***

## Create a template project
We are going to start a new project called dashboard using Angularcli. This should serve as a demonstration of how to get up and running with a fully responsive application. We are going to make use of the Bootstrap styling framework: The Bootstrap grid system uses containers that hold rows and column. Rows and columns are percentage based. It is the container that changes responsively.
```
ng new dashboard --routing

cd dashboard
npm install ng2-charts
npm install chart.js
npm install bootstrap
```
## Add scripts
To make use of the charting framework we need to add the following script to the 'build' in the ```angular.json``` file. This will ensure scripts are added where required to the HTML body. We are going to add the Chart.js framework globally so it will be available to every component in your application. You can see in ```build: { }``` object; you just need to add this script:
```
"scripts": ["node_modules/chart.js/dist/Chart.js"]
```
We are making use of Bootstrap for styling, so add the following line to ```styles.css```:
```
@import '~bootstrap/dist/css/bootstrap.min.css';
```
If you've not used Bootstrap before it's not difficult to pick up. It's a great tool for styling and whoever in your team is responsible for the design of your application should probably use Bootstrap elements as a basis.  
## Create a menu
To enable us to navigate through our application lets start by creating a very simple navigation which needs to be applied to all pages. We therefore add it to our app component which will be loaded as our root class. Edit the boilerplate HTML in ```app.component.html```:
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
# Using Chart.js

Now we have setup the required dependancies we can actually create some charts! We use Angular components to ammend the HTML, styling and logic for our chart which is rendered. A 'component' controls a patch of screen called a 'view'. We interact with this view via properties and methods contained within the component. This approach means you can reuse and easily redevelop your application... follow this example and you'll understand the basics of Angular components. 

## Create a Bar Chart
First, lets create a simple bar chart. You could choose any chart from the Chart.js framework and the process will be very similar. To begin we need to ask Angularcli to create a new component called 'bar-chart'. We issue the following command: 
```
ng g c bar-chart
```
This command calls a utility function which helpfully adds:

1. src/app/bar-chart/bar-chart.component.html
2. src/app/bar-chart/bar-chart.component.ts
3. src/app/bar-chart/bar-chart.component.css
4. src/app/bar-chart/bar-chart.component.spec.ts

Go and open bar-chart.component.html and replace the boilerplate <p>bar-chart works!</p>content with something to load our newly created bar chart. We use the baseChart directive :
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
Here we’re using the baseChart directive which is added to a canvas element. Furthermore the attributes datasets, labels, options, legend and chartType are bound to class members which are added to the implementation of class BarChartComponent in bar-chart-component.ts:
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
export class DoughnutChartComponent implements OnInit {  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';  constructor() { }  ngOnInit() {
  }}
```
## Create a Radar chart

Again we’re starting by creating a new component:
```
ng g c radar-chart
```
Here is the HTML code which needs to be inserted in radar-chart.component.html:
```
<div style="display: block">
  <canvas baseChart
          [datasets]="radarChartData"
          [labels]="radarChartLabels"
          [chartType]="radarChartType"></canvas>
</div>
```
And in radar-chart.component.ts:
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
HTML code in pie-chart.component.html:
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
# Router and Options Configuration

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
## One last thing... 

Before running you need to make sure ```angularCompilerOptions``` are removed from your ```tsconfig.json```. In various recent versions of AngularCLI strict injection checking sometimes gets enabled in the boilerplate code which would prevent the Chart.js canvas render from working. Edit this file and make sure your ```tsconfig.json``` looks like the below:
```
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "module": "es2020",
    "lib": [
      "es2018",
      "dom"
    ]
  }
}
```

# Running the example! 
You've done it! Now to see how it looks:
```
ng serve
```
As a result you should now be able to see the basic application. Crucially the data is served by the components themselves (TS) at the moment. Obviously the next step is to connect up to a fully functioning API via Express and Node. 

## What next?
Why not try experimenting with the data or types of chart components in the relevant TS files? 

This workshop was based on an example you can explore further: https://medium.com/codingthesmartway-com-blog/angular-chart-js-with-ng2-charts-e21c8262777f
Why not try styling your page using other bootstrap examples: https://getbootstrap.com/docs/4.0/getting-started/introduction/

