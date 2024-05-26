import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../products/product';
import { ProductsComponent } from '../products/products.component';
import { AuhthenticationService } from '../service/auhthentication.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [ProductsComponent,CommonModule],
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {
searchProducts() {
throw new Error('Method not implemented.');
}

  @Output() addToCartEvent: EventEmitter<product> = new EventEmitter<product>();
  @Input() p!: product;
  @Output() buyEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter<product>();
  @Output() editEvent = new EventEmitter<product>();
  
  showDetails: boolean = false;


  constructor(public authss: AuhthenticationService,private productService: ProductService) {}

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
  togglePromo(p: product): void {
    p.isPromo = !p.isPromo; // Inverse l'état de la promotion
    this.productService.updatePromotionStatus(p).subscribe({
      next: (updated: boolean) => {
        if (updated) {
          console.log('État de la promotion mis à jour avec succès');
        } else {
          console.error('Erreur lors de la mise à jour de l\'état de la promotion');
        }
      },
      error: (err: any) => {
        console.error('Erreur lors de la mise à jour de l\'état de la promotion:', err);
      }
    });
  }
}
