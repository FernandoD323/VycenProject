import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/model/product.model';
import { CartRestService } from 'src/app/services/cartRest/cart-rest.service';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { ProductService } from 'src/app/services/productRest/product.service';
import { UserService } from 'src/app/services/userRest/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any
  company: any
  searchCompany: any
  product: ProductModel
  identity: any
  isLoading: boolean = true

  constructor(
    private productRest: ProductService,
    private companyRest: CompanyRestService,
    private cartRest: CartRestService,
    private userRest: UserService
  ) {
    this.product = new ProductModel('', '', '', '', 0, 0, new Date(), '');
    this.identity = userRest.getIdentity().role
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCompany();
  }

  searchC(id: String) {
    this.searchCompany = id
  }

  setLoading(loading: boolean) {
    if (loading == true) {
      this.isLoading = true
    } else {
      this.isLoading = false
    }
  }


  getCompany() {
    this.companyRest.getCompanies().subscribe({
      next: (res: any) => this.company = res.companies,
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

  getProducts() {
    this.setLoading(true);
    setTimeout(() => {

      this.productRest.getProducts().subscribe({
        next: (res: any) => {
          this.setLoading(false)
          this.products = res.products
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

  addProductCart(id: String) {
    this.cartRest.addProductCart(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
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

  createProduct(form: any) {
    this.productRest.createProduct(this.product).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
        this.getProducts();
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

}
