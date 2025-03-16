import { Component, NgModule } from '@angular/core';
import { Question } from '../Models/question.model';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-questions',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-questions.component.html',
  styleUrl: './edit-questions.component.css'
})
export class EditQuestionsComponent {
  researchId!: number;
  questions: Question[] = [];
  selectedQuestion: Question | null = null;
  originalQuestion: Question | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // URL parametresinden researchId'yi alıyoruz
    this.researchId = +this.route.snapshot.paramMap.get('id')!;
    this.loadQuestions();
  }

  // Soruları yükleme
  loadQuestions(): void {
    console.log("researchId:",this.researchId);
    this.dataService.getQuestionsByResearchId(this.researchId).subscribe((data: any[]) => {
      this.questions = data;
    });
  }

  // Seçilen soruyu düzenlemeye başlama
  editQuestion(question: Question): void {
    // Orijinal veriyi sakla (deep copy alarak)
    this.originalQuestion = JSON.parse(JSON.stringify(question));
    this.selectedQuestion = { ...question };
  }

  // Soruyu kaydetme
  saveQuestion(): void {
    if (this.selectedQuestion) {
      this.dataService.updateQuestion(this.selectedQuestion.id, this.selectedQuestion).subscribe(() => {
        this.loadQuestions();
        this.selectedQuestion = null;
        this.originalQuestion = null;
      });
    }
  }

  // Düzenlemeyi iptal etme
  cancelEdit(): void {
    if (this.originalQuestion) {
      // Orijinal veriyi geri yükle
      const index = this.questions.findIndex(q => q.id === this.originalQuestion!.id);
      if (index !== -1) {
        this.questions[index] = { ...this.originalQuestion };
      }
    }
    this.selectedQuestion = null; // Düzenleme modunu kapat
    this.originalQuestion = null; // Orijinal veriyi sıfırla
  }

  deleteQuestion(id:number){
    this.dataService.deleteQuestion(id).subscribe({
      next: () => this.loadQuestions(),
      error: () => console.error("silme işlemi başarısız")
      
    })
  }

  navigateResearch(){
    const researchId = this.route.snapshot.paramMap.get('id');

    this.router.navigate([`research-detail/${researchId}`]);
  }

  navigateAddQuestionPage(){
    const researchId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`add-research-form/${researchId}`])
  }








}
