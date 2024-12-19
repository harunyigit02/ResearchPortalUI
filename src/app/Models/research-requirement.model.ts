export interface ResearchRequirement {
    researchId:number;
    minAge: number; // Minimum yaş
    maxAge: number; // Maksimum yaş
    gender: number[]; // Array of integers representing Gender (Enum değerleri ile eşleşen sayılar)
    location: number[]; // Array of integers representing Location (Enum değerleri ile eşleşen sayılar)
    educationLevel: number[]; // Array of integers representing Education Level (Enum değerleri ile eşleşen sayılar)
    occupation: number[]; // Array of integers representing Occupation (Enum değerleri ile eşleşen sayılar)
    ethnicity: number[]; // Array of integers representing Ethnicity (Enum değerleri ile eşleşen sayılar)
    maritalStatus: number[]; // Array of integers representing Marital Status (Enum değerleri ile eşleşen sayılar)
    parentalStatus: number[]; // Array of integers representing Parental Status (Enum değerleri ile eşleşen sayılar)
    childStatus: number[]; // Array of integers representing Child Status (Enum değerleri ile eşleşen sayılar)
    disabilityStatus: number[]; // Array of integers representing Disability Status (Enum değerleri ile eşleşen sayılar)
    housingType: number[]; // Array of integers representing Housing Type (Enum değerleri ile eşleşen sayılar)
  }