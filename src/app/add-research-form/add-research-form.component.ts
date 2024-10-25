import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormQuestion } from '../Models/form-question.model';

@Component({
  selector: 'app-add-research-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-research-form.component.html',
  styleUrl: './add-research-form.component.css'
})
export class AddResearchFormComponent {
  researchForm: FormGroup;
  questions: any[] = []; // Soruları tutan dizi
  questionCount: number = 1; // Soru numarasını takip etmek için

  constructor(private fb: FormBuilder) {
    this.researchForm = this.fb.group({
      questionText: [''],
      options: this.fb.array([])
    });
  }

  get options(): FormArray {
    return this.researchForm.get('options') as FormArray;
  }

  addOption() {
    this.options.push(this.fb.control('')); // Yeni bir boş kontrol ekle
  }

  removeOption(index: number) {
    this.options.removeAt(index); // Belirtilen indeksi kaldır
  }

  addQuestion() {
    const questionData = this.researchForm.value;
    this.questions.push({ // Soruları diziye ekle
      questionNumber: this.questionCount++, // Soru numarasını artır ve ekle
      questionText: questionData.questionText,
      options: questionData.options
    });
    this.researchForm.reset(); // Formu temizle
    this.options.clear(); // Seçenekleri sıfırla
  }
}
