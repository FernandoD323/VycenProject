import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/model/company.model';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies: any
  company: CompanyModel
  newCompany: any
  isLoading:boolean = true

  constructor(
    private companyRest: CompanyRestService
  ) {
    this.company = new CompanyModel('', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getCompanies()
  }

  setLoading(loading: boolean) {
    if (loading == true) {
      this.isLoading = true
    } else {
      this.isLoading = false
    }
  }

  getCompanies() {
    this.setLoading(true)
    this.companyRest.getCompanies().subscribe({
      next: (res: any) => {
        this.setLoading(false)
        this.companies = res.companies
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
  }

  createCompany(form: any) {
    this.companyRest.createCompany(this.company).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
        this.getCompanies();
        form.reset();
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
  }

  getCompany(id: String) {
    this.companyRest.getCompany(id).subscribe({
      next: (res: any) => {
        this.newCompany = res.exist
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
  }

  updateCompany() {
    this.companyRest.updateCompany(this.newCompany._id, this.newCompany).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
        this.getCompanies();
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
  }

  deleteCompany(id: String) {
    this.companyRest.deleteCompany(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
        this.getCompanies();
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
  }

}
