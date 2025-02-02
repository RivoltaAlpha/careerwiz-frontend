export interface CareerCardProps {
    career_id: number;
    image: string   ;
    CareerName: string;
    description: string;
    requirements: string[];
    subjects: string[];
    interests: string[];
}
export interface Career {
    career_id: number;
    CareerName: string;
    description: string;
    requirements: string[];
    subjects: string[];
    interests: string[];
}
  // Login Response
  export interface LoginResponse {
    username: string;
    password: string;    
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
    username: string;
    email: string;
    password: string;
    role: string;
    image_url: string;
}

export interface UserAuthenticatedState {
    user:{
        user_id: number
        username: string
        email: string
        role: string
        image_url: string
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
