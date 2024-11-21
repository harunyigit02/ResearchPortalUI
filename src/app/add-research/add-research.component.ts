import { Component } from '@angular/core';
import { Category } from '../Models/category.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-research',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-research.component.html',
  styleUrl: './add-research.component.css'
})
export class AddResearchComponent {
  categories: Category[] = [];
  researchForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  router: any;
  

  constructor(private dataService: DataService, private fb: FormBuilder,router:Router) {
    this.researchForm = this.fb.group({
      title: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      isFaceToFace:['', Validators.required],

      
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  addResearch(): void {
    if (this.researchForm.valid) {
      this.isLoading = true;
      const researchData = {
        ...this.researchForm.value,
        isFaceToFace: this.researchForm.value.isFaceToFace === 'true' // Dönüşüm burada yapılıyor
      };
      console.log("Veriler:",researchData);
      const token=localStorage.getItem("jwt_token");

      if(token){
        this.dataService.addResearch(researchData,token)
        .subscribe({
          next: response => {
            this.successMessage = 'Araştırma başarıyla eklendi!';
            this.errorMessage = null;
            this.researchForm.reset();
            this.isLoading = false;
          },
          error: error => {
            console.error('Araştırma ekleme hatası:', error);
            this.errorMessage = 'Araştırma eklenirken bir hata oluştu!';
            this.successMessage = null;
            this.isLoading = false;
          }
        });
      }
    } else {
      this.errorMessage = 'Form geçersiz! Lütfen gerekli alanları doldurun.';
      this.successMessage = null;
    }
  }

  getCategories(): void {
    this.dataService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (err) => {
        this.errorMessage = 'Kategorileri alırken hata oluştu: ' + err.message;
      }
    });
  }

  navigateCreateForm():void{
    this.router.navigate(['/add-research-form']);
    
  }
}
