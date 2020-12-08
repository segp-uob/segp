import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import record from 'rrweb/lib/rrweb.js'

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
