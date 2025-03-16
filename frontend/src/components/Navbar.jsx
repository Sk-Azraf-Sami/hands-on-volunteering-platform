import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkTokenExpiration, logout } from '../slices/authSlice';
import Logout from './Logout';

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkTokenExpiration());
  }, [dispatch]);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">HandsOn</Link>
        <div>
          {token ? (
            <>
              <Link to="/profile" className="text-white mr-4">Profile</Link>
              <Link to="/events" className="text-white mr-4">Events</Link>
              <Link to="/help-requests" className="text-white mr-4">Help Requests</Link>
              <Link to="/teams" className="text-white mr-4">Teams</Link>
              <Logout />
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">Login</Link>
              <Link to="/registration" className="text-white mr-4">Registration</Link>
              <Link to="/events" className="text-white mr-4">Events</Link>
              <Link to="/help-requests" className="text-white">Help Requests</Link>
              <Link to="/teams" className="text-white mr-4">Teams</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;