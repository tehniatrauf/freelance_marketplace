// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaUserPlus, 
  FaHandshake, 
  FaRocket,
  FaShieldAlt,
  FaClock,
  FaDollarSign,
  FaGlobe,
  FaArrowRight
} from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  const stats = [
    { number: '50K+', label: 'Active Freelancers' },
    { number: '12K+', label: 'Jobs Posted' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '150+', label: 'Countries' },
  ];

  const features = [
    {
      icon: <FaSearch className="text-3xl text-blue-500" />,
      title: 'Find Talent',
      description: 'Browse through thousands of skilled freelancers and find the perfect match for your project.',
    },
    {
      icon: <FaUserPlus className="text-3xl text-green-500" />,
      title: 'Post Jobs',
      description: 'Create job postings with detailed requirements and attract qualified professionals.',
    },
    {
      icon: <FaHandshake className="text-3xl text-purple-500" />,
      title: 'Hire & Manage',
      description: 'Review applications, interview candidates, and manage projects seamlessly.',
    },
    {
      icon: <FaRocket className="text-3xl text-orange-500" />,
      title: 'Scale Your Business',
      description: 'Access top talent worldwide and grow your business with flexible hiring options.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up as a client or freelancer and set up your profile.',
      icon: <FaUserPlus className="text-2xl" />,
    },
    {
      number: '02',
      title: 'Post or Find Jobs',
      description: 'Clients post jobs, freelancers browse and apply to opportunities.',
      icon: <FaSearch className="text-2xl" />,
    },
    {
      number: '03',
      title: 'Connect & Hire',
      description: 'Review proposals, interview candidates, and start working together.',
      icon: <FaHandshake className="text-2xl" />,
    },
    {
      number: '04',
      title: 'Complete & Review',
      description: 'Submit work, receive payments, and leave reviews for future collaborations.',
      icon: <FaRocket className="text-2xl" />,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      content: 'WorkConnect helped us find exceptional developers for our project. The process was smooth and efficient.',
      rating: 5,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3b82f6&color=fff',
    },
    {
      name: 'Michael Chen',
      role: 'Freelance Developer',
      content: 'I\'ve found amazing clients through this platform. The interface is intuitive and the support is great.',
      rating: 5,
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=22c55e&color=fff',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      content: 'The quality of freelancers on WorkConnect is outstanding. We\'ve completed 20+ successful projects.',
      rating: 5,
      avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=d946ef&color=fff',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Trusted by 10,000+ businesses worldwide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl font-extrabold text-dark-900 leading-tight"
            >
              Connect with Top
              <span className="gradient-text block"> Freelance Talent</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-xl text-dark-600 max-w-3xl mx-auto"
            >
              WorkConnect is a two-sided marketplace where clients find skilled freelancers 
              and professionals discover meaningful work opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              {!user ? (
                <>
                  <Link
                    to="/register"
                    className="btn-primary text-center flex items-center justify-center gap-2 group"
                  >
                    Get Started
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/browse-jobs"
                    className="btn-outline text-center"
                  >
                    Browse Jobs
                  </Link>
                </>
              ) : (
                <Link
                  to={user.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard'}
                  className="btn-primary text-center"
                >
                  Go to Dashboard
                </Link>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-dark-600 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
              Why Choose <span className="gradient-text">WorkConnect</span>
            </h2>
            <p className="mt-4 text-xl text-dark-600 max-w-2xl mx-auto">
              Everything you need to find talent or work, all in one platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="card-hover bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-dark-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-dark-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="mt-4 text-xl text-dark-600 max-w-2xl mx-auto">
              Four simple steps to start your freelancing journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line - Desktop */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200"></div>
            
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-lg shadow-blue-500/30">
                    {step.number}
                  </div>
                  <div className="mt-6 text-2xl font-semibold text-dark-900">
                    {step.title}
                  </div>
                  <p className="mt-2 text-dark-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
              What Our <span className="gradient-text">Users Say</span>
            </h2>
            <p className="mt-4 text-xl text-dark-600 max-w-2xl mx-auto">
              Hear from our community of clients and freelancers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-dark-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-dark-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-dark-600 leading-relaxed">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of professionals and businesses already using WorkConnect.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Create Free Account
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;