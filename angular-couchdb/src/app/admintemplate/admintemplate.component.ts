import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuhthenticationService } from '../service/auhthentication.service';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-admintemplate',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admintemplate.component.html',
  styleUrl: './admintemplate.component.css'
})
export class AdmintemplateComponent implements OnInit {

  cartItemCount: number = 0;
constructor(public authservice:AuhthenticationService,private router:Router,private cartService: ProductService){}
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.length;
    });
    
  }

  handlelogout(){

    this.authservice.logout().subscribe({

      next:(data)=>{

        this.router.navigateByUrl("/login");
      }



    })
  }
  
}
