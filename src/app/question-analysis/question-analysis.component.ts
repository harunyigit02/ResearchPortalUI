import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Research } from '../Models/research.model';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-analysis',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './question-analysis.component.html',
  styleUrl: './question-analysis.component.css'
})
export class QuestionAnalysisComponent {
  research!: Research;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  id!: number;
  selectedOption: any = null;
  selectedQuestion: any = null;
  analysisResult: any = null;
  errorMessageCheck: string | null = null;

  constructor( private dataService:DataService){}

  ngOnInit(): void {
    this.id=Number(localStorage.getItem("ResearchId"));
    this.getResearchesById(this.id);
  }

  getResearchesById(id:number): void {

    this.dataService.getResearchById(id).subscribe({
      next: (data: Research) => {
        this.research = data;
      },
      error: (err) => {
        this.errorMessage = 'Araştırmaları alırken hata oluştu: ' + err.message;
      }
    });
  }

  selectOption(optionId: number): void {
    this.selectedOption = optionId;
    this.selectedQuestion = null;
    console.log("selected Option:",this.selectedOption); // Yeni bir seçenek seçildiğinde soru sıfırlanır
  }

  // Soru Seçme
  selectQuestion(questionId: number): void {
    this.selectedQuestion = questionId;
    console.log("selected Question",this.selectedQuestion);
  }

  // Hesapla
  calculate(): void {
    if (this.selectedOption && this.selectedQuestion) {
      console.log('API request gönderiliyor:', {
        optionId: this.selectedOption,
        questionId: this.selectedQuestion
      });
  
      // API request yap
      this.dataService.getQuestionParticipantPercentage(this.selectedOption, this.selectedQuestion).subscribe(response => {
        this.analysisResult = response.map((item: any) => {
          // Seçeneklerin listesinden optionId'ye karşılık gelen optionText'i bul
          const question = this.research.questions.find(q => q.id === this.selectedQuestion);
          const option = question?.options.find(o => o.id === item.optionId);
          
          return {
            ...item,
            optionText: option?.optionText // optionText'i de ekliyoruz
          };
        });
        if(this.analysisResult.length == 0) {
          this.errorMessageCheck = "Girilen sorguya dair cevap bulunamadı.";
          console.log("error message:",this.errorMessageCheck);
        }
        console.log(this.analysisResult);
      });
    }
  }




}
