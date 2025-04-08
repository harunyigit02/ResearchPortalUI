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
  selectedFile: File | null = null;


  constructor( private dataService:DataService, private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      categoryId: ['', Validators.required],       // Başlık için zorunlu alan
      description: ['', Validators.required],
        // Açıklama için zorunlu alan
      // Diğer alanlar için gerekli form kontrolünü ekleyebilirsiniz
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log("Seçilen dosya:", this.selectedFile); // DEBUG
    }
  }

addArticle(): void {
  if (this.articleForm.valid && this.selectedFile) {
    this.isLoading = true;
    const token = localStorage.getItem("jwt_token");

    const formData = new FormData();
    formData.append("file", this.selectedFile); // IFormFile parametresi
    formData.append("title", this.articleForm.get("title")?.value);
    formData.append("categoryId", this.articleForm.get("categoryId")?.value);
    formData.append("description", this.articleForm.get("description")?.value);

    // content artık textarea değil, PDF dosyası olduğundan gönderilmesine gerek yok

    if (token) {
      this.dataService.addArticle(formData, token).subscribe({
        next: (res) => {
          this.successMessage = "Makale başarıyla eklendi!";
          this.articleForm.reset();
          this.selectedFile = null;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Makale ekleme hatası:", err);
          this.errorMessage = "Makale eklenirken bir hata oluştu!";
          this.isLoading = false;
        }
      });
    }
  } else {
    this.errorMessage = "Form eksik veya PDF yüklenmedi.";
    this.successMessage = null;
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
