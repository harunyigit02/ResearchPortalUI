import { Component } from '@angular/core';
import { ResearchRequirement } from '../Models/research-requirement.model';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChildStatus, DisabilityStatus, EducationLevel, Ethnicity, Gender, HousingType, Location, MaritalStatus, Occupation, ParentalStatus } from '../Enums/participant-infos';

@Component({
  selector: 'app-condition-deneme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './condition-deneme.component.html',
  styleUrl: './condition-deneme.component.css'
})
export class ConditionDenemeComponent {
  researchRequirements!:ResearchRequirement

  constructor(private dataService:DataService,router:Router){}


  ngOnInit(){
    this.getResearchRequirements();

  }



  getResearchRequirements(){
    const researchId=Number(localStorage.getItem("ResearchId"));
    this.dataService.getResearchRequirementByResearchId(researchId).subscribe({
      next:(data)=>{
        this.researchRequirements=data;
        console.log("veriler:",)
      },
      error:(err) => {
        console.log("hata oluştu.",err.message);
      }
    })
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

  // Enum dönüştürme fonksiyonu
  transformEnumToString(enumArray: number[], enumName: keyof typeof this.enums): string[] {
    const enumObj = this.enums[enumName]; // Get the enum object by name
    return enumArray.map(value => {
      return enumObj[value as keyof typeof enumObj] || 'Unknown';
    });
  }
  
}
