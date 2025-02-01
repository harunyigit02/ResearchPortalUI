import { Component } from '@angular/core';
import { Research } from '../Models/research.model';
import { Category } from '../Models/category.model';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PagedResult } from '../Models/pagingResult.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-research-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './research-list.component.html',
  styleUrl: './research-list.component.css'
})
export class ResearchListComponent {


  researches: Research[] = [];
  categories: Category[] = [];
  errorMessage: string | null = null;
  pageNumber:number=1;
  pageSize:number=6;
  totalItems=0;
  Math=Math;
  selectedCategoryId:number|null|undefined=null;
  searchKeyword: string = '';
  matched:boolean=false;
  startDate: any = null;
  endDate: any = null;

  constructor(
    private router:Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getResearches();
    this.getCategories();
  }

  getResearches(): void {
    this.dataService.getPublishedResearches(this.pageNumber,this.pageSize,this.selectedCategoryId,this.searchKeyword,this.startDate,this.endDate).subscribe({
      next: (data: PagedResult<Research>) => {
        this.researches = data.items; // API'den gelen araştırmalar
        this.totalItems = data.totalItems;
      },
      error: (err) => {
        this.errorMessage = 'Araştırmaları alırken hata oluştu: ' + err.message;
      }
    });
  }

  getMatchedResearches():void{
    const token=localStorage.getItem("jwt_token");
    this.dataService.getMatchedResearches(token,this.pageNumber,this.pageSize,this.selectedCategoryId,this.searchKeyword,this.startDate,this.endDate).subscribe({
      next: (data: PagedResult<Research>)=>{
        this.researches = data.items; // API'den gelen araştırmalar
        this.totalItems = data.totalItems;
      },
      error: (err) =>{
        this.errorMessage = 'Eşleşen araştırmalar alınırken hata oluştu.'
      }
    })
  }
  onPageChange(page: number): void {
    this.pageNumber = page;
    if(this.matched==true) this.getMatchedResearches();
    else this.getResearches();
  }
  onSearchChange(): void {
    // Her arama değişikliğinde sayfa numarasını sıfırla ve yeni istek gönder
    this.pageNumber = 1;
    console.log('Arama Anahtar Kelimesi:', this.searchKeyword);
    if(this.matched== true) this.getMatchedResearches();
    else this.getResearches();
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
    if(this.matched == true) this.getMatchedResearches();
    else this.getResearches(); // Filtreye göre makaleleri getir
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
  onFilterChange(){
    console.log("selectedFilter:",this.matched);
    if(this.matched==true){
      this.getMatchedResearches();
    }
    else this.getResearches();
  }

  onDateChange():void {

    this.pageNumber = 1;
    console.log('baslangic tarihi:',this.startDate);
    console.log('bitiş tarihi:',this.endDate);
    this.getResearches();
  }

}
