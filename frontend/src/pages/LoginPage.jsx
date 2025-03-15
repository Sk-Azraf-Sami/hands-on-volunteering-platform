import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/authSlice';
import { setCredentials } from '../slices/authSlice';

const LoginPage = () => {
  const [credentials, setCredentialsState] = useState({
    email: '',
    password: '',
  });

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

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          Login
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error.data?.message || error.error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;