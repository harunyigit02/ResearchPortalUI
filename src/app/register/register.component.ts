import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
      password: new FormControl('', [Validators.required, Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      
    },
    { validators: this.passwordsMatchValidator }
  );
  }
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // Login fonksiyonu
  onSubmit(): void {
    console.log("onsubmit çalıştı.")
    this.errorMessage = ''; // Hata mesajını sıfırla

    // Şifrelerin eşleşip eşleşmediğini kontrol et
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Şifreler eşleşmiyor!';
      return;
    }
   
    if (this.registerForm.invalid) {
      console.log("Form geçersiz.");
    }

    const registerRequest: RegisterRequest = {
      ...this.registerForm.value
       // Varsayılan olarak 'user' rolünü ekliyoruz
    };

    this.dataService.register(registerRequest).subscribe(
      (response) => {
        console.log("Giriş Başarılı:");
        this.dataService.saveToken(response.token);
        this.dataService.saveEmailLocal(registerRequest.email)
        this.router.navigate(['/email-verification']); // Başarılı giriş sonrası yönlendirme
      },
      (error) => {
        console.log("Giriş Hatası:", error); 
        this.errorMessage = error.error.message || 'Giriş başarısız.';
      }
    );
  }

}
