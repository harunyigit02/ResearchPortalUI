import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Research } from '../Models/research.model';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { FilterDto } from '../Models/filterDto.model';
import { filter } from 'rxjs';

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
  selectedOptions: number[] = []; 
  selectedQuestion: any = null;
  analysisResult: any = null;
  errorMessageCheck: string | null = null;
  selectionsCompleted: boolean = false;
  filterDto: FilterDto = {
    optionIds: [],
    questionId: 0
  };


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
    if (this.filterDto) {
      console.log('API request gönderiliyor:', {
        optionId: this.selectedOption,
        questionId: this.selectedQuestion
      });

     this.filterDto = {
      optionIds:this.selectedOptions,
      questionId: this.selectedQuestion
     }
      console.log("filterDto:",this.filterDto);

  
      // API request yap
      this.dataService.getQuestionParticipantPercentage(this.filterDto).subscribe(response => {
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

  toggleOption(optionId: number): void {
    const index = this.selectedOptions.indexOf(optionId);
    if (index > -1) {
      this.selectedOptions.splice(index, 1); // zaten seçiliyse kaldır
    } else {
      this.selectedOptions.push(optionId); // seçili değilse ekle
    }
    console.log("Selected Options:", this.selectedOptions);
  }

  completeSelection(): void {
    if (this.selectedOptions.length === 0) {
      alert("Lütfen en az bir seçenek seçin.");
      return;
    }
    this.selectionsCompleted = true;
    this.filterDto.optionIds = this.selectedOptions;
    console.log("Seçilen Seçenekler:", this.selectedOptions);
  }

  

  




}
