import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center mt-16">
        <h1 className="text-4xl font-bold">
          <i className="fas fa-hands-helping mr-2"></i> Welcome to HandsOn
        </h1>
        <p className="mt-2 text-lg">Connecting volunteers with those in need</p>
      </header>
      <main className="container mx-auto p-6">
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-2">Events</h2>
              <p className="text-gray-700">Join and participate in various events to help the community.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-2">Help Requests</h2>
              <p className="text-gray-700">Find and respond to help requests from people in need.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-2">Teams</h2>
              <p className="text-gray-700">Create or join teams to collaborate on volunteer projects.</p>
            </div>
          </div>
        </section>
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Volunteers</h2>
          <div className="flex justify-center space-x-4">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src="https://randomuser.me/api/portraits/thumb/women/5.jpg" alt="Volunteer 1" className="rounded-full mb-4 mx-auto" />
              <h3 className="text-xl font-bold">Volunteer 1</h3>
              <p className="text-gray-700">"Volunteering has changed my life!"</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src="https://randomuser.me/api/portraits/thumb/men/2.jpg" alt="Volunteer 2" className="rounded-full mb-4 mx-auto" />
              <h3 className="text-xl font-bold">Volunteer 2</h3>
              <p className="text-gray-700">"Helping others is my passion."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src="https://randomuser.me/api/portraits/thumb/men/3.jpg" alt="Volunteer 3" className="rounded-full mb-4 mx-auto" />
              <h3 className="text-xl font-bold">Volunteer 3</h3>
              <p className="text-gray-700">"Making a difference one step at a time."</p>
            </div>
          </div>
        </section>
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Purpose of Volunteering</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <i className="fas fa-star-and-crescent text-4xl text-green-500 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Islam</h3>
              <p className="text-gray-700">"The best of people are those that bring most benefit to the rest of mankind." - Prophet Muhammad (PBUH)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <i className="fas fa-cross text-4xl text-blue-500 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Christianity</h3>
              <p className="text-gray-700">"Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms." - 1 Peter 4:10</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <i className="fas fa-om text-4xl text-orange-500 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Hinduism</h3>
              <p className="text-gray-700">"The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <i className="fas fa-dharmachakra text-4xl text-yellow-500 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Buddhism</h3>
              <p className="text-gray-700">"If you light a lamp for somebody, it will also brighten your path." - Buddha</p>
            </div>
          </div>
        </section>
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Quotes from Great Figures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Malcolm-x.jpg" alt="Malcolm X" className="rounded-full mb-4 mx-auto w-24 h-24 object-cover" />
              <h3 className="text-xl font-bold mb-2">Malcolm X</h3>
              <p className="text-gray-700">"The future belongs to those who prepare for it today."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Mother_Teresa_1.jpg" alt="Mother Teresa" className="rounded-full mb-4 mx-auto w-24 h-24 object-cover" />
              <h3 className="text-xl font-bold mb-2">Mother Teresa</h3>
              <p className="text-gray-700">"Not all of us can do great things. But we can do small things with great love."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Martin_Luther_King%2C_Jr..jpg" alt="Martin Luther King Jr." className="rounded-full mb-4 mx-auto w-24 h-24 object-cover" />
              <h3 className="text-xl font-bold mb-2">Martin Luther King Jr.</h3>
              <p className="text-gray-700">"Life's most persistent and urgent question is, 'What are you doing for others?'"</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg" alt="Albert Einstein" className="rounded-full mb-4 mx-auto w-24 h-24 object-cover" />
              <h3 className="text-xl font-bold mb-2">Albert Einstein</h3>
              <p className="text-gray-700">"Only a life lived for others is a life worthwhile."</p>
            </div>
          </div>
        </section>
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
          <p className="text-gray-700 mb-6">Join us today and start making a difference in your community.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Join Now
          </button>
        </section>
      </main>
    </div>
  );
};

export default HomePage;