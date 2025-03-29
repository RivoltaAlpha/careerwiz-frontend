import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import {  TUser } from '../types/types';
import { toast } from 'react-toastify';
import { recommendationsAPI } from '../features/recommendations/recommendationsAPI';
import { FeedbackAPI } from '../features/Feedback/feedbackAPI';

const UserFeedback: React.FC = () => {
    const user = useSelector((state: RootState) => state.userAuth.user) as TUser;
    const userId = user?.user_id;
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      message:"",
      contact:"",
      recommendation: 1,
      student_id: userId || 0
  });

    const [submitFeedback] = FeedbackAPI.useCreateFeedbackMutation();
    const { data: recommendationsData, isLoading: isLoadingRecs} = recommendationsAPI.useGetUserRecommendationsQuery(userId || 0);

    useEffect(() => {
    // console.log("API Response:", recommendationsData);

    if (recommendationsData && 
        recommendationsData.length > 0 && 
        recommendationsData[0].recommendations && 
        recommendationsData[0].recommendations.length > 0 &&
        recommendationsData[0].recommendations[0].student_recommendations &&
        recommendationsData[0].recommendations[0].student_recommendations.recommended_courses &&
        recommendationsData[0].recommendations[0].student_recommendations.recommended_courses.length > 0
        && recommendationsData[0].recommendations[0].student_recommendations.recommended_courses[0] !== "" &&
        recommendationsData[0].recommendations[0].student_recommendations.recommended_courses[0] !== null
        && recommendationsData[0].recommendations[0].student_recommendations.recommended_courses[0] !== undefined
      ) {
      
      const courses = recommendationsData[0].recommendations[0].student_recommendations.recommended_courses;
      // console.log("Extracted recommendations:", courses);
      
      setRecommendations(courses);
      
      // Update form with first recommendation if available
      if (courses.length > 0) {
        setFormData(prev => ({
          ...prev,
          recommendation: 1
        }));
      }
    } else {
      setRecommendations([]);
      // console.error("No valid recommendations found in the response.");
      toast.error("No valid recommendations found in the response.");
    }
    }, [recommendationsData]);
  
  useEffect(() => {
    // Only update form data if user data is available
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        name: user.firstname || "",
        email: user.email || "",
        contact: user.contact || "",
        student_id: user.user_id || 0
      }));
        }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message || !formData.contact || !formData.email) {
      toast.error('Please fill out all required fields.');
      return;
    }
    console.log('Form Data:', formData);
    setIsLoading(true);

    try {
      // Submit feedback using the API
      await submitFeedback({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        contact: formData.contact,
        recommendation: formData.recommendation,
        student_id: formData.student_id
      }).unwrap();
      
      toast.success('Feedback submitted successfully!');
      
      // Reset the form message field
      setFormData(prev => ({
        ...prev,
        message: ""
      }));
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col md:flex-row h-3/4 p-4 gap-4 text-black">
      {/* Sidebar */}
      < Sidebar />

      {/* Main Content */}
      <main className="w-full md:w-3/4 bg-white text-black p-6 rounded-2xl shadow-md">
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
                                                className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                                type="text"
                                                id="name"
                                                name='name'
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
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            id="email"
                                            placeholder="Email"
                                            name='email'
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
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="tel"
                                            id="contact"
                                            name='contact'
                                            placeholder="Phone number"
                                            value={formData.contact} onChange={handleChange}
                                        />
                                    </div>                                    
                                      {isLoadingRecs ? (
                                        <div>Loading recommendations...</div>
                                      ) : recommendations.length > 0 ? (
                                        <div className="grid w-full items-center gap-1.5">
                                          <label
                                            className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="recommendation"
                                          >
                                            Select a Recommendation to Provide Feedback On
                                          </label>
                                          <select
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                            id="recommendation"
                                            name="recommendation"
                                            value={formData.recommendation}
                                            onChange={handleChange}
                                          >
                                          {recommendations.map((course, index) => (
                                            <option 
                                              key={index} 
                                              value={index + 1}
                                            >
                                              {course}
                                            </option>
                                          ))}
                                          </select>
                                        </div>
                                      ) : (
                                        <div>No recommendations available</div>
                                      )}
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
                                            name='message'
                                            cols={3}
                                            value={formData.message} onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="w-[300px] py-2 rounded ml-[50px] bg-cards btn btn-outline btn-primary"
                                    >
                                        {isLoading ? "Sending..." : "Send Message"}
                                    </button>
                                </form>      
      </main>
    </div>
  );
};

export default UserFeedback;

