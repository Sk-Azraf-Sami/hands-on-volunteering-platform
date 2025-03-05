import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-white text-lg font-semibold">HandsOn</Link>
      <div>
        <Link to="/profile" className="text-white mr-4">Profile</Link>
        <Link to="/events" className="text-white">Events</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;