import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ParticipantInfo } from '../Models/participant-info.model';
import {
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

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  participantInfos!:ParticipantInfo;
  email:any;
  enums = {
    Gender,
    EducationLevel,
    Location,
    Occupation,
    Ethnicity,
    MaritalStatus,
    ParentalStatus,
    DisabilityStatus,
    HousingType,
    University,
  };


  constructor(private dataService:DataService){}


  ngOnInit(){

    this.getParticipantInfos();
  }

  getParticipantInfos() {

    const token=localStorage.getItem('jwt_token');

    if(token){
      const decodedToken=this.dataService.decodeToken(token);
      console.log("decoded token:",decodedToken);
      this.email = decodedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      console.log("email:",this.email);
      this.dataService.getParticipantInfos(token).subscribe({
        next: (data) => {
          console.log("data:",data);
          this.participantInfos = data;
          console.log("API'den dönen kullanıcı bilgileri yanıtı:", this.participantInfos);
          console.log("participant.length:",this.participantInfos); // Veriyi burada kontrol edin
        },
        error: () => {
          console.log("Kullanıcı bilgileri gelirken bir hata oluştu.");
        }
      });
    }


  }
  getEnumValue(enumObj: any, key: number): string {
    return enumObj[key] || 'Bilinmiyor';
  }

}
