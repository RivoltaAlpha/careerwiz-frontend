import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegPic from '/images/hero.jpg';
import { NavLink } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { registrationAPI } from '../features/register/register';
import Header from '../components/Header';

type FormData = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    contact: string;
    school: string;
};

export default function Register() {
    const [formData, setFormData] = useState<FormData>({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        contact: '',
        school: '',
    });

    const navigate = useNavigate();
    const [registerUser, { isLoading, isError, error }] = registrationAPI.useRegisterUserMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log("Submitting form data:", formData);

        try {
            const response = await registerUser(formData).unwrap();
            // console.log("Backend response:", response);
            toast.success('User registered successfully');
            navigate('/login');
        } catch (err) {
            console.error('Error registering user:', err);
            toast.error('Error registering user');
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-6"
                style={{ backgroundImage: `url(${RegPic})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <Toaster
                    toastOptions={{
                        classNames: {
                            error: 'bg-red-400',
                            success: 'text-green-400',
                            warning: 'text-yellow-400',
                            info: 'bg-blue-400',
                        },
                    }}
                />

                <div className="relative mx-auto my-10 bg-gray-300 bg-opacity-90 rounded-xl shadow-lg p-20">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Create Your Account</h2>

                    <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(['firstname', 'lastname', 'username', 'email', 'contact', 'password', 'school'] as const).map((field) => (
                                <div key={field} className={field === 'school' ? 'sm:col-span-2' : ''}>
                                    <input
                                        name={field}
                                        type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                                        required
                                        className="w-full text-black p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder={field.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>

                        {isError && <p className="text-red-500 text-sm text-center">{(error as any)?.data?.message || 'Error registering user'}</p>}
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-700">
                        Already have an account?{' '}
                        <NavLink to="/login" className="text-blue-600 hover:underline">
                            Log in
                        </NavLink>
                    </p>
                </div>
            </div>
        </>
    );
}
