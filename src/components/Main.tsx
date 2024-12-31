import React from 'react';
import { FaLaptopCode } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';
import { MdOutlineManageHistory } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';

const Main: React.FC = () => {
  return (
    <div className="py-12 bg-gray-900 text-gray-100">
      <div className="max-w-8xl mx-auto my-10 px-4 sm:px-6 lg:px-8">


        <div className="my-10 text-center">
          <h2 className="text-3xl font-semibold">Why Choose a Career here?</h2>
          <p className="mt-4 text-lg text-gray-300">
            We offer a wide range of benefits and opportunities to help you grow and succeed in your career.
          </p>

          <div className="flex flex-col md:flex-row justify-around items-center mt-8">
            <div className="p-6 bg-gray-800 rounded-lg m-4">
              <FaLaptopCode size={40} className="mx-auto my-10" />
              <h3 className="text-2xl font-semibold mb-10">Personalised recommendations</h3>
              <p className="mt-2 text-gray-300">
                Get personalised career recommendations based on your skills and interests.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg m-4">
              <GiProgression size={40} className="mx-auto my-10" />
              <h3 className="text-2xl font-semibold mb-10">Academic Considerations</h3>
              <p className="mt-2 text-gray-300">
                We consider your academic background and help you make informed decisions.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg m-4">
              <MdOutlineManageHistory size={40} className="mx-auto my-10" />
              <h3 className="text-2xl font-semibold mb-10">Student Interests</h3>
              <p className="mt-2 text-gray-300">
                We consider your interests and help you find the right career path.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg m-4">
            <RiTeamFill size={40} className="mx-auto my-10" />
              <h3 className="text-2xl font-semibold mb-10">Timeline Adjustments</h3>
              <p className="mt-2 text-gray-300">
                We help you adjust your career timeline to suit your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
