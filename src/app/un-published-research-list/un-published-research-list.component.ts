import { Component } from '@angular/core';
import { Research } from '../Models/research.model';
import { Category } from '../Models/category.model';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagedResult } from '../Models/pagingResult.model';

@Component({
  selector: 'app-un-published-research-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './un-published-research-list.component.html',
  styleUrl: './un-published-research-list.component.css'
})
export class UnPublishedResearchListComponent {

  researches: Research[] = [];
  categories: Category[] = [];
  errorMessage: string | null = null;
  pageNumber=1;
  pageSize=1; 
  totalItems = 0;
  Math=Math;


  constructor(
    private router:Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getResearches();
    this.getCategories();
  }

  getResearches(): void {
    const token= localStorage.getItem("jwt_token");
    if(token){
      this.dataService.getUserResearches(token,this.pageNumber,this.pageSize).subscribe({
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

}
