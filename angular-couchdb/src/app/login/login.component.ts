import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuhthenticationService } from '../service/auhthentication.service';

import { Router } from '@angular/router';
import { error } from 'console';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formgroup!:FormGroup;
  registerForm!: FormGroup;
  errormessage!:string;
  constructor(private fb:FormBuilder,
    private authservice:AuhthenticationService,
    private router:Router){
  }

  ngOnInit(): void {
    this.formgroup=this.fb.group({
      username : this.fb.control(""),
      password:this.fb.control("")
    });
    this.registerForm = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control(""),
      role: this.fb.control(['USER']) // Default role as USER
    });
  }
 
  handlelogin() {
     let username=this.formgroup.value.username;
     let password=this.formgroup.value.password;
     this.authservice.login(username,password).subscribe({


      next:(appuser)=>{
        this.authservice.authenticatuser(appuser).subscribe({
          next:(data)=>{
              this.router.navigateByUrl("/admin/navbar");
          }
        });
      },
      error:(err)=>{

        this.errormessage=err;
      }
     });
  }
  handleRegister(): void {
    let newUser = this.registerForm.value;
    this.authservice.register(newUser).subscribe({
      next: () => alert("Registration successful"),
      error: (err) => this.errormessage = err.message
    });
  }
}
