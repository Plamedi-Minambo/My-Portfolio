import { useState } from 'react';
import Footer from "../../components/Footer";
import axios from 'axios';

const Shop = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('https://apcleaningbackend20251029193438.azurewebsites.net/api/WaitlistEntries', { email });
    alert('Thanks! You’ll be notified when we launch.');
    setEmail('');
  } catch (error) {
    console.error('Error submitting email:', error);
    if (error.response?.status === 409) {
    alert('This email is already on the waitlist.');
  } else {
    alert('Oops! Something went wrong.');
  }

  }
};


  return (
    <>
    <div className="min-h-screen w-full h-screen  flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-lg text-center">
        
        {/* Shopping Cart Illustration */}
        <div className="relative mb-12">
          {/* Decorative sparkles */}
          <div className="absolute -top-6 -left-12 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/>
            </svg>
          </div>
          <div className="absolute -top-8 -right-8 text-gray-400">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 0l1.5 4.5h4.5l-3.5 2.5 1.5 4.5-3.5-2.5-3.5 2.5 1.5-4.5-3.5-2.5h4.5z"/>
            </svg>
          </div>
          <div className="absolute -bottom-4 -left-8 text-gray-400">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 0l1.5 4.5h4.5l-3.5 2.5 1.5 4.5-3.5-2.5-3.5 2.5 1.5-4.5-3.5-2.5h4.5z"/>
            </svg>
          </div>
          <div className="absolute -bottom-6 -right-12 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/>
            </svg>
          </div>

          {/* Main cart container */}
          <div className="relative mx-auto w-40 h-28 bg-gray-300 rounded-3xl flex items-center justify-center">
            {/* Shopping cart icon - FIXED */}
            <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
            </svg>

            {/* Mouse cursor */}
            <div className="absolute -bottom-3 -right-3">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-gray-800">
                <path fill="currentColor" d="M6.5 2L20 15.5L14 16L11 20L6.5 2Z"/>
                <path fill="white" d="M8.5 4L11.5 17L13.5 14.5L17.5 14L8.5 4Z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          Quality Cleaning Products, Coming Soon!
        </h1>
        
        {/* Description */}
        <p className="text-gray-700 text-lg mb-12 leading-relaxed max-w-md mx-auto">
          We're working behind the scenes to bring you our favorite tools, sprays, soaps, 
          and home care essentials - curated by the cleaners you already trust.
        </p>

        {/* Email Form */}
        <div className="max-w-sm mx-auto">
          <div className="mb-4">
            <label className="block text-left text-sm font-medium text-gray-700 mb-3">
              Email Address:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg bg-white text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
              placeholder=""
            />
          </div>
          
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              backgroundColor: '#374151',
              color: 'white',
              padding: '16px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1f2937'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#374151'}
          >
            Get Notified
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Shop