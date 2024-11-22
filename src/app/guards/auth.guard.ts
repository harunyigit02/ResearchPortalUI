import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private dataService: DataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.dataService.isAuthenticated();

    // Kullanıcı doğrulanmamışsa login sayfasına yönlendir
    if (!isAuthenticated) {
      if (state.url === '/register') {
        return true; // Register sayfasına erişime izin ver
      }
      this.router.navigate(['/login']); // Login sayfasına yönlendir
      return false;
    }

    return true; // Doğrulanmış kullanıcılar için erişime izin ver
  }
}
