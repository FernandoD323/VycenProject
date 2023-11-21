import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartRestService } from 'src/app/services/cartRest/cart-rest.service';
import { CompanyRestService } from 'src/app/services/companyRest/company-rest.service';
import { ProductService } from 'src/app/services/productRest/product.service';
import { UserService } from 'src/app/services/userRest/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-see-products',
  templateUrl: './see-products.component.html',
  styleUrls: ['./see-products.component.css']
})
export class SeeProductsComponent implements OnInit {
  idProduct: any
  productInfo: any
  identity: any
  isLoading:boolean = true

  constructor(
    public activatedRoute: ActivatedRoute,
    private productRest: ProductService,
    private userRest: UserService,
    private cartRest: CartRestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((id: any) => {
      this.idProduct = id.get('id');
    })
    this.getProduct()
    this.identity = this.userRest.getIdentity().role;
  }

  setLoading(loading: boolean) {
    if (loading == true) {
      this.isLoading = true
    } else {
      this.isLoading = false
    }
  }


  getProduct() {
    this.setLoading(true)
    this.productRest.getProduct(this.idProduct).subscribe({
      next: (res: any) => {
        this.setLoading(false)
        this.productInfo = res.product
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

  addProduct(id: String) {
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

  quitProduct(id: String) {
    this.cartRest.quitProductCart(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
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

  updateProduct() {
    this.productRest.updateProduct(this.idProduct, this.productInfo).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        this.getProduct();
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
        this.getProduct();
      }
    })
  }

  deleteProduct(id: String) {
    Swal.fire({
      title: 'Are you sure to delete this product?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productRest.deleteProduct(id).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted',
              'The product has been deleted.',
              'success'
            )
            this.router.navigateByUrl('/product')
          },
          error: (err) => Swal.fire({
            title: err.error.message || err.error,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        })


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Canceled',
          text: 'Your account is safe',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }


}
