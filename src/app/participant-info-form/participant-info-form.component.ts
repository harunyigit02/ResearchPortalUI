import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChildStatus, DisabilityStatus, EducationLevel, Ethnicity, Gender, HousingType, MaritalStatus, Occupation, ParentalStatus } from '../Enums/participant-infos';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-participant-info-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './participant-info-form.component.html',
  styleUrl: './participant-info-form.component.css'
})
export class ParticipantInfoFormComponent {
  participantForm: FormGroup;
  genders = Object.values(Gender);
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
    private dataService:DataService
  ) {
    this.participantForm = this.fb.group({
      age: ['',Validators.min(0)],
      gender: ['', Validators.required],
      location:['',Validators.required],
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
          const formData = this.participantForm.value;
          this.dataService.addParticipantInfo(token,formData).subscribe(response => {
            console.log('Form submitted successfully!', response);
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

}
