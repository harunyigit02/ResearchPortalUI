import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    // İlk başta oturum durumunu kontrol et
  }
  get isLoggedIn(): boolean {
    return this.dataService.isAuthenticated(); // DataService üzerinden oturum durumu kontrolü
  }

  onAuthAction(): void {
    if (this.isLoggedIn) {
      this.dataService.logout();  // Logout işlemi
      this.router.navigate(['/login']); // Logout sonrası login sayfasına yönlendirme
    } else {
      this.router.navigate(['/login']); // Login sayfasına yönlendirme
    }
  }

}
