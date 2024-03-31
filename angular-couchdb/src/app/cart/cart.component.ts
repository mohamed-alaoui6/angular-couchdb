import { Component, OnInit } from '@angular/core';
import { product } from '../products/product';

import { ProductService } from '../service/product.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: product[] = [];

  constructor(private cartService: ProductService , private cart:ProductService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }
   
  removeFromCart(item: product): void {
    this.cartService.removeFromCart(item);
  }

}
