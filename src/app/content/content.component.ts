import { Component } from '@angular/core';
import { Article } from '../Models/article.model';
import { Category } from '../Models/category.model';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { PagedResult } from '../Models/pagingResult.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  articles: Article[] = []; // Makale verilerini saklamak için dizi
  categories: Category[] = []; // Kategori verilerini saklamak için dizi
  errorMessage: string | null = null;
  totalItems = 0;
  pageNumber = 1;
  pageSize = 6;
  Math = Math;
  selectedCategoryId: number | null=null;
  searchKeyword: string = '';
  


  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getArticles();
    this.getCategories();
  }

  getArticles(): void {
    console.log("get article başında selectedCategoryId:",this.selectedCategoryId)
   
    this.dataService.getPagedArticles(this.pageNumber, this.pageSize,this.selectedCategoryId,this.searchKeyword).subscribe({
      next: (result: PagedResult<Article>) => {
        this.articles = result.items;
        this.totalItems = result.totalItems;
  
        // Her makale için görüntülenme sayısını al
        this.articles.forEach(article => {
          this.getArticleViewsCount(article); // Her makale için görüntülenme sayısını al
        });
      },
      error: (err) => {
        this.errorMessage = 'Makaleleri alırken hata oluştu: ' + err.message;
      }
    });
  }
  onPageChange(page: number): void {
    this.pageNumber = page;
    this.getArticles();
  }
  onSearchChange(): void {
    // Her arama değişikliğinde sayfa numarasını sıfırla ve yeni istek gönder
    this.pageNumber = 1;
    console.log('Arama Anahtar Kelimesi:', this.searchKeyword);
    this.getArticles();
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
  onCategoryChange(): void {
    console.log(' on category change basşında Selected Category ID:', this.selectedCategoryId);
    if (!this.selectedCategoryId) {
      this.selectedCategoryId = null;
    }
    
    
      // Tüm kategorilere geri dönüldüğünde sayfa numarasını 1 yaparak filtreyi sıfırla
    this.pageNumber = 1;
    console.log("on category change sonunda selectedCATEGORYId",this.selectedCategoryId);
    
    this.getArticles(); // Filtreye göre makaleleri getir
  }
  goToArticle(id: number): void {
    // Makaleye gitme işlevselliğini burada yönlendirebilirsiniz
    console.log(`Makaleye git: ${id}`);
  }
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Bilinmiyor'; // Kategori bulunamazsa 'Bilinmiyor' yaz
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
