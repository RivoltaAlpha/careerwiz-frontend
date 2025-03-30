export interface CareerCardProps {
    career_id: number;
    image: string   ;
    career_name: string;
    description: string;
    requirements: string;
    subjects: string;
    interests: string[];
}
export interface Career {
    career_id: number;
    image: string;
    career_name: string;
    description: string;
    requirements: string;
    subjects: string;
    interests: string[];
}

export interface CareerInterestItem {
  careerInterests_id: number;
  career: Career;
}

export interface StudentCareerInterests {
  student_id: number;
  username: string;
  careerInterests: CareerInterestItem[];
}


  // Login Response
  export interface LoginResponse {
    username: string;
    password: string;    
    headers: {
      "X-CSRF-Token": string;
    };
}

  // Login User
  export interface Luser {
    username: string;
    password: string;
    token: string; 
   }

export interface Careers {
    career: CareerCardProps[];
}

  // create User
  export interface TUser {
    user_id: number;
    student_id: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    contact: string;
    school: string;
    role: string;
}

export interface UserAuthenticatedState {
    user:{
      user_id: number;
      student_id: number;
      firstname: string;
      lastname: string;
      username: string;
      password: string;
      email: string;
      contact: string;
      school: string;
      role: string;
    } | null
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
  }

  export interface UserState {
    user: TUser | null;
    loading: boolean;
    error: string | null;
  }
export interface  AcademicCardProps{
  academic_id: number;
  student_id: number;
  subject_id: number;
  grade: string;
  subject_score: number;
  year: number;
}

export interface Academics {
  academic_id: number;
  student_id: number;
  subject_id: number;
  grade: string;
  subject_score: number;
  year: number;
}
export interface AcademicHistoryItem {
  grade: string;
  subject: string;
}

export interface AcademicHistoryProps {
  subjects: string[];
  academic_history: AcademicHistoryItem[];
}


export type AcademicHistory = AcademicHistoryItem[];

export interface StudentAcademics {
  academic_id: number;
  student_id: number;
  subjects: string[];
  academic_history: AcademicHistory;
}
export interface Subjects {
  subject_id: number;
  subject_name: string;
}

export interface StudentRecommendations {
  recommended_courses: string[];
}

export interface RecommendationItem {
  recommendations_id: number;
  student_recommendations: StudentRecommendations;
}

export interface Recommendations {
  recommendations: RecommendationItem[];
}

export interface Interests {
  interest_id: number;
  student_id: number;
  name: string;
  interest: string;
}

export interface Feedback {
  feedback_id: number;
  student_id: number;
  message: string;
  name: string;
  email: string;
  contact: string;
  recommendation:number;
}

export interface Subject {
  subject_id: number;
  subject_name: string;
}

export interface CareerInterests{
  careerInterests_id: string;
  student_id: number;
  career_id:number;
  Career:{
    career_id: number;
    image: string;
    career_name: string;
    description: string;
    requirements: string;
    subjects: string;
    interests: string[];
  }
}

export interface PersonalInterest {
  id: number;
  personal_interests: string; 
}

export interface PersonalnterestsData{
  id: number;
  student_id: number;
  personalIntrests: PersonalInterest[];
}
export interface StudentPersonalInterests {
  id: number;
  student_id: number;
  personal_interests: PersonalInterest[];
  isLoading: any;
}
export type CreateInterestPayload = {
  student_id: number;
  personal_interests: string;
};


export interface RecommendationslInterest {
  personal_interests: string; // Comma-separated string of interests
}

export interface RecommendationsAcademics {
  subjects: string[]; // Array of subjects
}

export interface RecommendationAttributes {
  personalIntrests: RecommendationslInterest[];
  academics: RecommendationsAcademics[];
}