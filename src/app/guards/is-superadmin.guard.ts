import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { StorageService } from 'src/app/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IsSuperAdminGuard implements CanActivate {

  constructor(private storageService:StorageService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.storageService.getRole()!='SUPERADMIN' ) {
        this.router.navigate(['/dashboard/product'])
        return false;
      }
    return true;
  }

}
