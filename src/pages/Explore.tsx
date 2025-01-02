import React, { useEffect, useState } from 'react';
import CareerCard from '../components/CareeerCard';

interface Career {
    id: number;
    title: string;
    description: string;
    // Add other fields as necessary
}

interface CareerCardProps {

    career: Career;

}

const Explore: React.FC = () => {
    const [careers, setCareers] = useState<Career[]>([]);

    useEffect(() => {
        // Replace with your actual API endpoint
        fetch('/api/careers')
            .then(response => response.json())
            .then(data => setCareers(data))
            .catch(error => console.error('Error fetching careers:', error));
    }, []);

    return (
        <div>
            <h1>Explore Careers</h1>
            <div className="career-list">
                {careers.map(career => (
                    <CareerCard key={career.id} career={career} />))}
            </div>
        </div>
    );
};

export default Explore;