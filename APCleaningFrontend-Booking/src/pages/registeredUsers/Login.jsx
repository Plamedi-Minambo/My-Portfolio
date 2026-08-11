import { useState, useContext } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import APCleaningLogo from '../../assets/aPCleaningLogo.png';
import bgImage from '../../assets/background.jpg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://apcleaningbackend20251029193438.azurewebsites.net/api/auth/login', {
        Email: formData.email,
        Password: formData.password
      });

      const token = response.data.token;
      login(token);

      const decoded = jwtDecode(token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];


      alert("Login successful!");
      if(role === "Customer"){
        navigate('/book'); // navigates to the booking page
      }
      else if(role === "Admin"){
        navigate("/manage-bookings")
      }
      else if(role === "Cleaner"){
        navigate("/cleaner-dashboard")
      }
      else if(role === "Driver"){
        navigate("/driver-dashboard")
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Login failed");
      } else {
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
          Welcome Back!
        </h1>
        <p className="text-white text-center mb-8 max-w-md text-sm">
          Let's get your home back to sparkling
        </p>

        {/* Form Container */}
        <form className="w-full max-w-lg space-y-4" onSubmit={handleSubmit}>
          
          {/* Login Address */}
          <div>
            <label className="block text-white text-sm font-medium mb-1 text-left">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 bg-white border-0 rounded text-gray-900 text-sm focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-white text-sm font-medium">Password *</label>
              <Link to="forgot-password" className="text-red-300 text-sm underline hover:no-underline">
                Forgot Password
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 pr-10 bg-white border-0 rounded text-gray-900 text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
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
              Sign In
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-white text-sm">
              Don't have an account? <a href="/register" className="underline cursor-pointer">Sign up and unlock member benefits and fast booking</a>
            </p>
          </div>

        </form>
      </div>
    </div>
    </div>
    
  );
};

export default Login