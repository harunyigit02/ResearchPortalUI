import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResearchRequirement } from '../Models/research-requirement.model';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChildStatus, DisabilityStatus, EducationLevel, Ethnicity, Gender, HousingType, Location, MaritalStatus, Occupation, ParentalStatus } from '../Enums/participant-infos';

@Component({
  selector: 'app-edit-requirements-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-requirements-form.component.html',
  styleUrl: './edit-requirements-form.component.css'
})
export class EditRequirementsFormComponent {

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
  
    constructor(private dataService:DataService,private router:Router,private fb: FormBuilder,private route:ActivatedRoute) {}
  
    ngOnInit() {
      const researchId = this.route.snapshot.paramMap.get('id');
      this.dataService.getResearchRequirementByResearchId(Number(researchId)).subscribe({
        next: (data) => {
          console.log("data verileri",data);
          this.researchForm.patchValue({
            minAge:data.minAge,
            maxAge:data.maxAge,
            gender: data.gender,            // gender alanını dolduruyoruz
            location: data.location,        // location alanını dolduruyoruz
            educationLevel: data.educationLevel,
            occupation: data.occupation,
            ethnicity: data.ethnicity,
            maritalStatus: data.maritalStatus,
            parentalStatus: data.parentalStatus,
            childStatus: data.childStatus,
            disabilityStatus: data.disabilityStatus,
            housingType: data.housingType
          });
          console.log("apiden dönen form verileri",this.researchForm.value)
        },
        error: (err) => {
          console.error("Araştırma gereksinimi yüklenirken hata oluştu.", err);
        }
      });
      
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
  
      console.log("son veri:",this.researchForm.value);
      
      }
  
  
      
      
}






