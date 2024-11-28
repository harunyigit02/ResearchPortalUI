import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { VerifyEmail } from '../Models/verify-email.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent {

  

  successMessage: string | null = null; // Başarılı ekleme için mesaj
  errorMessage: string | null = null;
  verifyEmail: VerifyEmail = {email:'', verificationCode: '' };
  userEmail:string|null='';

  constructor(private dataService:DataService,private router:Router){}

  ngOnInit(){
     this.userEmail=this.dataService.getEmailLocal();
    if(this.userEmail){
      this.verifyEmail = {email:this.userEmail,verificationCode:this.verifyEmail.verificationCode}
    }
  }
  onSubmit(): void {
    // API isteğini gönderiyoruz
    this.dataService.verifyEmail(this.verifyEmail).subscribe({
      next: (response) => {
        this.successMessage = 'Doğrulama başarılı! Yönlendiriliyorsunuz...';
        this.errorMessage = null;
        // Giriş ekranına yönlendir
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Doğrulama hatası:', error);
        this.errorMessage = 'Doğrulama kodu geçersiz!';
        this.successMessage = null;
      }
    });
  }



}
