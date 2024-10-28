import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormQuestion } from '../Models/form-question.model';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

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
  researchId:number=Number(localStorage.getItem("ResearchId"));

  constructor(private dataService:DataService, private fb: FormBuilder,private router:Router) {
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
    const questionText = this.researchForm.value.questionText;

    // Önce soruyu ekle ve ID'sini al
    this.dataService.addQuestion({ 
      questionText, 
      researchId: this.researchId,
    }).subscribe({
      next: (response) => {
        console.log("Response: ", response);
        console.log(response.id)
        const questionId = response.id; // Burada questionId'yi alıyoruz
    
        // Eklenen soruyu arayüzde göster
        this.questions.push({
          questionText,
          options: this.options.value 
        });
    
        // Her bir seçenek için POST isteği gönder
        this.options.value.forEach((optionText: string) => {
          const optionData = { questionId, optionText };
          console.log(optionData);
    
          this.dataService.addOption(optionData).subscribe(() => {
            console.log(`Seçenek "${optionText}" eklendi.`);
          });
        });
    
        // Formu ve seçenekleri sıfırla
        this.researchForm.reset();
        this.options.clear();
        
      },
      error: (error) => {
        console.error('Hata:', error); // Hata durumunda hata mesajını göster
      }
    });
  }


  goToResearchPage(){
    
    this.router.navigate([`/research-detail/${this.researchId}`]);

  }
}
