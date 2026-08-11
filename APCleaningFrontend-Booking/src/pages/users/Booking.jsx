import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../../components/Footer";

const Booking = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const BOOKING_FEE = 30;
  const VAT = 20;

  const [booking, setBooking] = useState({
    serviceType: '',
    date: '',
    time: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    agreedToTerms: false,
    specialInstructions: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [getServices, setGetServices] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const preselectedServiceID = queryParams.get("service");
  const selectedService = getServices.find(s => String(s.serviceTypeID) === booking.serviceType);
  const servicePrice = selectedService ? parseFloat(selectedService.price) : 0;
  const total = servicePrice + BOOKING_FEE + VAT;

  useEffect(() => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/ServiceTypes")
      .then(res => setGetServices(res.data))
      .catch(err => console.error("Failed to fetch services:", err));
  }, []);

  useEffect(() => {
    if (getServices.length > 0 && preselectedServiceID) {
      const match = getServices.find(s => String(s.serviceTypeID) === String(preselectedServiceID));
      if (match) {
        setBooking(prev => ({ ...prev, serviceType: String(match.serviceTypeID) }));
      }
    }
  }, [getServices, preselectedServiceID]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBooking(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['serviceType', 'date', 'time', 'address', 'zipCode', 'city'];

    if (!user?.id) {
    requiredFields.push('fullName', 'email', 'phone');
  }

    requiredFields.forEach(field => {
      const value = booking[field];
      if (typeof value !== 'string' || value.trim() === '') {
        errors[field] = 'This field is required';
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookingPayload = {
      customerID: user?.id || `guest-${Date.now()}`,
      assignedDriverID: null,
      assignedCleanerID: null,
      serviceTypeID: booking.serviceType,
      serviceDate: new Date(booking.date).toISOString().split("T")[0],
      serviceStartTime: `${booking.date}T${booking.time}`,
      serviceEndTime: `${booking.date}T${booking.time}`,
      bookingAmount: parseFloat(total.toFixed(2)),
      createdDate: new Date().toISOString(),
      fullName: booking.fullName.trim() || '',
      email: booking.email.trim() || '',
      phone: booking.phone?.trim() || '',
      address: booking.address.trim(),
      zipCode: booking.zipCode.trim(),
      city: booking.city.trim(),
      specialInstructions: booking.specialInstructions?.trim() || "none"
    };

    axios.post("https://apcleaningbackend20251029193438.azurewebsites.net/api/Bookings", bookingPayload, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => {
        const redirectUrl = res.data.redirectUrl;
        if (redirectUrl) {
          alert("Booking confirmed! Redirecting to payment...");
          window.location.href = redirectUrl;
        } else {
          alert("Booking saved, but no payment link received.");
          navigate("/book", { replace: true });
        }
      })
      .catch(err => {
        console.error("Booking error:", err);
        if (err.response?.status === 409) {
          // Handle conflict (duplicate booking slot)
          alert("Sorry, this date and time slot is already booked. Please select another one ❤️");
        } 
        else 
          {
            alert(err.response?.data?.message || "Network error or server unreachable. Please try again later.");
          }
});

  };

  useEffect(() => {
  if (user?.id) {
    setBooking(prev => ({
      ...prev,
      fullName: prev.fullName || user.fullName || '',
      email: prev.email || user.email || '',
      phone: prev.phone || user.phone || ''
    }));
  }
}, [user]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center text-[#392C3A]">Book a Cleaning Service</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Selection */}
          <div>
            <h2 className="text-2xl font-bold text-center text-[#392C3A]">Select Service</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {getServices.map(s => (
                <label
                  key={s.serviceTypeID}
                  onClick={() => setBooking(prev => ({ ...prev, serviceType: String(s.serviceTypeID) }))}
                  className={`border rounded-xl p-4 cursor-pointer transition duration-300 ease-in-out transform hover:shadow-md hover:scale-[1.01] ${
                    booking.serviceType === String(s.serviceTypeID)
                      ? "bg-[#392C3A] text-white border-[#392C3A]"
                      : "bg-white text-gray-800 border-gray-300 hover:border-[#392C3A]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{s.name}</h3>
                      <p className="text-sm text-gray-500">Price: R{s.price}</p>
                    </div>
                    <input
                      type="radio"
                      name="serviceType"
                      value={String(s.serviceTypeID)}
                      checked={booking.serviceType === String(s.serviceTypeID)}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 text-white"
                    />
                  </div>
                </label>
              ))}
            </div>
            {validationErrors.serviceType && (
              <p className="text-red-500 text-sm mt-2 text-center">{validationErrors.serviceType}</p>
            )}
          </div>

          {/* Date and Time */}
          <h2 className="text-2xl font-bold text-center text-[#392C3A]">Choose Your Appointment</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Date Picker */}
  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-300">
    <label className="block text-sm font-semibold text-[#392C3A] mb-2">Select a Date</label>
    <input
      type="date"
      name="date"
      value={booking.date}
      onChange={handleChange}
      min={new Date().toISOString().split("T")[0]}
      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#392C3A] ${
        validationErrors.date ? 'border-red-500' : ''
      }`}
    />
    {validationErrors.date && (
      <p className="text-red-500 text-sm mt-1">{validationErrors.date}</p>
    )}
  </div>

  {/* Time Picker */}
  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-300">
    <label className="block text-sm font-semibold text-[#392C3A] mb-2">Select a Time</label>
    <select
      name="time"
      value={booking.time}
      onChange={handleChange}
      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#392C3A] ${
        validationErrors.time ? 'border-red-500' : ''
      }`}
    >
      <option value="">Choose a time slot</option>
      {[
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
        "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
      ].map(slot => (
        <option key={slot} value={slot}>{slot}</option>
      ))}
    </select>
    {validationErrors.time && (
      <p className="text-red-500 text-sm mt-1">{validationErrors.time}</p>
    )}
  </div>
</div>

{/* Summary */}
{booking.date && booking.time && (
  <div className="text-center mt-4 text-sm text-gray-700">
    <p>
      You’ve selected <span className="font-semibold text-[#392C3A]">{booking.date}</span> at{" "}
      <span className="font-semibold text-[#392C3A]">{booking.time}</span>.
    </p>
  </div>
)}

          {/* Personal Info */}
          <h2 className="text-2xl font-bold text-center text-[#392C3A]">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!user?.id && (
              <>
                <div>
                  <input type="text" name="fullName" placeholder="Full Name" value={booking.fullName} onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${validationErrors.fullName ? 'border-red-500' : ''}`} />
                  {validationErrors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.fullName}</p>
                  )}
                </div>
                <div>
                  <input type="email" name="email" placeholder="Email Address" value={booking.email} onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${validationErrors.email ? 'border-red-500' : ''}`} />
                                    {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <input type="text" name="phone" placeholder="Phone Number" value={booking.phone} onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${validationErrors.phone ? 'border-red-500' : ''}`} />
                  {validationErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                  )}
                </div>
              </>
            )}
            <div>
              <input type="text" name="address" placeholder="Address" value={booking.address} onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${validationErrors.address ? 'border-red-500' : ''}`} />
              {validationErrors.address && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.address}</p>
              )}
            </div>
            <div>
              <input type="text" name="zipCode" placeholder="Zip Code" value={booking.zipCode} onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${validationErrors.zipCode ? 'border-red-500' : ''}`} />
              {validationErrors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.zipCode}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <input type="text" name="city" placeholder="City" value={booking.city} onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${validationErrors.city ? 'border-red-500' : ''}`} />
              {validationErrors.city && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <textarea name="specialInstructions" placeholder="Special instructions (e.g., pet-friendly, supplies provided) *Optional*" 
                        value={booking.specialInstructions}
                        onChange={handleChange} className= "w-full border rounded px-3 py-2 h-24 resize-none"/>
            </div>
          </div>

          {/* Payment Summary */}
          <h2 className="text-2xl font-bold text-center text-[#392C3A]">Payment Summary</h2>
          <div className="bg-white border border-[#392C3A] rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>{selectedService?.name || "Service Fee"}</span>
                <span>R{servicePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Booking Fee</span>
                <span>R{BOOKING_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT</span>
                <span>R{VAT.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>R{total.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              You’ll be redirected to Payfast to complete your secure payment.
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-[#392C3A] text-white py-2 px-6 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#4A3A4F] hover:scale-[1.02] hover:shadow-md w-full max-w-md"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;