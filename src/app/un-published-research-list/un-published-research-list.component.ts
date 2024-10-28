import { Component } from '@angular/core';
import { Research } from '../Models/research.model';
import { Category } from '../Models/category.model';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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


  constructor(
    private router:Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getResearches();
    this.getCategories();
  }

  getResearches(): void {
    this.dataService.getResearches().subscribe({
      next: (data: Research[]) => {
        this.researches = data;
      },
      error: (err) => {
        this.errorMessage = 'Araştırmaları alırken hata oluştu: ' + err.message;
      }
    });
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
