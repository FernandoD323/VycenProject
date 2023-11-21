import { Component, OnInit } from '@angular/core';
import { CartRestService } from 'src/app/services/cartRest/cart-rest.service';
import { ProductService } from 'src/app/services/productRest/product.service';
import { ReportService } from 'src/app/services/reportsRest/report.service';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartProducts: any
  total: number
  isLoading: boolean = true
  doc: jsPDF = new jsPDF();

  constructor(
    private cartRest: CartRestService,
    private reportsRest: ReportService,
    private productRest: ProductService
  ) {
    this.total = 0
  }

  ngOnInit(): void {
    this.getCart()
  }

  setLoading(loading: boolean) {
    if (loading == true) {
      this.isLoading = true
    } else {
      this.isLoading = false
    }
  }

  getCart() {
    this.setLoading(true)
    this.cartRest.getCart().subscribe({
      next: (res: any) => {
        this.setLoading(false)
        this.cartProducts = res.cart
        for (let t of this.cartProducts) {
          this.total += parseInt(t.subtotal)
        }
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

  createPDF(){

    autoTable(
      this.doc,
      {
        html: '#invoiceTable',
        theme: 'grid',
      });
    window.open(this.doc.output('bloburl'), '_blank');
    this.doc = new jsPDF()
  }

  payProducts(products: any[]) {
    products.forEach((element: any) => {
      let payload = {
        quantity: element.times,
      }
      this.productRest.buyProduct(element.product._id, payload).subscribe({
        next: (res: any) => {
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
    });
    this.cartRest.pay().subscribe({
      next: (res: any) => {
        this.createPDF()
        this.total = 0;
        Swal.fire({
          title: `${res.thanks}\nTotal: Q.${res.total}`,
          icon: 'success',
          confirmButtonText: `Exit!`,
          showConfirmButton: true,
        })
        this.getCart();
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
