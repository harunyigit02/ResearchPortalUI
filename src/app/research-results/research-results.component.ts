import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-research-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './research-results.component.html',
  styleUrl: './research-results.component.css'
})
export class ResearchResultsComponent {
  researchId!:number; // Örnek olarak araştırma ID
  groupedAnswers: any[] = [];




  constructor(
      private router:Router,
      private dataService: DataService
    ) {}
  
    ngOnInit(): void {
     this.getResearchAnswers();
    }

    getResearchAnswers() {
      this.researchId= Number(localStorage.getItem("ResearchId"));
      this.dataService.getResearchAnswers(this.researchId).subscribe(response => {
        this.groupedAnswers = response;
      });
    }

    navigateQuestionAnalysis(){
      this.router.navigate(["/question-analysis"]);
    }

}
