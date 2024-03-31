import { Component, EventEmitter, Input,Output } from '@angular/core';
import { product } from '../products/product';

import { ProductsComponent } from '../products/products.component';
import { AuhthenticationService } from '../service/auhthentication.service';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent {


  @Output() addToCartEvent: EventEmitter<product> = new EventEmitter<product>();
  @Input() p!:product;
  @Output() buyEvent = new EventEmitter();
  showDetails: boolean = false;
  @Output() deleteEvent = new EventEmitter<product>();
  

   constructor(public authss:AuhthenticationService){}
  toggleDetails(p:product): void {
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

getImageURL(p : product):string{
  return "assets/images/"+p.url_image;
}

}
