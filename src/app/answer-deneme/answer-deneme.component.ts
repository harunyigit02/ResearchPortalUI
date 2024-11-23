import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Question } from '../Models/question.model';
import { Research } from '../Models/research.model';
import { Answer } from '../Models/answer.model';
import { CommonModule } from '@angular/common';
import { Option } from '../Models/option.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-deneme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './answer-deneme.component.html',
  styleUrl: './answer-deneme.component.css'
})
export class AnswerDenemeComponent {

  research!: Research;
  selectedAnswers: Answer[] = [];
  id!: number;


  constructor(private dataService:DataService,private router:Router){}


  ngOnInit() {
    this.id = Number(localStorage.getItem("ResearchId"));
    this.getQuestions();
  }

  // Soruları al
  getQuestions(): void {
    this.dataService.getResearchById(this.id).subscribe({
      next: (data: Research) => {
        this.research = data;
        console.log("Research Data:", this.research); // Research nesnesinin yapısını görün
      },
      error: (error) => console.error("Soruları alırken hata oluştu:", error),
    });
  }

  toggleSelection(optionId: number): void {
    // Seçilen optionId'ye ait questionId'yi elde et
    const questionId = this.getQuestionIdByOptionId(optionId);
  
    // Aynı questionId'ye sahip başka bir cevap varsa onu kaldır
    this.selectedAnswers = this.selectedAnswers.filter(
      (answer) => this.getQuestionIdByOptionId(answer.optionId) !== questionId
    );
  
    // Yeni seçimi ekle
    this.selectedAnswers.push({ optionId });
  }
  
  // Helper function: optionId'ye göre questionId alır
  getQuestionIdByOptionId(optionId: number): number | undefined {
    // research nesnesindeki questions ve options yapısını dolaşarak ilgili questionId'yi bulur
    for (const question of this.research.questions) {
      const option = question.options.find((opt) => opt.id === optionId);
      if (option) {
        return option.questionId; // option'dan questionId'yi döndür
      }
    }
    return undefined;
  }
  submit() {
    const token=localStorage.getItem("jwt_token");
    console.log(this.selectedAnswers);
    if(token){
      this.dataService.submitAnswers(this.selectedAnswers,token).subscribe({
        next: (response) => {
          console.log("Cevaplar başarıyla gönderildi", response);
          this.router.navigate([`/research-detail/${this.id}`]); // Yönlendirme yapmak istediğiniz yolu buraya ekleyin
        },
        error: (error) => {
          console.error("Cevap gönderimi sırasında hata oluştu", error);
        }
      });
    }
  }
  isOptionSelected(optionId: number): boolean {
    return this.selectedAnswers.some((answer) => answer.optionId === optionId);
  }

  

}
