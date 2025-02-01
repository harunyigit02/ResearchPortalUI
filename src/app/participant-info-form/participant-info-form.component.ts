import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ChildStatus,
  DisabilityStatus,
  EducationLevel,
  Ethnicity,
  Gender,
  HousingType,
  Location,
  MaritalStatus,
  Occupation,
  ParentalStatus,
  University
} from '../Enums/participant-infos';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participant-info-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './participant-info-form.component.html',
  styleUrl: './participant-info-form.component.css'
})
export class ParticipantInfoFormComponent {
  participantForm: FormGroup;
  universities= Object.values(University);
  genders = Object.values(Gender);
  locations = Object.values(Location);
  childStatuses = Object.values(ChildStatus);
  disabilityStatuses = Object.values(DisabilityStatus);
  educationLevels = Object.values(EducationLevel);
  ethnicities = Object.values(Ethnicity);
  housingTypes = Object.values(HousingType);
  maritalStatuses = Object.values(MaritalStatus);
  occupations = Object.values(Occupation);
  parentalStatuses = Object.values(ParentalStatus);

  constructor(
    private fb: FormBuilder,
    private dataService:DataService,
    private router:Router
  ) {
    this.participantForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['',Validators.min(0)],
      university: ['', Validators.required],
      gender: ['', Validators.required],
      location: ['', Validators.required],
      childStatus: ['', Validators.required],
      disabilityStatus: ['', Validators.required],
      educationLevel: ['', Validators.required],
      ethnicity: ['', Validators.required],
      housingType: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      occupation: ['', Validators.required],
      parentalStatus: ['', Validators.required]
    });
  }


  ngOnInit() {

  }


  onSubmit() {
    const token = localStorage.getItem("jwt_token");
    if(token){
      if(this.participantForm){

        if (this.participantForm.valid) {
          console.log("Form verileri:",this.participantForm.value)
          const formData = {
            firstName: this.participantForm.value.firstName,
            lastName: this.participantForm.value.lastName,
            age: this.participantForm.value.age,
            university: this.getEnumKey(University, this.participantForm.value.university),
            gender: this.getEnumKey(Gender, this.participantForm.value.gender),  // Gender'ı integer'a çeviriyoruz
            location: this.getEnumKey(Location, this.participantForm.value.location),
            childStatus: this.getEnumKey(ChildStatus, this.participantForm.value.childStatus),
            disabilityStatus: this.getEnumKey(DisabilityStatus, this.participantForm.value.disabilityStatus),
            educationLevel: this.getEnumKey(EducationLevel, this.participantForm.value.educationLevel),
            ethnicity: this.getEnumKey(Ethnicity, this.participantForm.value.ethnicity),
            housingType: this.getEnumKey(HousingType, this.participantForm.value.housingType),
            maritalStatus: this.getEnumKey(MaritalStatus, this.participantForm.value.maritalStatus),
            occupation: this.getEnumKey(Occupation, this.participantForm.value.occupation),
            parentalStatus: this.getEnumKey(ParentalStatus, this.participantForm.value.parentalStatus)
          };
          console.log("Integer formData:",formData);
          this.dataService.addParticipantInfo(token,formData).subscribe(response => {
            console.log('Form submitted successfully!', response);
            this.router.navigate(['/articles']);
          }, error => {
            console.error('Error submitting form', error);
          });
        }
        else console.log("Form geçerli değil.")
      }
      else console.log("Form bulunamadi.");
    }
    else{
      console.log("UnAuthorized for this action.");
    }
  }
  getEnumKey(enumObj: any, value: string): number {
    const key = Object.keys(enumObj).find(key => enumObj[key] === value);
    return key ? parseInt(key, 10) : 0; // Integer olarak döndür
  }

}
