  import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
  import { product } from './product';
  import { ProductService } from '../service/product.service';
  import { error } from 'console';
  import { ProductdetailsComponent } from '../productdetails/productdetails.component';
  import { FormsModule } from '@angular/forms'; 
  import { AuhthenticationService } from '../service/auhthentication.service';

  @Component({
    selector: 'app-products',
    standalone: true,
    imports: [ ProductdetailsComponent,FormsModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
  })
  export class ProductsComponent implements OnInit,OnChanges,OnDestroy {

    

  
    constructor(private productService:ProductService,public auths:AuhthenticationService){

      
    }
    
    newProduct: product = new product('', '','', 0, '', 0, '', false, '');

    errorMessage:string|undefined;
    products! : Array<product>;
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnDestroy(): void  { console.log("ondestroy declared! ")}
    getAllProduct(){
      
      
        this.productService.getAllProduct().subscribe({
          next: (data: any) => {
            
            this.products = data;
          },
          error: (err: any) => {
            this.errorMessage = err;
          },
        })
      
    }

  ngOnInit(): void {
    console.log("OnInit Declared !!");
    this.getAllProduct();
    
  }

  deleteProduct(p: product): void {
      this.productService.deleteProduct(p.id).subscribe(
        {
          next: (value: any) => {
            let index = this.products.indexOf(p);
            this.products.splice(index, 1);
          },
          error: (err: any) => {
            console.error('Error deleting product:', err);
            this.errorMessage = 'Error deleting product';
          },
        }
      );
    }




    buying(p: product) {
      if (p.quantite <= 5) {
        p.qeerebyasali = true;
      }
      
      this.productService.buying(p).subscribe({
        next: (value: any) => {
          
          if (p.quantite !== 0) {
            this.productService.updateQuantity(p).subscribe({
              next: (updated: boolean) => {
                if (updated) {
                  console.log('Product quantity updated successfully');
                } else {
                  console.error('Error updating product quantity');
                }
              },
              error: (err: any) => {
                console.error('Error updating product quantity:', err);
              }
            });
          }
        },
        error: (err: any) => {
          this.errorMessage = err;
        },
      });
    }
    
    addProduct(): void {
      
      if (!this.newProduct.url_image) {
        console.error('L\'URL de l\'image est indéfinie');
        return; 
      }
    
      this.productService.addProduct(this.newProduct).subscribe({
        next: (added: boolean) => {
          if (added) {
            console.log('Produit ajouté avec succès');
            
            this.newProduct = new product('', '','', 0, '', 0, '', false, '');
          } else {
            console.error('Erreur lors de l\'ajout du produit');
          }
        },
        error: (err: any) => {
          console.error('Erreur lors de l\'ajout du produit:', err);
        },
      });
      
    }

    addToCart(product: product): void {
      
      this.productService.addToCart(product);
    }

    getCartItems():void {
      this.productService.getCartItems();
    }
    
    getProductsByCategory(category: string): void {
      this.productService.getProductsByCategory(category).subscribe({
        next: (data: product[]) => {
          this.products = data;
        },
        error: (err: any) => {
          this.errorMessage = err;
        },
      });
    }
  };
