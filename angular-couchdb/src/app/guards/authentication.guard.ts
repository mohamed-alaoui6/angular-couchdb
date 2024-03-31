import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuhthenticationService } from '../service/auhthentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {

  const authservice = inject( AuhthenticationService);
  const router=inject(Router);
  let authenticated = authservice.isauthenticated();
  
  if (authenticated==false) {
    router.navigateByUrl("/login");
    return false;
  } else {
    
    return true;
    
  }
};
