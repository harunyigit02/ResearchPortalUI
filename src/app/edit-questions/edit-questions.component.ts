import { Component, NgModule } from '@angular/core';
import { Question } from '../Models/question.model';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-questions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.css']
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
    console.log("researchId:", this.researchId);
    this.dataService.getQuestionsByResearchId(this.researchId).subscribe((data: any[]) => {
      this.questions = data;
    });
  }

  // Seçilen soruyu düzenlemeye başlama
  editQuestion(question: Question): void {
    // Tüm question + options içeriğini deep copy ile klonla
    this.originalQuestion = JSON.parse(JSON.stringify(question));
    this.selectedQuestion = JSON.parse(JSON.stringify(question));
  }

  // Soruyu kaydetme
  saveQuestion(): void {
    const token = localStorage.getItem('jwt_token') || '';
    console.log("edit teki token:", token);

    if (this.selectedQuestion) {
      console.log("save deki options:", this.selectedQuestion.options);
      // Önce soruyu güncelle
      this.dataService.updateQuestion(this.selectedQuestion.id, this.selectedQuestion).subscribe(() => {

        // Yeni eklenen seçenekleri filtrele (id = 0 olanlar)
        const newOptions = this.selectedQuestion!.options.filter(opt => opt.id === 0 && opt.optionText.trim() !== '');

        // Hepsini kaydetmeyi bitirince yeniden yükle
        const optionRequests = newOptions.map(opt =>
          this.dataService.addOption({ questionId: this.selectedQuestion!.id, optionText: opt.optionText }, token)
        );

        // Hepsi bittiğinde soruları yeniden yükle
        Promise.all(optionRequests.map(o => o.toPromise())).then(() => {
          this.loadQuestions();
          this.selectedQuestion = null;
          this.originalQuestion = null;
        });
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

  // Soruyu silme
  deleteQuestion(id: number): void {
    this.dataService.deleteQuestion(id).subscribe({
      next: () => this.loadQuestions(),
      error: () => console.error("Silme işlemi başarısız")
    });
  }

  // Seçeneği silme
  removeOption(index: number): void {
    const option = this.selectedQuestion!.options[index];

    // Eğer option'ın id'si 0 ise sadece UI'dan sil (veritabanında henüz yoktur)
    if (!option.id) {
      this.selectedQuestion!.options.splice(index, 1);
    } else {
      if (option.id) {
        // Veritabanından sil
        this.dataService.deleteOption(option.id).subscribe({
          next: () => {
            // UI'dan da sil
            this.selectedQuestion!.options.splice(index, 1);
          },
          error: () => {
            console.error("Seçenek silinirken hata oluştu");
          }
        });
      }
    }
  }

  // Yeni seçenek ekleme
  addOption(): void {
    console.log("addOption tetiklendi");
    if (this.selectedQuestion) {
      const newOption = {
        id:0,
        questionId: this.selectedQuestion.id,
        optionText: '',
        answers: []
      };

      // Yeni seçenek ekle
      this.selectedQuestion.options.push(newOption);
      console.log("options:", this.selectedQuestion.options);
    }
  }

  // Araştırma sayfasına yönlendirme
  navigateResearch(): void {
    const researchId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`research-detail/${researchId}`]);
  }

  // Yeni soru ekleme sayfasına yönlendirme
  navigateAddQuestionPage(): void {
    const researchId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`add-research-form/${researchId}`]);
  }
}
