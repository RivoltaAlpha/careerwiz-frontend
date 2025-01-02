import React from 'react';

interface CareerCardProps {
    id: number;
    courseName: string;
    description: string;
    requirements: string[];
    subjects: string[];
    interests: string[];
}

const CareerCard: React.FC<CareerCardProps> = ({ courseName, description, requirements, subjects, interests }) => {
    return (
        <div className="career-card">
            <h2>{courseName}</h2>
            <p>{description}</p>
            <div>
                <h3>Requirements:</h3>
                <ul>
                    {requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Subjects:</h3>
                <ul>
                    {subjects.map((subject, index) => (
                        <li key={index}>{subject}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Interests:</h3>
                <ul>
                    {interests.map((interest, index) => (
                        <li key={index}>{interest}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CareerCard;