import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../reclamation.service';
import * as Highcharts from 'highcharts'; // Import Highcharts

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private reclamationService: ReclamationService) {}

  ngOnInit() {
    this.reclamationService.calculateWeeklyReclamations().subscribe(
      (data) => {
        this.renderChart(data);
      },
      (error) => {
        console.error('Error fetching weekly reclamations:', error);
      }
    );
  }

  renderChart(data: any) {
    const weeks = Object.keys(data);
    const reclamationCounts = Object.values(data);

    Highcharts.chart('lineChart', {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Weekly Reclamation Statistics',
      },
      xAxis: {
        categories: weeks,
      },
      yAxis: {
        title: {
          text: 'Number of Reclamations',
        },
      },
      series: [
        {
          name: 'Weekly Reclamations',
          data: reclamationCounts,
        },
      ],
    } as Highcharts.Options); // Specify the type of options as Highcharts.Options
  }
}
