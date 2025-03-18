import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkTokenExpiration, logout } from '../slices/authSlice';
import Logout from './Logout';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkTokenExpiration());
  }, [dispatch]);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold transition duration-300 hover:text-gray-300">
          <i className="fas fa-hands-helping mr-2"></i>HandsOn
        </Link>
        <div className="flex space-x-4">
          <Link to="/events" className="text-white transition duration-300 hover:text-gray-300">
            <i className="fas fa-calendar-alt mr-1"></i>Events
          </Link>
          <Link to="/help-requests" className="text-white transition duration-300 hover:text-gray-300">
            <i className="fas fa-hands mr-1"></i>Help Requests
          </Link>
          <Link to="/teams" className="text-white transition duration-300 hover:text-gray-300">
            <i className="fas fa-users mr-1"></i>Teams
          </Link>
          {token ? (
            <>
              <Link to="/profile" className="text-white transition duration-300 hover:text-gray-300">
                <i className="fas fa-user mr-1"></i>Profile
              </Link>
              <Logout />
            </>
          ) : (
            <>
              <Link to="/login" className="text-white transition duration-300 hover:text-gray-300">
                <i className="fas fa-sign-in-alt mr-1"></i>Login
              </Link>
              <Link to="/registration" className="text-white transition duration-300 hover:text-gray-300">
                <i className="fas fa-user-plus mr-1"></i>Registration
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;