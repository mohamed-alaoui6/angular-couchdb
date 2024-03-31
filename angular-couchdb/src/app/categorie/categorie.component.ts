import { Component, OnInit } from '@angular/core';
import { product } from '../products/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { CommonModule } from '@angular/common';
import { AuhthenticationService } from '../service/auhthentication.service';
import { FormsModule } from '@angular/forms'; // Importez FormsModule

@Component({
  
  selector: 'app-categorie',
  standalone: true,
  styleUrls: ['./categorie.component.css'], // Utilisation de styleUrls pour importer le fichier CSS
  templateUrl: './categorie.component.html',
  imports:[CommonModule,FormsModule]

})
export class CategorieComponent implements OnInit {
  category!: string;
  filteredProducts!: product[];
  showDetails: boolean = false;

  constructor(private route: ActivatedRoute, private productService: ProductService,public auths:AuhthenticationService) { }
  newProduct: product = new product('', '', '', 0, '', 0, '', false, ''); // Nouveau produit à ajouter

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.filterByCategory(this.category);
    });
  }

  filterByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe(products => {
      this.filteredProducts = products;
    });
  }
  toggleDetails(p:product): void {
    this.showDetails = !this.showDetails; 
  }
  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(result => {
      if (result) {
        // Suppression réussie, mettre à jour la liste des produits filtrés
        this.filteredProducts = this.filteredProducts.filter(product => product.id !== productId);
      } else {
        // Gérer l'échec de la suppression
        console.error("Failed to delete product.");
      }
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
          this.newProduct = new product('', '', '', 0, '', 0, '', false, ''); // Réinitialiser le nouveau produit après l'ajout
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
  buying(product: product): void {
    this.productService.buying(product).subscribe({
      next: (updated: boolean) => {
        if (updated) {
          console.log('Produit acheté avec succès');
          // Vérifier la quantité disponible avant d'ajouter au panier
          if (product.quantite > 0) {
            this.addToCart(product);
          } else {
            console.error('La quantité du produit est insuffisante.');
          }
        } else {
          console.error('Erreur lors de l\'achat du produit');
        }
      },
      error: (err: any) => {
        console.error('Erreur lors de l\'achat du produit:', err);
      }
    });
  }
  
  
  
}
