// frontend/src/components/auth/Register.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGlobe
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  // Countries list (30+ countries)
  const countries = [
    { code: 'AF', name: 'Afghanistan' },
    { code: 'AL', name: 'Albania' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AU', name: 'Australia' },
    { code: 'AT', name: 'Austria' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BR', name: 'Brazil' },
    { code: 'CA', name: 'Canada' },
    { code: 'CN', name: 'China' },
    { code: 'CO', name: 'Colombia' },
    { code: 'HR', name: 'Croatia' },
    { code: 'CU', name: 'Cuba' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'DK', name: 'Denmark' },
    { code: 'EG', name: 'Egypt' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'GR', name: 'Greece' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'IN', name: 'India' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'IR', name: 'Iran' },
    { code: 'IQ', name: 'Iraq' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IL', name: 'Israel' },
    { code: 'IT', name: 'Italy' },
    { code: 'JP', name: 'Japan' },
    { code: 'JO', name: 'Jordan' },
    { code: 'KE', name: 'Kenya' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'LB', name: 'Lebanon' },
    { code: 'LY', name: 'Libya' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'MX', name: 'Mexico' },
    { code: 'MA', name: 'Morocco' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'NO', name: 'Norway' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'PE', name: 'Peru' },
    { code: 'PH', name: 'Philippines' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'QA', name: 'Qatar' },
    { code: 'RO', name: 'Romania' },
    { code: 'RU', name: 'Russia' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'KR', name: 'South Korea' },
    { code: 'ES', name: 'Spain' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'SY', name: 'Syria' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'TH', name: 'Thailand' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'TR', name: 'Turkey' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
    { code: 'YE', name: 'Yemen' },
    { code: 'ZW', name: 'Zimbabwe' }
  ];

  // Initialize with empty values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    country: '',
    role: 'freelancer',
    companyName: '',
    title: '',
    skills: [],
    experience: '',
    hourlyRate: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Clear form function
  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      location: '',
      country: '',
      role: 'freelancer',
      companyName: '',
      title: '',
      skills: [],
      experience: '',
      hourlyRate: '',
    });
  };

  // Reset form when component mounts
  useEffect(() => {
    clearForm();
  }, []);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) newErrors.role = 'Please select a role';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await register(formData);
      if (result.success) {
        toast.success('Account created successfully! 🎉');
        clearForm();
        navigate('/role-selection');
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2">
          Full Name *
        </label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 text-sm" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`input-primary pl-10 pr-4 py-3 w-full ${errors.name ? 'error' : ''}`}
            autoComplete="off"
          />
        </div>
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 text-sm" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className={`input-primary pl-10 pr-4 py-3 w-full ${errors.email ? 'error' : ''}`}
            autoComplete="off"
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2">
          Password *
        </label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 text-sm" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min 8 characters"
            className={`input-primary pl-10 pr-12 py-3 w-full ${errors.password ? 'error' : ''}`}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-dark-600 transition-colors"
          >
            {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 text-sm" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className={`input-primary pl-10 pr-12 py-3 w-full ${errors.confirmPassword ? 'error' : ''}`}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-dark-600 transition-colors"
          >
            {showConfirmPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2">
          I want to join as *
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'client' }))}
            className={`p-4 rounded-xl border-2 transition-all ${
              formData.role === 'client'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <FaBriefcase className="text-2xl mx-auto mb-2 text-dark-600" />
              <div className="font-medium text-dark-900">Client</div>
              <div className="text-xs text-dark-500">Hire freelancers</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'freelancer' }))}
            className={`p-4 rounded-xl border-2 transition-all ${
              formData.role === 'freelancer'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <FaUser className="text-2xl mx-auto mb-2 text-dark-600" />
              <div className="font-medium text-dark-900">Freelancer</div>
              <div className="text-xs text-dark-500">Find work</div>
            </div>
          </button>
        </div>
        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="btn-primary w-full py-3 text-lg"
      >
        Continue
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 text-sm" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
            className="input-primary pl-10 pr-4 py-3 w-full"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Country Dropdown */}
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2">
          Country *
        </label>
        <div className="relative">
          <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 text-sm" />
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="input-primary pl-10 pr-4 py-3 w-full appearance-none bg-white cursor-pointer"
            required
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2">
          City / Location
        </label>
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 text-sm" />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., New York, London, Dubai"
            className="input-primary pl-10 pr-4 py-3 w-full"
            autoComplete="off"
          />
        </div>
      </div>

      {formData.role === 'client' ? (
        <div>
          <label className="block text-sm font-medium text-dark-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your Company Name"
            className="input-primary no-icon py-3 w-full"
            autoComplete="off"
          />
        </div>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Professional Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Full Stack Developer"
              className="input-primary no-icon py-3 w-full"
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Hourly Rate ($)
            </label>
            <input
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              placeholder="25"
              className="input-primary no-icon py-3 w-full"
              autoComplete="off"
            />
          </div>
        </>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 btn-outline py-3 text-lg"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 btn-primary py-3 text-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
      >
        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex-1 flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
              step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              step >= 2 ? 'bg-blue-500' : 'bg-gray-200'
            }`}></div>
          </div>
          <div className="flex-1 flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
              step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-dark-900">Create Account</h2>
          <p className="mt-2 text-dark-500">
            {step === 1 ? 'Start your freelancing journey' : 'Tell us more about yourself'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 ? renderStep1() : renderStep2()}
        </form>

        <p className="mt-6 text-center text-dark-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;