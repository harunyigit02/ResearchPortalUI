import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Category } from '../Models/category.model';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.css'
})
export class AddArticleComponent {
  categories: Category[] = [];
  articleForm: FormGroup;
  isLoading = false; // Yükleme durumu için değişken
  successMessage: string | null = null; // Başarılı ekleme için mesaj
  errorMessage: string | null = null;

  constructor( private dataService:DataService, private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      categoryId: ['', Validators.required],       // Başlık için zorunlu alan
      description: ['', Validators.required],
      content: ['', Validators.required],  // Açıklama için zorunlu alan
      // Diğer alanlar için gerekli form kontrolünü ekleyebilirsiniz
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }

  addArticle(): void {
    if (this.articleForm.valid) {
      this.isLoading = true; // Yükleme durumunu başlat
      const token=localStorage.getItem("jwt_token");

      if(token){
        this.dataService.addArticle(this.articleForm.value,token)
        .subscribe({
          next: response => {
            this.successMessage = 'Makale başarıyla eklendi!'; // Başarılı mesajı
            this.errorMessage = null; // Hata mesajını sıfırla
            this.articleForm.reset(); // Formu sıfırla
            this.isLoading = false; // Yükleme durumunu bitir
          },
          error: error => {
            console.error('Makale ekleme hatası:', error);
            this.errorMessage = 'Makale eklenirken bir hata oluştu!'; // Hata mesajı
            this.successMessage = null; // Başarılı mesajı sıfırla
            this.isLoading = false; // Yükleme durumunu bitir
          }
        });
    } else {
      this.errorMessage = 'Form geçersiz! Lütfen gerekli alanları doldurun.'; // Hata mesajı
      this.successMessage = null; // Başarılı mesajı sıfırla
    }
      }
  }

  getCategories(): void {
    this.dataService.getCategories().subscribe({
        next: (data: Category[]) => {
            this.categories = data; // Kategorileri atayın
        },
        error: (err) => {
            this.errorMessage = 'Kategorileri alırken hata oluştu: ' + err.message;
        }
    });
}

  

}
