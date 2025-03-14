import { Component } from '@angular/core';
import { Research } from '../Models/research.model';
import { Category } from '../Models/category.model';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagedResult } from '../Models/pagingResult.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-un-published-research-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './un-published-research-list.component.html',
  styleUrl: './un-published-research-list.component.css'
})
export class UnPublishedResearchListComponent {

  researches: Research[] = [];
  categories: Category[] = [];
  errorMessage: string | null = null;
  pageNumber=1;
  pageSize=6;
  totalItems = 0;
  Math=Math;
  selectedCategoryId:number|null|undefined=null;
  searchKeyword: string = '';
  startDate:string|null=null;
  endDate:string|null=null;
  matched:any;
  dropdownVisible: { [key: number]: boolean } = {};


  constructor(
    private router:Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getResearches();
    this.getCategories();
  }

  toggleDropdown(researchId: number) {
    // Eğer zaten açıksa, kapat; değilse, aç
    this.dropdownVisible[researchId] = !this.dropdownVisible[researchId];
    console.log("researchId:",researchId);
    console.log("asd:",this.dropdownVisible[researchId]);
  }

  editResearch(researchId: number): void {
    console.log(`Makale düzenleniyor: ${researchId}`);
    // Burada düzenleme işlemi yapılacak (düzenleme sayfasına yönlendirme vs.)
  }

  // Kaydetme işlemi
  saveResearch(researchId: number): void {
    console.log(`Makale kaydediliyor: ${researchId}`);
    // Kaydetme işlemi yapılacak
  }

  getResearches(): void {
    const token= localStorage.getItem("jwt_token");
    if(token){
      this.dataService.getUserResearches(token,this.pageNumber,this.pageSize,this.selectedCategoryId,this.searchKeyword,this.startDate,this.endDate).subscribe({
        next: (data: PagedResult<Research>) => {
          this.researches = data.items; // API'den gelen araştırmalar
          this.totalItems = data.totalItems; // Toplam öğe sayısı

        },
        error: (err) => {
          this.errorMessage = 'Araştırmaları alırken hata oluştu: ' + err.message;
        }
      });
    }
    else {
      this.errorMessage = 'Kullanıcı girişi yapılmamış.';
    }
  }
  onPageChange(page: number): void {
    this.pageNumber = page;
    this.getResearches();
  }
  onSearchChange(): void {
    // Her arama değişikliğinde sayfa numarasını sıfırla ve yeni istek gönder
    this.pageNumber = 1;
    console.log('Arama Anahtar Kelimesi:', this.searchKeyword);
    this.getResearches();
  }
  onDateChange():void {
    this.pageNumber = 1;
    console.log('baslangic tarihi:',this.startDate);
    console.log('bitiş tarihi:',this.endDate);
    this.getResearches();
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

    this.getResearches(); // Filtreye göre makaleleri getir
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Bilinmiyor';
  }
  goToResearch(id: number): void {
    // Makaleye gitme işlevselliğini burada yönlendirebilirsiniz
    console.log(`Araştırmaya git: ${id}`);
    localStorage.setItem("ResearchId",id.toString())
    this.router.navigate([`/research-detail/${id}`]);
  }

  deleteResearch(id: number): void {
    if (confirm('Bu Araştırmayı silmek istediğinizden emin misiniz?')) {
      this.dataService.deleteResearch(id).subscribe({
        next: () => {
          // Silme işlemi başarılı olursa makale listesini güncelle
          this.researches = this.researches.filter(researches => researches.id !== id);
          this.getResearches();
        },
        error: (err) => {
          this.errorMessage = 'Araştırma silinirken hata oluştu: ' + err.message;
        }
      });
    }
  }


}
