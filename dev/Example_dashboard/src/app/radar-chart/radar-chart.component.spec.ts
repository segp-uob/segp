import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChartComponent } from './radar-chart.component';

describe('RadarChartComponent', () => {
  let component: RadarChartComponent;
  let fixture: ComponentFixture<RadarChartComponent>;
  let data: DataComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarChartComponent, DataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
