import React, { useEffect, useState } from 'react';
import CareerCard from '../components/CareeerCard';
import { Careers } from '../types/types';


const Explore: React.FC = () => {
    const [careers, setCareers] = useState<Careers[]>([]);

    useEffect(() => {
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