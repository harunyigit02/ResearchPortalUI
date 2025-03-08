// enums.ts
export const Gender = {
  1: 'Male',     // Erkek
  2: 'Female',   // Kadın
};

export const EducationLevel = {
  1: 'No Formal Education', // Resmi eğitim yok
  2: 'Primary School',      // İlkokul
  3: 'Secondary School',    // Ortaokul
  4: 'High School',         // Lise
  5: 'Associate Degree',    // Ön Lisans
  6: 'Bachelor Degree',     // Lisans
  7: 'Master Degree',       // Yüksek Lisans
  8: 'Doctorate Degree',    // Doktora
};

export const Location = {
  1: 'Ankara',
  2: 'İstanbul',
  3: 'İzmir',
  4: 'Adana',
  5:'Sakarya'

};

export const Ethnicity = {
  1: 'Caucasian',          // Beyaz
  2: 'Hispanic',           // Hispanik
  3: 'African American',   // Afrikalı Amerikalı
  4: 'Asian',              // Asyalı
  5: 'Middle Eastern',     // Orta Doğulu
  6: 'Native American',    // Kızılderili
  7: 'Pacific Islander',   // Pasifik Adalı
  8: 'Balkan',
  9: 'Other',
};

export const MaritalStatus = {
  1: 'Single',        // Bekar
  2: 'Married',       // Evli
  3: 'Divorced',      // Boşanmış
  4: 'Widowed',       // Dul
  5: 'Separated',     // Ayrı
  6: 'Other',
};

export const DisabilityStatus = {
  1: 'None',                 // Engelli değil
  2: 'Physical Disability',  // Fiziksel engellilik
  3: 'Mental Disability',    // Zihinsel engellilik
  4: 'Both',                 // Hem fiziksel hem zihinsel engellilik
  5: 'Other',
};

export const HousingType = {
  1: 'Own',                 // Kendi malı
  2: 'Rent',                // Kirada
  3: 'Living with Family', // Aileyle yaşıyor
  4: 'Shelter',             // Sığınma evi
  5: 'Other',
};

export const Occupation = {
  1: 'Unemployed',        // İşsiz
  2: 'Student',           // Öğrenci
  3: 'Professional',      // Profesyonel
  4: 'Teacher',           // Öğretmen
  5: 'Engineer',          // Mühendis
  6: 'Doctor',            // Doktor
  7: 'Lawyer',            // Avukat
  8: 'Business Owner',    // İşletme Sahibi
  9: 'Freelancer',        // Serbest Çalışan
  10: 'Other',
};

export const ParentalStatus = {
  1: 'Not a Parent',          // Ebeveyn değil
  2: 'Single Parent',         // Tek ebeveyn
  3: 'Two Parent Household',  // İki ebeveynli aile
  4: 'Divorced Parent',       // Boşanmış ebeveyn
  5: 'Separated Parent',      // Ayrı yaşayan ebeveyn
  6: 'Co-Parenting',          // Ortak ebeveynlik
  7: 'Step Parent',           // Üvey ebeveyn
  8: 'Adoptive Parent',       // Evlat edinmiş ebeveyn
  9: 'Foster Parent',         // Geçici bakıcı ebeveyn
  10: 'Grandparent as Parent',// Büyükanne/büyükbaba ebeveyni
  11: 'Other',
};

export const ChildStatus = {
  1: 'No Children',            // Çocuk yok
  2: 'One Child',              // Bir çocuğa sahip
  3: 'Two Children',           // İki çocuğa sahip
  4: 'Multiple Children',      // Birden fazla çocuğa sahip
  5: 'Twins',                  // İkiz çocuklara sahip
  6: 'Special Needs Child',    // Özel gereksinimli çocuğa sahip
  7: 'Teenager Child',         // Ergen çocuğa sahip
  8: 'Infant Child',           // Bebek çocuğa sahip
  9: 'Adult Children',         // Yetişkin çocuğa sahip
  10: 'Adult With Own Family', // Çocuğu evli ve kendi ailesi olan
  11: 'Other',
};
export const University = {
  1: 'Konya Teknik Üniversitesi',
  2: 'Hacettepe Üniversitesi',
  3: 'Bilkent Üniversitesi',
  4: 'OrtaDoğu Teknik Üniversitesi'
}
