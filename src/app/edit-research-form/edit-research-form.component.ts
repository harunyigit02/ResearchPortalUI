import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Research } from '../Models/research.model';

@Component({
  selector: 'app-edit-research-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './edit-research-form.component.html',
  styleUrl: './edit-research-form.component.css'
})
export class EditResearchFormComponent {

  researchId!:number;
    research!:Research
    researchForm!: FormGroup;
    isLoading = false;
    successMessage = '';
    errorMessage = '';
    categories: any[] = [];


  constructor(private dataService:DataService,private router:Router,private route:ActivatedRoute,private fb: FormBuilder) {}

  ngOnInit(){

    this.researchForm = this.fb.group({
      title: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      isFaceToFace: ['', Validators.required],

    });

    
    const researchId = this.route.snapshot.paramMap.get('id');
      console.log("articleId:",researchId)
      
      this.loadResearch(Number(researchId))


      this.loadCategories();


       
  }


  loadResearch(researchId: number): void {
  this.dataService.getResearchById(researchId).subscribe({
    next: (data) => {
      this.research = data;
      console.log("research data:", this.research);

      // Veriyi alıp formu güncelleme
      this.researchForm.patchValue({
        title: this.research.title,
        categoryId: this.research.categoryId,
        description: this.research.description,
        isFaceToFace: this.research.isFaceToFace // Bu satırda doğru değer atanacak
      });
    },
    error: (err) => {
      console.error('Araştırma yüklenirken hata oluştu:', err);
    }
  });
}

loadCategories(): void {
  this.dataService.getCategories().subscribe({
    next: (data) => {
      this.categories = data;
      
    },
    error: (err) => {
      console.error('Kategoriler yüklenirken hata oluştu:', err);
    }
  });
}


updateResearch(id:number): void {
  if (this.researchForm.invalid) {
    return;
  }

  this.isLoading = true;
  const updatedResearch = {
    
    ...this.researchForm.value,
     
  };

  this.dataService.updateResearch(id,updatedResearch).subscribe({
    next: () => {
      this.successMessage = 'araştırma başarıyla güncellendi!';
      setTimeout(() => {
        this.router.navigate(['/researches']); // Güncelleme sonrası yönlendirme
      }, 2000);
    },
    error: (err) => {
      this.errorMessage = 'Güncelleme sırasında hata oluştu.';
      console.error(err);
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}
onParticipationModeChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  this.researchForm.get('isFaceToFace')?.setValue(target.value === 'true'); // String "true" → Boolean true, "false" → Boolean false
}


}
