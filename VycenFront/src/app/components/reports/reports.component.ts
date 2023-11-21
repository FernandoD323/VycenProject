import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/reportsRest/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  // doughnutChartLabels: string[] = ['Ropero', 'Cajon', 'Blusa'];
  // doughnutChartData: number[] = [350, 450, 100];
  doughnutChartLabels: string[] = [];
  doughnutChartData: number[] = [];
  isLoading: boolean = true
  reports: any[] = []
  chartColors: any[] = [
    {
      backgroundColor: ["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"]
    }];


  constructor(
    private reportRest: ReportService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }


  setLoading(loading: boolean) {
    if (loading == true) {
      this.isLoading = true
    } else {
      this.isLoading = false
    }
  }

  getProducts() {
    this.setLoading(true);
    setTimeout(() => {

      this.reportRest.getReports().subscribe({
        next: (res: any) => {
          this.setLoading(false)
          let response = res.reports
          response.forEach((element: any) => {
            let name = `${element.product.name} ${element.product.size} ${element.product.sex}`
            this.doughnutChartLabels.push(name)
            this.doughnutChartData.push(element.quantity)
          });
          // this.reports = res.products
        },
        error: (err) => {
          Swal.fire({
            title: err.error.message || err.error,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
    }, 700)
  }
}
