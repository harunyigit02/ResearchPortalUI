import { Component } from '@angular/core';
import { Research } from '../Models/research.model';
import { Category } from '../Models/category.model';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PagedResult } from '../Models/pagingResult.model';

@Component({
  selector: 'app-research-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './research-list.component.html',
  styleUrl: './research-list.component.css'
})
export class ResearchListComponent {


  researches: Research[] = [];
  categories: Category[] = [];
  errorMessage: string | null = null;
  pageNumber:number=1;
  pageSize:number=3;
  totalItems=0;
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
    this.dataService.getPublishedResearches(this.pageNumber,this.pageSize).subscribe({
      next: (data: PagedResult<Research>) => {
        this.researches = data.items; // API'den gelen araştırmalar
        this.totalItems = data.totalItems;
      },
      error: (err) => {
        this.errorMessage = 'Araştırmaları alırken hata oluştu: ' + err.message;
      }
    });
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
