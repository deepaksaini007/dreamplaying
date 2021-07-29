import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from '../../services/store-service/store.service';

@Injectable({
  providedIn: 'root',
})
export class UserRoleGuard implements CanActivate {
  constructor(private storeService: StoreService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const a = this.storeService.assignedMenus$.pipe(
      map((assignedMenu) => {
        console.log(assignedMenu);
        return assignedMenu.some((menu) => {
          return menu.menu_url === route.routeConfig?.path;
        });
      })
    );
    // return a;
    return true;
  }
}
