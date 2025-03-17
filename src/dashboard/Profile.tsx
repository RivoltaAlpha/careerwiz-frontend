import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Sidebar from '../components/Sidebar'; 
import { Link } from 'react-router-dom';

export default function Profile() {
    const { user } = useSelector((state: RootState) => state.userAuth);
    return (
        <div className="flex min-h-screen bg-gray-100 text-white">
            <Sidebar />
            <div className="max-w-2xl mx-auto p-8">
                <div className="bg-white shadow-md rounded-lg w-[500px] overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center justify-center mb-6">
                            <img
                                src={'/images/Social media-cuate.png'}
                                alt="User Profile"
                                className="w-32 h-32 rounded-full object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-black mb-4 text-center">User Details</h2>
                        <div className="space-y-4">
                            <div className="bg-gray-900 p-3 rounded">
                                <span className="font-semibold">Name:</span> {user?.username}
                            </div>
                            <div className="bg-gray-900 p-3 rounded">
                                <span className="font-semibold">Email:</span> {user?.email}
                            </div>
                        </div>
                        {/* Update profile */}
                        <div className="mt-6">
                            <Link to="profile-edit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300">
                                Update Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}