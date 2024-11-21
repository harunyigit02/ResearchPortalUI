import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../Models/login-request.model';

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
        console.log("Giriş Başarılı:", response);
        this.authService.saveToken(response.token);
        this.router.navigate(['/articles']); // Başarılı giriş sonrası yönlendirme
      },
      (error) => {
        console.log("Giriş Hatası:", error); 
        this.errorMessage = error.error.message || 'Giriş başarısız.';
      }
    );
  }

}
