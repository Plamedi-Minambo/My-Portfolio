import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import APCleaningLogo from '../../assets/APCleaningLogo.png'
import bgImage from '../../assets/background.jpg';


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!formData.agreeTerms) {
    alert("You must agree to the terms");
    return;
  }

  try {
    const response = await axios.post('https://apcleaningbackend20251029193438.azurewebsites.net/api/auth/register', {
      FullName: formData.fullName,
      Email: formData.email,
      PhoneNumber: formData.phoneNumber,
      Password: formData.password

    });

    alert(response.data.message);
    navigate("/login")
  } catch (error) {
  if (error.response) {
    console.error("Backend error:", error.response.data);
    alert(
      error.response.data?.errors?.join('\n') ||
      error.response.data?.title ||
      "Registration failed"
    );
  } else {
    console.error("Network error:", error.message);
    alert("Network error");
  }
}
};

  


  return (
    <div className="relative min-h-screen w-full h-screen">
      <div 
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 overflow-y-auto">
        
        {/* Logo */}
        <div className="mb-6">
          <img 
            src={APCleaningLogo} 
            alt="AP Cleaning Services Logo" 
            className="w-28 h-28 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-white text-3xl font-bold text-center mb-3">
          Create Your AP Cleaning Account
        </h1>
        <p className="text-white text-center mb-8 max-w-md text-sm">
          Book trusted cleaners, manage your bookings, and unlock exclusive benefits
        </p>

        {/* Form Container */}
        <form className="w-full max-w-lg space-y-4" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-1 text-left">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 text-sm focus:outline-none"
            />
          </div>

          {/* Email and Password Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white text-sm font-medium mb-1 text-left">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-1 text-left">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 pr-10 bg-white border-0 rounded text-gray-900 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Phone Number and Confirm Password Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white text-sm font-medium mb-1 text-left">Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-1 text-left">Confirm Password *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 pr-10 bg-white border-0 rounded text-gray-900 text-sm focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              id="terms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="h-4 w-4"
            />
            <label htmlFor="terms" className="text-white text-sm">
              I agree to the <span className="underline">Terms and Conditions</span>
            </label>
          </div>

          {/* Sign Up Button */}
          <div className="mt-6">
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#1f2937',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#111827'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#1f2937'}
            >
              Sign Up
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-4">
            <p className="text-white text-sm">
              Already have an account? <a href="/login" className="underline cursor-pointer">Sign In</a>
            </p>
          </div>

        </form>
      </div>
    </div>
    </div>
    
  );
};

export default Register;