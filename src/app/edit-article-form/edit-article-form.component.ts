import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../Models/article.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-article-form',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './edit-article-form.component.html',
  styleUrl: './edit-article-form.component.css'
})
export class EditArticleFormComponent {
  articleId!:number;
  article!:Article
  articleForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  categories: any[] = [];

  constructor(private dataService:DataService, private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,){}


    ngOnInit(): void {
      // Formu oluştur
      this.articleForm = this.fb.group({
        title: ['', Validators.required],
        categoryId: ['', Validators.required],
        description: ['', Validators.required],
        content: ['', Validators.required],
      });
  
      const articleId = this.route.snapshot.paramMap.get('id');
      console.log("articleId:",articleId)
      
      this.loadArticle(Number(articleId))
      
  
      // Kategorileri çek (Gerekiyorsa)
      this.loadCategories();
    }


    loadArticle(articleId: number): void {
      this.dataService.getArticleById(articleId).subscribe({
        next: (data) => {
          this.article = data;
          console.log("article data:", this.article);
          
          // Veriyi alıp formu güncelleme
          this.articleForm.patchValue({
            title: this.article.title,
            categoryId: this.article.categoryId,
            description: this.article.description,
            content: this.article.content
          });
        },
        error: (err) => {
          console.error('Makale yüklenirken hata oluştu:', err);
        }
      });
    }

  loadCategories(): void {
    this.dataService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        
      },
      error: (err) => {
        console.error('Kategoriler yüklenirken hata oluştu:', err);
      }
    });
  }


  updateArticle(id:number): void {
    if (this.articleForm.invalid) {
      return;
    }

    this.isLoading = true;
    const updatedArticle = {
      
      ...this.articleForm.value
    };

    this.dataService.updateArticle(id,updatedArticle).subscribe({
      next: () => {
        this.successMessage = 'Makale başarıyla güncellendi!';
        setTimeout(() => {
          this.router.navigate(['/articles']); // Güncelleme sonrası yönlendirme
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = 'Güncelleme sırasında hata oluştu.';
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}




