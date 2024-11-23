import { Component } from '@angular/core';
import { Article } from '../Models/article.model';
import { Category } from '../Models/category.model';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { PagedResult } from '../Models/pagingResult.model';

@Component({
  selector: 'app-my-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-articles.component.html',
  styleUrl: './my-articles.component.css'
})
export class MyArticlesComponent {
  articles: Article[] = []; // Makale verilerini saklamak için dizi
  categories: Category[] = []; // Kategori verilerini saklamak için dizi
  errorMessage: string | null = null;
  pageNumber=1;
  pageSize=2;
  totalItems = 0;
  Math = Math;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getUserArticles(); // Kullanıcıya özel makaleleri al
    this.getCategories(); // Kategorileri al
  }

  getUserArticles(): void {
    const token = localStorage.getItem('jwt_token'); // Token'ı localStorage'dan al

    if (token) {
      this.dataService.getUserArticles(token,this.pageNumber, this.pageSize).subscribe({
        
        next: (result: PagedResult<Article>) => {
          
          this.articles = result.items;
          this.totalItems = result.totalItems;

          // Her makale için görüntülenme sayısını al
          this.articles.forEach(article => {
            this.getArticleViewsCount(article);
          });
        },
        error: (err) => {
          this.errorMessage = 'Makaleleri alırken hata oluştu: ' + err.message;
        }
      });
    } else {
      this.errorMessage = 'Kullanıcı girişi yapılmamış.';
    }
  }
  onPageChange(page: number): void {
    this.pageNumber = page;
    this.getUserArticles();
  }

  getCategories(): void {
    this.dataService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.errorMessage = 'Kategorileri alırken hata oluştu: ' + err.message;
      }
    });
  }

  goToArticle(id: number): void {
    console.log(`Makaleye git: ${id}`);
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Bilinmiyor';
  }

  getArticleViewsCount(article: Article): void {
    this.dataService.getArticleViewsCount(article.id).subscribe({
      next: (count) => {
        article.totalViews = count.viewsCount; // Makaleye viewsCount ekle
      },
      error: (err) => {
        this.errorMessage = 'Görüntülenme sayısını alırken hata oluştu: ' + err.message;
      }
    });
  }

}
