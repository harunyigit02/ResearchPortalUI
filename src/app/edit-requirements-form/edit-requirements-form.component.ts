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

  researchId!:number

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
      this.researchId = Number(this.route.snapshot.paramMap.get('id'));
      this.dataService.getResearchRequirementByResearchId(this.researchId).subscribe({
        next: (data) => {
          console.log("data verileri",data);
          this.researchForm.patchValue({
            minAge:data.minAge,
            maxAge:data.maxAge,
            gender: data.gender,           
            location: data.location,       
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
        researchId: [this.researchId],
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
        let currentValue = control.value || [];
        if (event.target.checked) {
          // Seçenek ekle
          currentValue.push(+event.target.value);
        } else {
          // Seçenek kaldır
          const index = currentValue.indexOf(+event.target.value);
          if (index !== -1) {
            currentValue.splice(index, 1);
          }
        }
        control.setValue(currentValue);  // Yeni değeri form kontrolüne ata
      }
    }
  
    // Formu gönderme
    onSubmit() {
      if (this.researchForm.invalid) {
        return; // Form geçerli değilse işlem yapılmaz
      }
  
      const updatedResearchRequirement: ResearchRequirement = this.researchForm.value;
  
      // Güncelleme isteğini gönderme
      this.dataService.updateResearchRequirement(this.researchId,updatedResearchRequirement).subscribe({
        next: (response) => {
          console.log("Güncelleme başarılı", response);
          this.router.navigate([`research-detail/${this.researchForm.value.researchId}`]);
        },
        error: (err) => {
          console.error("Güncelleme işlemi sırasında hata oluştu", err);
        }
      });
    }
  
  
      
      
}






