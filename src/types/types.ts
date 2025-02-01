export interface CareerCardProps {
    id: number;
    image: string   ;
    CareerName: string;
    description: string;
    requirements: string[];
    subjects: string[];
    interests: string[];
}

export interface Careers {
    career: CareerCardProps[];
}

