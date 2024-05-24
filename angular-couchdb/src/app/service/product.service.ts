import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';

import { product } from '../products/product';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://127.0.0.1:5984/mydata'; 

  constructor(private http: HttpClient) {}

  public getAllProduct(): Observable<product[]> {
    const url = `${this.baseUrl}/_all_docs?include_docs=true`;
    return this.http.get<any>(url).pipe(
      map(response => response.rows.map((row: { doc: any }) => new product(
        row.doc._id,
        row.doc.name,
        row.doc.category,
        row.doc.price,
        row.doc.url_image,
        row.doc.quantite,
        row.doc.description,
        row.doc.qeerebyasali,
        row.doc._rev
      )))
    );
  }

  getImageURL(p: product): string {
    return "assets/images/" + p.url_image;
  }

  public buying(p: product): Observable<boolean> {
    --p.quantite;
    
    
    return this.updateQuantity(p);
  }

  public deleteProduct(id: string): Observable<boolean> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
        switchMap((doc: any) => {
            const rev: string = doc._rev;
            return this.http.delete(`${this.baseUrl}/${id}?rev=${rev}`).pipe(
                map(() => true), 
                catchError((error: any) => {
                    return of(false); 
                })
            );
        }),
        catchError((error: any) => {
            return of(false); 
        })
    );
}

      
public updateQuantity(p: product): Observable<boolean> {
  const url = `${this.baseUrl}/${p.id}`;

  
  return this.http.get<any>(url).pipe(
    switchMap((doc: any) => {
      
      const updatedProduct = new product(
        doc._id,
        doc.name,
        doc.category,
        doc.price,
        doc.url_image,
        p.quantite, 
        doc.description,
        doc.qeerebyasali,
        doc._rev
      );

      const body = {
        _id: updatedProduct.id,
        name: updatedProduct.name,
        category:updatedProduct.category,
        price: updatedProduct.price,
        url_image: updatedProduct.url_image,
        quantite: updatedProduct.quantite,
        description: updatedProduct.description,
        qeerebyasali: updatedProduct.qeerebyasali,
        _rev: updatedProduct.rev
      };

      
      return this.http.put<any>(url, body).pipe(
        map(() => true), 
        catchError((error: any) => {
          console.error('Error updating product quantity:', error);
          return of(false); 
        })
      );
    }),
    catchError((error: any) => {
      console.error('Error fetching latest revision of the document:', error);
      return of(false); 
    })
  );
}

public addProduct(p: product): Observable<boolean> {
 
  const url = `${this.baseUrl}`;

  
  return this.http.get<any>(url).pipe(
    switchMap((doc: any) => {
      
      const addp = new product(
        doc._id,
        p.name,
        p.category,
        p.price,
        p.url_image,
        p.quantite, 
        p.description,
        doc.qeerebyasali=false,
        doc._rev
      );

      const body = {
        _id: addp.id,
        name: addp.name,
        price: addp.price,
        category:addp.category,
        url_image: addp.url_image,
        quantite: addp.quantite,
        description: addp.description,
        qeerebyasali: addp.qeerebyasali,
        _rev: addp.rev
      };

      
      return this.http.post<any>(url, body).pipe(
        switchMap(() => {
          
          return this.getAllProduct().pipe(
            map(() => true), 
            catchError((error: any) => {
              console.error('Erreur lors de la récupération de tous les produits après l\'ajout:', error);
              return of(false); 
            })
          );
        }),
        catchError((error: any) => {
          console.error('Erreur lors de l\'ajout du produit:', error);
          return of(false); 
        })
      );
    }),
    catchError((error: any) => {
      console.error('Erreur lors de la récupération des données avant l\'ajout:', error);
      return of(false); 
    })
  );
}


private cartItems: product[] = [];
  private cartItemsSubject: BehaviorSubject<product[]> = new BehaviorSubject<product[]>([]);



  addToCart(item: product): void {
    this.cartItems.push(item);
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItems(): Observable<product[]> {
    return this.cartItemsSubject.asObservable();
  }
  removeFromCart(item: product): void {
    const index = this.cartItems.findIndex(p => p.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsSubject.next(this.cartItems);
    }
  }
  

  public getProductsByCategory(category: string): Observable<product[]> {
    const url = `${this.baseUrl}/_find`;
    const body = {
      selector: {
        category: category
      }
    };

    return this.http.post<any>(url, body).pipe(
      map(response => {
        if (response.docs && response.docs.length > 0) {
          return response.docs.map((doc: any) => {
            return new product(
              doc._id,
              doc.name,
              doc.category,
              doc.price,
              doc.url_image,
              doc.quantite,
              doc.description,
              doc.qeerebyasali,
              doc._rev
            );
          });
        } else {
          return []; // Retourner un tableau vide si aucun produit trouvé pour la catégorie donnée
        }
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des produits par catégorie:', error);
        return of([]); // Retourner un tableau vide en cas d'erreur
      })
    );
  }
  
    // Méthode pour récupérer un produit par ID
    public getProductById(id: string): Observable<product> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.get<any>(url).pipe(
        map(doc => new product(
          doc._id,
          doc.name,
          doc.category,
          doc.price,
          doc.url_image,
          doc.quantite,
          doc.description,
          doc.qeerebyasali,
          doc._rev
        )),
        catchError(error => {
          console.error('Erreur lors de la récupération du produit par ID:', error);
          return throwError(error);
        })
      );
    }
  
    // Méthode pour mettre à jour un produit
    public updateProduct(p: product): Observable<boolean> {
      const url = `${this.baseUrl}/${p.id}`;
      const body = {
        _id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        url_image: p.url_image,
        quantite: p.quantite,
        description: p.description,
        qeerebyasali: p.qeerebyasali,
        _rev: p.rev
      };
  
      return this.http.put<any>(url, body).pipe(
        map(() => true),
        catchError(error => {
          console.error('Erreur lors de la mise à jour du produit:', error);
          return of(false);
        })
      );
    }
  

  

}
