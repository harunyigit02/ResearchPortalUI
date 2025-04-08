import { Component } from '@angular/core';
import { Article } from '../Models/article.model';
import { Category } from '../Models/category.model';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { PagedResult } from '../Models/pagingResult.model';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-articles',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './my-articles.component.html',
  styleUrl: './my-articles.component.css'
})
export class MyArticlesComponent {
  articles: Article[] = []; // Makale verilerini saklamak için dizi
  categories: Category[] = []; // Kategori verilerini saklamak için dizi
  errorMessage: string | null = null;
  pageNumber=1;
  pageSize=6;
  totalItems = 0;
  Math = Math;
  selectedCategoryId: number | null=null;
  searchKeyword: string = '';
  startDate:any;
  endDate:any;
  searchKeywordChanged = new Subject<string>();
  dropdownVisible: { [key: number]: boolean } = {};

  constructor(private dataService: DataService,private router:Router) {
    this.searchKeywordChanged.pipe(debounceTime(500)).subscribe(() => {
      this.onSearchChange();
    });
  }

  ngOnInit(): void {
    this.getUserArticles(); // Kullanıcıya özel makaleleri al
    this.getCategories(); // Kategorileri al
  }

  

  toggleDropdown(articleId: number) {
    // Eğer zaten açıksa, kapat; değilse, aç
    this.dropdownVisible[articleId] = !this.dropdownVisible[articleId];
    console.log("articleID:",articleId);
    console.log("asd:",this.dropdownVisible[articleId]);
  }


  

  editArticle(articleId: number): void {
    console.log(`Makale düzenleniyor: ${articleId}`);
    this.router.navigate([`edit-article/${articleId}`])
    // Burada düzenleme işlemi yapılacak (düzenleme sayfasına yönlendirme vs.)
  }

  downloadArticle(id:number){
    this.dataService.downloadArticle(id).subscribe({
      next: (response) => {
        const blob = response as Blob;

        // 📦 Tarayıcının dosya adını kullanması için Content-Disposition'ı bırakıyoruz
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;

        // ❗ Dosya adını manuel belirlemeden bırakıyoruz (tarayıcı kendi alıyor)
        a.download = `Makale_${id}.pdf`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
  }

  

    });
}

  // Kaydetme işlemi
  saveArticle(articleId: number): void {
    console.log(`Makale kaydediliyor: ${articleId}`);
    // Kaydetme işlemi yapılacak
  }

  getUserArticles(): void {
    const token = localStorage.getItem('jwt_token'); // Token'ı localStorage'dan al

    if (token) {
      this.dataService.getUserArticles(token,this.pageNumber, this.pageSize,this.selectedCategoryId,this.searchKeyword,this.startDate,this.endDate).subscribe({

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
  onSearchChange(): void {
    // Her arama değişikliğinde sayfa numarasını sıfırla ve yeni istek gönder
    this.pageNumber = 1;
    console.log('Arama Anahtar Kelimesi:', this.searchKeyword);
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
  onCategoryChange(): void {
    console.log(' on category change basşında Selected Category ID:', this.selectedCategoryId);
    if (!this.selectedCategoryId) {
      this.selectedCategoryId = null;
    }



      // Tüm kategorilere geri dönüldüğünde sayfa numarasını 1 yaparak filtreyi sıfırla
    this.pageNumber = 1;
    console.log("on category change sonunda selectedCATEGORYId",this.selectedCategoryId);

    this.getUserArticles(); // Filtreye göre makaleleri getir
  }

  onDateChange():void {

    this.pageNumber = 1;
    console.log('baslangic tarihi:',this.startDate);
    console.log('bitiş tarihi:',this.endDate);
    this.getUserArticles();
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

  deleteArticle(id: number): void {
    if (confirm('Bu makaleyi silmek istediğinizden emin misiniz?')) {
      this.dataService.deleteArticle(id).subscribe({
        next: () => {
          // Silme işlemi başarılı olursa makale listesini güncelle
          this.articles = this.articles.filter(article => article.id !== id);
          this.getUserArticles();
        },
        error: (err) => {
          this.errorMessage = 'Makale silinirken hata oluştu: ' + err.message;
        }
      });
    }
  }

}
