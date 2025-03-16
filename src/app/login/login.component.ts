import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../Models/login-request.model';
import { BehaviorSubject } from 'rxjs';
import { ProfileUser } from '../Models/profileUser.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  private userSubject = new BehaviorSubject<ProfileUser | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private authService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  // Login fonksiyonu
  onSubmit(): void {
    console.log("onsubmit çalıştı.")
    if (this.loginForm.invalid) {
      console.log("Form geçersiz.");
    }

    const loginRequest: LoginRequest = this.loginForm.value;

    this.authService.login(loginRequest).subscribe(
      (response) => {
        this.userSubject.next(response);
        console.log("Giriş Başarılı:", response);
        this.authService.saveToken(response.token);
        this.checkParticipantInfo(); // Başarılı giriş sonrası yönlendirme
      },
      (error) => {
        console.log("Giriş Hatası:", error); 
        this.errorMessage = error.error.message || 'Giriş başarısız.';
      }
    );
  }

  checkParticipantInfo() {
    console.log("checkinfoya girildi.");
    const token=localStorage.getItem("jwt_token");
    if(token){
      this.authService.getUserParticipantInfo(token).subscribe(
        (info) => {
          console.log("servisten dönen info:",info);
          if (!info || info.length === 0) {
            // Eğer "Participant Info" yoksa, form sayfasına yönlendir
            this.router.navigate(['/participant-form']);
          } else {
            // Eğer "Participant Info" varsa, başka bir sayfaya yönlendir
            this.router.navigate(['/articles']);
          }
        },
        (error) => {
          // Eğer veriye erişim hatası alırsak, hata mesajı gösterilebilir
          console.error('Error fetching participant info', error);
        }
      );
    }
  }

}
