import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../Models/login-request.model';
import { RegisterRequest } from '../Models/register-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      
    });
  }

  // Login fonksiyonu
  onSubmit(): void {
    console.log("onsubmit çalıştı.")
    if (this.registerForm.invalid) {
      console.log("Form geçersiz.");
    }

    const registerRequest: RegisterRequest = {
      ...this.registerForm.value,
      role: 'user' // Varsayılan olarak 'user' rolünü ekliyoruz
    };

    this.dataService.register(registerRequest).subscribe(
      (response) => {
        console.log("Giriş Başarılı:");
        this.dataService.saveToken(response.token);
        this.router.navigate(['/login']); // Başarılı giriş sonrası yönlendirme
      },
      (error) => {
        console.log("Giriş Hatası:", error); 
        this.errorMessage = error.error.message || 'Giriş başarısız.';
      }
    );
  }

}
