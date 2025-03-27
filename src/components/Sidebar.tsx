import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { clearUser } from '../features/users/userSlice';
import { MdFormatListBulletedAdd, MdOutlineHotelClass } from "react-icons/md";
import { RiAccountPinCircleFill, RiHomeHeartFill, RiLogoutCircleFill } from 'react-icons/ri';
import { FaSquarePollVertical } from 'react-icons/fa6';
import { FaLaptopCode } from 'react-icons/fa';

const Sidebar: React.FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);
    const user = useSelector((state: RootState) => state.user.user);
    const userId = user?.user_id;
  //  const [isOpen, setIsOpen] = useState(false);
   
  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };
  return (
    <div className="w-[300px] min-h-screen bg-cards ">
      <nav className="flex flex-col gap-8 space-y-2">
        <ul className='p-6 space-y-10 '>
          <li className='flex items-center'>
            <RiHomeHeartFill />
            <Link to="/dashboard" className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Dashboard</Link>
          </li>
          <li className='flex items-center'>
          <FaLaptopCode />
            <Link to={`/academics/${userId}`} className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Academics</Link>
          </li>
          <li className='flex items-center'>
            <MdFormatListBulletedAdd />
            <Link to={`/career-cart/${userId}`} className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Career Interests</Link>
          </li>
          <li className='flex items-center'>
            <MdFormatListBulletedAdd />
            <Link to={`/student-interests/${userId}`} className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Personal Interests</Link>
          </li>
          <li className='flex items-center'>
            <MdOutlineHotelClass />
            <Link to={`/student-recommendations/${userId}`} className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Recommendations</Link>
          </li>
          <li className='flex items-center'>
            <FaSquarePollVertical />
            <Link to={`/user-feedback/${userId}`} className="hover:underline text-white hover:bg-gray-900 rounded p-2">Feedback</Link>
          </li>
          <li className='flex items-center'>
            <RiAccountPinCircleFill />
            <Link to="/profile" className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Profile</Link>
          </li>
        </ul>

        {isAuthenticated && (
          <div className='flex items-center ml-6'>
          <RiLogoutCircleFill />
            <button type="button" onClick={handleLogout} className="hover:underline text-white hover:bg-gray-900 hover:rounded p-2">Logout</button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
