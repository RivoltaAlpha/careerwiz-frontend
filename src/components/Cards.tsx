import React from 'react';

interface ProgramCardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ title, description, imageUrl, buttonText }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="w-[500px] object-cover md-w-full" src={imageUrl} alt={title} />
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;