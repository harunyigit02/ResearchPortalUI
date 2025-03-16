import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileUser } from '../Models/profileUser.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user!:ProfileUser | null;
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getUserObservable().subscribe((user) => {
      this.user = user; // Oturum açan kullanıcıyı alıyoruz
    });

    const token = localStorage.getItem("jwt_token");

    if(token) this.getUser(token)
    // İlk başta oturum durumunu kontrol et
  }

  getUser(token:string){
    this.dataService.getUser(token).subscribe({
      next:(data)=>{
        this.user = data;
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:",this.user);

      }
    })
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
