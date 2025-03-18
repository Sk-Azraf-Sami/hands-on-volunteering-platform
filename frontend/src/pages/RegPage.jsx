import React, { useState } from 'react';
import { useRegisterMutation } from '../slices/authSlice';
import Select from 'react-select';
import '@fortawesome/fontawesome-free/css/all.min.css';

const skillsOptions = [
  { value: 'communication', label: 'Communication' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'teamwork', label: 'Teamwork' },
  { value: 'problem-solving', label: 'Problem Solving' },
  { value: 'technical', label: 'Technical' },
  { value: 'management', label: 'Management' },
  { value: 'design', label: 'Design' },
  { value: 'other', label: 'Other' },
];

const causesOptions = [
  { value: 'environment', label: 'Environment' },
  { value: 'education', label: 'Education' },
  { value: 'health', label: 'Health' },
  { value: 'animal-welfare', label: 'Animal Welfare' },
  { value: 'community', label: 'Community' },
  { value: 'human-rights', label: 'Human Rights' },
  { value: 'arts-culture', label: 'Arts & Culture' },
  { value: 'other', label: 'Other' },
];

const RegPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    skills: [],
    causes: [],
    volunteerHistory: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSkillsChange = (selectedOptions) => {
    setUser({
      ...user,
      skills: selectedOptions,
    });
  };

  const handleCausesChange = (selectedOptions) => {
    setUser({
      ...user,
      causes: selectedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user).unwrap();
      console.log('User registered successfully');
      // Handle successful registration (e.g., redirect to login page)
    } catch (err) {
      console.error('Failed to register user:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">User Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Skills:</label>
            <Select
              isMulti
              name="skills"
              options={skillsOptions}
              className="mt-1 block w-full"
              classNamePrefix="select"
              onChange={handleSkillsChange}
              value={user.skills}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Causes:</label>
            <Select
              isMulti
              name="causes"
              options={causesOptions}
              className="mt-1 block w-full"
              classNamePrefix="select"
              onChange={handleCausesChange}
              value={user.causes}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Volunteer History:</label>
            <textarea
              name="volunteerHistory"
              value={user.volunteerHistory}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300"
          >
            Submit
          </button>
          {isLoading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error.data?.message || error.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegPage;