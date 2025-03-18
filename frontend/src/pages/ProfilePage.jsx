import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetTeamsQuery } from '../slices/teamSlice';
import { useGetEventsQuery } from '../slices/eventSlice';
import { useUpdateUserMutation } from '../slices/userSlice';
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

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [userInfo, setUserInfo] = useState({
    ...user,
    skills: [],
    causes: [],
  });
  const { data: teams, isLoading: isLoadingTeams } = useGetTeamsQuery();
  const { data: events, isLoading: isLoadingEvents } = useGetEventsQuery();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      try {
        console.log('Raw skills:', user.skills);
        console.log('Raw causes:', user.causes);

        const correctedSkills = user.skills.replace(/^{/, '[').replace(/}$/, ']').replace(/"/g, '"');
        const correctedCauses = user.causes.replace(/^{/, '[').replace(/}$/, ']').replace(/"/g, '"');

        const parsedSkills = JSON.parse(correctedSkills);
        const parsedCauses = JSON.parse(correctedCauses);

        console.log('Parsed skills:', parsedSkills);
        console.log('Parsed causes:', parsedCauses);

        setUserInfo({
          ...user,
          skills: Array.isArray(parsedSkills) ? parsedSkills.map(skill => skillsOptions.find(option => option.value === skill)) : [],
          causes: Array.isArray(parsedCauses) ? parsedCauses.map(cause => causesOptions.find(option => option.value === cause)) : [],
        });
      } catch (error) {
        console.error('Error parsing skills or causes:', error);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSkillsChange = (selectedOptions) => {
    setUserInfo({
      ...userInfo,
      skills: selectedOptions,
    });
  };

  const handleCausesChange = (selectedOptions) => {
    setUserInfo({
      ...userInfo,
      causes: selectedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserInfo = {
        ...userInfo,
        skills: Array.isArray(userInfo.skills) ? userInfo.skills.map(skill => skill.value) : [],
        causes: Array.isArray(userInfo.causes) ? userInfo.causes.map(cause => cause.value) : [],
      };
  
      const response = await updateUser(updatedUserInfo).unwrap();
      console.log('API Response:', response);

      if (response) { // Ensure response is not undefined
        alert('Profile updated successfully');
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (err) {
      console.error('Failed to update profile:', err.message);
    }
  };

  const ownedTeams = teams?.filter((team) => team.user_id === user.id) || [];
  const joinedTeams = teams?.filter((team) => team.members?.some((member) => member.id === user.id)) || [];
  const joinedEvents = events?.filter((event) => event.isJoined) || [];

  if (isLoadingTeams || isLoadingEvents) return <p>Loading...</p>;

  return (
    <div className="min-h-screen pt-16 max-w-4xl mx-auto p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">
          <i className="fas fa-user-circle mr-2"></i>Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
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
              value={userInfo.skills}
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
              value={userInfo.causes}
            />
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300">
            <i className="fas fa-save mr-2"></i>Update Profile
          </button>
        </form>
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800">
            <i className="fas fa-users mr-2"></i>Teams Owned
          </h3>
          <ul className="list-disc list-inside">
            {ownedTeams.map((team) => (
              <li key={team.id}>
                <a href={`/teams/${team.id}/dashboard`} className="text-violet-600 hover:underline">
                  {team.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800">
            <i className="fas fa-users mr-2"></i>Teams Joined
          </h3>
          <ul className="list-disc list-inside">
            {joinedTeams.map((team) => (
              <li key={team.id}>
                <a href={`/teams/${team.id}/dashboard`} className="text-violet-600 hover:underline">
                  {team.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800">
            <i className="fas fa-calendar-alt mr-2"></i>Events Joined
          </h3>
          <ul className="list-disc list-inside">
            {joinedEvents.map((event) => (
              <li key={event.id}>
                <a href={`/events/${event.id}`} className="text-violet-600 hover:underline">
                  {event.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;