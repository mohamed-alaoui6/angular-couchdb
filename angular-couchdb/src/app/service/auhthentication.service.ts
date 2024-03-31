import { Injectable } from '@angular/core';
import { Appuser } from '../model/user.model';
import { Observable, of, throwError } from 'rxjs';
import { off } from 'process';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class AuhthenticationService {

users:Appuser[]=[];
authenticateduser:Appuser|undefined;
  constructor() {

    this.users.push({username:"user",password:"user",role:['USER']});
    this.users.push({username:"admin",password:"admin",role:['ADMIN']});
    

   }

   public login(username:string,password:string):Observable<Appuser>{

    let appuser = this.users.find(u=>u.username==username);
    if(!appuser) return throwError(()=>new Error ("user not found"));
    if(appuser.password!=password){

      return throwError(()=>new Error ("user not found"));  
    }
    return of(appuser);
   }

   public authenticatuser(appuser:Appuser):Observable<boolean>{

    this.authenticateduser=appuser;
    localStorage.setItem("authuser",JSON.stringify({username:appuser.username,roles:appuser.role,jwt:"jwt_tocken"}));
    return of(true);
   }

 public hasrole(roles:string):boolean{
   return this.authenticateduser!.role.includes(roles);

 }

 public isauthenticated(){

  return this.authenticateduser!=undefined;

 }

 public logout():Observable<boolean>{

this.authenticateduser=undefined;
localStorage.removeItem("authuser")
  return of(true);
 }
}
