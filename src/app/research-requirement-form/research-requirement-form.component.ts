import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChildStatus, DisabilityStatus, EducationLevel, Ethnicity, Gender, HousingType, Location, MaritalStatus, Occupation, ParentalStatus } from '../Enums/participant-infos';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResearchRequirement } from '../Models/research-requirement.model';

@Component({
  selector: 'app-research-requirement-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './research-requirement-form.component.html',
  styleUrl: './research-requirement-form.component.css'
})
export class ResearchRequirementFormComponent {
  researchForm!: FormGroup;
  researchRequirement!:ResearchRequirement
  // Enum verileri
  
  
  // Enum verileri
  genderOptions = Object.entries(Gender);
  educationLevelOptions = Object.entries(EducationLevel);
  locationOptions = Object.entries(Location);
  ethnicityOptions = Object.entries(Ethnicity);
  maritalStatusOptions = Object.entries(MaritalStatus);
  disabilityStatusOptions = Object.entries(DisabilityStatus);
  housingTypeOptions = Object.entries(HousingType);
  occupationOptions = Object.entries(Occupation);
  parentalStatusOptions = Object.entries(ParentalStatus);
  childStatusOptions = Object.entries(ChildStatus);

  constructor(private dataService:DataService,private router:Router,private fb: FormBuilder) {}

  ngOnInit() {
    const researchId = Number(localStorage.getItem("ResearchId"));
    this.researchForm = this.fb.group({
      researchId: [researchId],
      minAge: [null],
      maxAge: [null],
      gender: [null],  // Başlangıçta null
      location: [null],  // Başlangıçta null
      educationLevel: [null],  // Başlangıçta null
      occupation: [null],  // Başlangıçta null
      ethnicity: [null],  // Başlangıçta null
      maritalStatus: [null],  // Başlangıçta null
      parentalStatus: [null],  // Başlangıçta null
      childStatus: [null],  // Başlangıçta null
      disabilityStatus: [null],  // Başlangıçta null
      housingType: [null],  // Başlangıçta null
    });
  }


  // Checkbox toggle için yardımcı fonksiyon
  onCheckboxChange(event: any, formControlName: string) {
    const control = this.researchForm.get(formControlName);
    if(control){
      if (event.target.checked) {
        // Eğer daha önce null ise bir array oluştur
        if (control.value === null) {
          control.setValue([]);
        }
        // Seçenek ekle
        control.value.push(+event.target.value);
      } else {
        // Seçenek kaldır
        const index = control.value.indexOf(+event.target.value);
        if (index !== -1) {
          control.value.splice(index, 1);
        }
      }
    }
  }

  // Formu gönderme
  onSubmit() {

    console.log(this.researchForm.value);
    const token=localStorage.getItem('jwt_token');
    if(token){
      this.dataService.addResearchRequirement(token,this.researchForm.value).subscribe({
        next: () => {
          console.log("Araştırma koşulları eklendi");
          this.router.navigate([`research-detail/:${this.researchForm.value.researchId}`])
        },
        error: (err) => {
          console.error("Araştırma koşulları eklenirken bir hata oluştur",err.message);
        } 
      })
    }


    
    
  }
}
