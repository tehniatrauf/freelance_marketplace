// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find the Best Freelance Talent
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with skilled freelancers or find your next project.
            Join thousands of businesses and freelancers already using WorkConnect.
          </p>
          {!user ? (
            <div className="flex gap-4 justify-center">
              <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
                Get Started
              </Link>
              <Link to="/browse-jobs" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                Browse Jobs
              </Link>
            </div>
          ) : (
            <Link 
              to={user.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard'} 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose WorkConnect?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">Find Talent</h3>
              <p className="text-gray-600">Post jobs and connect with skilled freelancers worldwide.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Grow Your Business</h3>
              <p className="text-gray-600">Scale your projects with flexible hiring options.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Safe and reliable payment processing for all projects.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;