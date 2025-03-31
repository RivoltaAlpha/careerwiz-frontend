import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { clearUser } from '../features/users/userSlice';
import { MdFormatListBulletedAdd, MdOutlineHotelClass } from "react-icons/md";
import { RiAccountPinCircleFill, RiHomeHeartFill, RiLogoutCircleFill } from 'react-icons/ri';
import { FaSquarePollVertical } from 'react-icons/fa6';
import { FaLaptopCode } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

const Sidebar: React.FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);
    const user = useSelector((state: RootState) => state.user.user);
    const userId = user?.user_id;
    const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };
  return (
    <>
    {/* Mobile Navbar Toggle */}
    <button
    type='button'
      className="lg:hidden p-1 text-white bg-cards fixed top-4 left-4 z-50 rounded-md"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
    </button>

    {/* Sidebar */}
    <div className={`bg-cards min-h-screen w-[300px] fixed lg:relative transition-all duration-300
        ${isOpen ? "left-0" : "-left-[300px]"} lg:left-0 lg:block z-40`}
    >
      <nav className="flex flex-col gap-8 space-y-2">
        <ul className="p-6 space-y-6 lg:space-y-12">
          <li className="flex items-center gap-2">
            <RiHomeHeartFill />
            <Link to="/dashboard" className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Dashboard</Link>
          </li>
          <li className="flex items-center gap-2">
            <FaLaptopCode />
            <Link to={`/academics/${userId}`} className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Academics</Link>
          </li>
          <li className="flex items-center gap-2">
            <MdFormatListBulletedAdd />
            <Link to={`/career-cart/${userId}`} className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Career Interests</Link>
          </li>
          <li className="flex items-center gap-2">
            <MdFormatListBulletedAdd />
            <Link to={`/student-interests/${userId}`} className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Personal Interests</Link>
          </li>
          <li className="flex items-center gap-2">
            <MdOutlineHotelClass />
            <Link to={`/student-recommendations/${userId}`} className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Recommendations</Link>
          </li>
          <li className="flex items-center gap-2">
            <FaSquarePollVertical />
            <Link to={`/user-feedback/${userId}`} className="hover:underline text-white hover:bg-gray-900 rounded p-2">Feedback</Link>
          </li>
          <li className="flex items-center gap-2">
            <RiAccountPinCircleFill />
            <Link to="/profile" className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Profile</Link>
          </li>
        </ul>

        {isAuthenticated && (
          <div className="flex items-center ml-6 gap-2">
            <RiLogoutCircleFill />
            <button type="button" onClick={handleLogout} className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Logout</button>
          </div>
        )}
      </nav>
    </div>

    {/* Sidebar Overlay for Mobile */}
    {isOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
        onClick={() => setIsOpen(false)}
      />
    )}
  </>
  );
};

export default Sidebar;
