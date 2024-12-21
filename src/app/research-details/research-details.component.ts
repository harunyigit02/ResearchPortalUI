import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Research } from '../Models/research.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResearchRequirement } from '../Models/research-requirement.model';
import { ChildStatus, DisabilityStatus, EducationLevel, Ethnicity, Gender, HousingType, Location, MaritalStatus, Occupation, ParentalStatus } from '../Enums/participant-infos';

@Component({
  selector: 'app-research-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './research-details.component.html',
  styleUrl: './research-details.component.css'
})
export class ResearchDetailsComponent {
  research: any;
  id:any;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  changedResearch:any;
  showQuestions: boolean = false;
  researchRequirements!: ResearchRequirement;
  showResearchRequirements: boolean = false;
  

  constructor(private dataService:DataService, private router:Router){}


  ngOnInit(): void {
    this.id=Number(localStorage.getItem("ResearchId"));
    this.getResearchesById(this.id);
    this.getResearchRequirements();
    
    
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

  

  changeStatusResearch() {
    console.log('Research nesnesi:', this.research);
    
    // isCompleted durumunu tersine çevir
    this.research.isCompleted = !this.research.isCompleted; // Bu satırı ekleyin
    
    // Güncellenen araştırmayı sunucuya gönder
    this.dataService.updateResearch(this.id, this.research).subscribe({
      next: response => {
        this.handleSuccess('Araştırma başarıyla güncellendi!');
      },
      error: error => {
        console.error('Araştırma güncelleme hatası:', error);
        this.handleError('Araştırma güncellenirken bir hata oluştu!');
      }
    });
  }
  private handleSuccess(message: string) {
    this.successMessage = message;
    this.errorMessage = null;
    this.scrollToTop();
    setTimeout(() => {
      this.successMessage = null;  // Burada hata olmayacak
    }, 3000);
    
  }
  
  private handleError(message: string) {
    this.errorMessage = message;
    this.successMessage = null;
    this.scrollToTop();
    setTimeout(() => {
      this.errorMessage = null;  // Burada hata olmayacak
    }, 3000);
  }
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sayfayı yukarı kaydır
  }

  toggleQuestions() {
    this.showQuestions = !this.showQuestions; // Mevcut değeri tersine çevir
  }
  goToFormPage(): void {
    // Makaleye gitme işlevselliğini burada yönlendirebilirsiniz
    
    
    this.router.navigate([`add-research-form`]);
  }



  goToParticipationFormPage(): void{
    this.router.navigate([`participation-form/${this.id}`]);
  }

  getResearchRequirements() {
    const researchId = Number(localStorage.getItem("ResearchId"));
    this.dataService.getResearchRequirementByResearchId(researchId).subscribe({
      next: (data) => {
        this.researchRequirements = data;
        console.log('Araştırma Şartları:', this.researchRequirements);
      },
      error: (err) => {
        console.log('Hata oluştu.', err.message);
      }
    });
  }

  toggleResearchRequirements() {
    this.showResearchRequirements = !this.showResearchRequirements;
  }
  enums = {
    gender: Gender,
    educationLevel: EducationLevel,
    location: Location,
    ethnicity: Ethnicity,
    maritalStatus: MaritalStatus,
    disabilityStatus: DisabilityStatus,
    housingType: HousingType,
    occupation: Occupation,
    parentalStatus: ParentalStatus,
    childStatus: ChildStatus
  };

  transformEnumToString(enumArray: number[], enumName: keyof typeof this.enums): string[] {
    const enumObj = this.enums[enumName];
    return enumArray.map(value => enumObj[value as keyof typeof enumObj] || 'Bilinmiyor');
  }
  goToResearchRequirementsCreationPage() {
    // Burada yönlendirmek istediğiniz sayfanın yolu
    this.router.navigate(['/research-requirement-form']);
  }
  isEmptyResearchRequirements(){
    if(this.researchRequirements == null) return true;
    return false
  }

  






}
