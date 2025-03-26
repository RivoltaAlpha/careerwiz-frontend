import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { TUser } from '../types/types';
import { toast } from 'react-toastify';

const UserFeedback: React.FC = () => {
    const user = useSelector((state: RootState) => state.userAuth.user) as TUser;
    const userId = user?.user_id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      message:"",
      contact:"",
      recommendation: 0,
      student_id: 0
  });

  useEffect(() => {
    setFormData({
      name: user?.firstname || "",
      email: user?.email || "",
      contact: user?.contact || ""
    });
  })

  const getUserRecommendations = () => {

  }

  const formData = {
    student_id: userId,
    recommendation: getUserRecommendations,
    name:"",
    email:"",
    message:"",
    contact: 0,
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

        // Check if the field belongs to the object
        if (['name', 'contact', 'email'].includes(name)) {
          setFormData({
            ...formData,
            user: {
              ...formData,
              [name]: value
            }
          });
        } else {
          // For other fields
          setFormData({
            ...formData,
            [name]: value
          });
        }
      };

  const { } = formData;

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.name || !formData.message || !formData.contact || !formData.email) {
      toast.error('Please fill out all required fields.');
      return;
    }
    console.log('Form Data:', formData);
    setIsLoading(true);
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-3/4 p-4 gap-4">
      {/* Sidebar */}
      < Sidebar />

      {/* Main Content */}
      <main className="w-full md:w-3/4 bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Feedback Form</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-8 h-full">
                                    <div className="grid w-full gap-y-4">
                                        <div className="grid w-full  items-center gap-1.5">
                                            <label
                                                className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="name"
                                            >
                                                Names
                                            </label>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                                type="text"
                                                id="name"
                                                placeholder="Name"
                                                value={formData.name} onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="email"
                                            >
                                            Email
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            id="email"
                                            placeholder="Email"
                                            value={formData.email} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="contact"
                                        >
                                            Phone number
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="tel"
                                            id="contact"
                                            placeholder="Phone number"
                                            value={formData.contact} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="message"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            id="message"
                                            placeholder="Leave us a message"
                                            cols={3}
                                            value={formData.message} onChange={handleChange}
                                        />
                                    </div>
                                    <button type="button" className="w-[300px] py-2 rounded ml-[50px] bg-cards btn btn-outline btn-primary"
                                    >
                                        Send Message
                                    </button>
                                </form>      
      </main>
    </div>
  );
};

export default UserFeedback;