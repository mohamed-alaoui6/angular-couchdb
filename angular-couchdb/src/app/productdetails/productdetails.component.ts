import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../products/product';
import { ProductsComponent } from '../products/products.component';
import { AuhthenticationService } from '../service/auhthentication.service';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {
  @Output() addToCartEvent: EventEmitter<product> = new EventEmitter<product>();
  @Input() p!: product;
  @Output() buyEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter<product>();
  @Output() editEvent = new EventEmitter<product>();
  
  showDetails: boolean = false;

  constructor(public authss: AuhthenticationService) {}

  toggleDetails(p: product): void {
    this.showDetails = !this.showDetails;
  }

  addToCart(product: product): void {
    this.addToCartEvent.emit(product);
  }

  buying() {
    return this.buyEvent.emit(this.p);
  }

  deleteProduct(p: product) {
    this.deleteEvent.emit(p);
  }

  editProduct() {
    this.editEvent.emit(this.p);
  }

  getImageURL(p: product): string {
    return "assets/images/" + p.url_image;
  }
}
