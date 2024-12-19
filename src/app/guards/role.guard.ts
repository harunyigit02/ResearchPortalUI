import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from '../data.service';
 // Helper'ı import et

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router,private dataService:DataService) {}

 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('jwt_token'); // JWT token'ı localStorage'den al
    if (!token) {
      this.router.navigate(['/login']); // Token yoksa login sayfasına yönlendir
      return false;
    }
  
    const decodedToken = this.dataService.decodeToken(token); // Token'ı çözümle
    const userRole = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Role bilgisini doğru al
  
    console.log('Decoded Role:', userRole); // Debug: Token'dan alınan role bilgisini kontrol et
  
    // Expected roles dizisini al, boş olursa genel izin ver
    const expectedRoles: string[] = route.data['roles'] || [];
    
    if (expectedRoles.length === 0 || expectedRoles.includes(userRole)) {
      return true; // Eğer roles dizisi boşsa ya da kullanıcının rolü içeriyorsa erişime izin ver
    }
  
    // Yetkisiz erişim durumunda yönlendirme
    this.router.navigate(['/login']);
    return false;
  }
}
