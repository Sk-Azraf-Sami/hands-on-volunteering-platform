import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/authSlice';
import { setCredentials } from '../slices/authSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginPage = () => {
  const [credentials, setCredentialsState] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentialsState({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(credentials).unwrap();
      dispatch(setCredentials(userData)); // Ensure this line is correct
      console.log('User logged in successfully');
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      console.error('Failed to login user:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">User Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300"
          >
            Login
          </button>
          {isLoading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error.data?.message || error.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;