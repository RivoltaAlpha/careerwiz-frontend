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

export interface StudentRecommendations {
  recommended_courses: string[];
}

export interface RecommendationItem {
  recommendations_id: number;
  student_recommendations: StudentRecommendations;
}

export interface Recommendations {
  student_id: number;
  username: string;
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

export interface PersonalInterests{
  id: number;
  student_id: number;
  personal_interests: string;
  personalIntrests: []
  interest: string;
}