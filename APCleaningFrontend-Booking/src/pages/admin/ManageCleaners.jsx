import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageCleaners = () => {
  const [cleaner, setCleaner] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    serviceTypeID: '',
    cleanerImage: ''
  });

  const [errors, setErrors] = useState({});
  const [getCleaners, setGetCleaners] = useState([]);
  const [getServices, setGetServices] = useState([]);

  useEffect(() => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/ServiceTypes")
      .then((res) => setGetServices(res.data))
      .catch((err) => console.error("Failed to fetch services:", err));
  }, []);

  useEffect(() => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/CleanerDetails")
      .then((res) => setGetCleaners(res.data))
      .catch((err) => console.error("Failed to fetch cleaners:", err));
  }, []);

  const handleCleanerChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setCleaner(prev => ({ ...prev, cleanerImage: files[0] }));
    } else {
      setCleaner(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateCleaner = () => {
    const newErrors = {};

    if (!cleaner.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!cleaner.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaner.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!cleaner.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10,}$/.test(cleaner.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be at least 10 digits.";
    }

    if (!cleaner.password.trim()) {
      newErrors.password = "Password is required.";
    } 
    else if (cleaner.password.length < 6) 
      {
        newErrors.password = "Password must be at least 6 characters.";
      } else if (!/[A-Z]/.test(cleaner.password)) 
        {
          newErrors.password = "Password must include at least one uppercase letter.";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(cleaner.password)) 
          {
            newErrors.password = "Password must include at least one special character.";
          }

    if (!cleaner.serviceTypeID) newErrors.serviceTypeID = "Please select a specialty.";
    if (!cleaner.cleanerImage) newErrors.cleanerImage = "Please attach an image.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const AddCleaner = (e) => {
    e.preventDefault();
    if (!validateCleaner()) return;

    const formData = new FormData();
    formData.append("FullName", cleaner.fullName);
    formData.append("Email", cleaner.email);
    formData.append("PhoneNumber", cleaner.phoneNumber);
    formData.append("Password", cleaner.password);
    formData.append("ServiceTypeID", cleaner.serviceTypeID);
    formData.append("CleanerImage", cleaner.cleanerImage);

    axios.post("https://apcleaningbackend20251029193438.azurewebsites.net/api/CleanerDetails", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        alert("Cleaner registered successfully");
        setCleaner({
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
          serviceTypeID: '',
          cleanerImage: ''
        });
        setErrors({});
        axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/CleanerDetails")
          .then((res) => setGetCleaners(res.data))
          .catch((err) => console.error("Failed to refresh cleaners:", err));
      })
      .catch((err) => {
        console.error("Registration error:", err.response?.data || err.message);
        alert("Error! Could not register cleaner");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this cleaner?")) {
      axios.delete(`https://apcleaningbackend20251029193438.azurewebsites.net/api/CleanerDetails/${id}`)
        .then(() => {
          alert("Cleaner deleted successfully");
          setGetCleaners(prev => prev.filter(c => c.cleanerDetailsID !== id));
        })
        .catch((err) => {
          console.error("Delete error:", err.response?.data || err.message);
          alert("Error! Could not delete cleaner");
        });
    }
  };

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto mb-8">
        <h2 className="text-2xl font-bold text-center m-5">Manage Cleaners</h2>
        <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-[#392C3A] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Specialty</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Cleaner Image</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getCleaners.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-gray-500">No cleaners found.</td>
              </tr>
            ) : (
              getCleaners.map((c) => (
                <tr key={c.cleanerDetailsID} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{c.fullName}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.phoneNumber}</td>
                  <td className="px-4 py-2">{c.serviceName}</td>
                  <td className="px-4 py-2">{c.availabilityStatus}</td>
                  <td className="px-4 py-2">
                    {c.cleanerImageUrl ? (
                      <img
                        src={`https://apcleaningstorage12.blob.core.windows.net/cleanerimages/${c.cleanerImageUrl}`}
                        alt={c.fullName}
                        className="h-12 w-12 object-cover rounded-full border"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <Link to={`/edit-cleaner/${c.cleanerDetailsID}`}>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(c.cleanerDetailsID)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Cleaner Section */}
      <section className="flex justify-center px-4">
        <div className="border-2 border-solid w-full max-w-7xl p-4 md:p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Add Cleaner</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={AddCleaner}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={cleaner.fullName}
                onChange={handleCleanerChange}
                className={`w-full border rounded px-3 py-2 ${errors.fullName ? 'border-red-500' : 'border-[#9D949E]'}`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={cleaner.phoneNumber}
                onChange={handleCleanerChange}
                className={`w-full border rounded px-3 py-2 ${errors.phoneNumber ? 'border-red-500' : 'border-[#9D949E]'}`}
              />
                            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={cleaner.email}
                onChange={handleCleanerChange}
                className={`w-full border rounded px-3 py-2 ${errors.email ? 'border-red-500' : 'border-[#9D949E]'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={cleaner.password}
                onChange={handleCleanerChange}
                className={`w-full border rounded px-3 py-2 ${errors.password ? 'border-red-500' : 'border-[#9D949E]'}`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              <p className="text-sm text-gray-500 mt-1">
                Must be at least 6 characters, include an uppercase letter and a special character.
              </p>
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Cleaner Specialty</label>
              <select
                name="serviceTypeID"
                value={cleaner.serviceTypeID}
                onChange={handleCleanerChange}
                className={`w-full border rounded px-3 py-2 ${errors.serviceTypeID ? 'border-red-500' : 'border-[#9D949E]'}`}
              >
                <option value="">Select a service</option>
                {getServices.map((s) => (
                  <option key={s.serviceTypeID} value={s.serviceTypeID}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.serviceTypeID && <p className="text-red-500 text-sm mt-1">{errors.serviceTypeID}</p>}
            </div>

            {/* Attach image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Attach Image</label>
              <input
                type="file"
                name="cleanerImageUrl"
                accept="image/*"
                className={`w-full border rounded px-3 py-2 ${errors.cleanerImage ? 'border-red-500' : 'border-[#9D949E]'}`}
                onChange={handleCleanerChange}
              />
              {errors.cleanerImage && <p className="text-red-500 text-sm mt-1">{errors.cleanerImage}</p>}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4 flex justify-center">
              <button
                type="submit"
                className="bg-[#392C3A] text-white py-2 px-6 rounded hover:bg-gray-800 transition max-w-md w-full"
              >
                Add Cleaner
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ManageCleaners;