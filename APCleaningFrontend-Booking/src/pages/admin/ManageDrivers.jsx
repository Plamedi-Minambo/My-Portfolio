import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageDrivers = () => {
  const [driver, setDriver] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    licenseNumber: '',
    vehicleType: '',
    driverImage: ''
  });

  const [errors, setErrors] = useState({});
  const [getDrivers, setGetDrivers] = useState([]);

  useEffect(() => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/DriverDetails")
      .then((res) => setGetDrivers(res.data))
      .catch((err) => console.error("Failed to fetch drivers:", err));
  }, []);

  const handleDriverChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setDriver(prev => ({ ...prev, driverImage: files[0] }));
    } else {
      setDriver(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateDriver = () => {
    const newErrors = {};

    if (!driver.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!driver.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(driver.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!driver.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10,}$/.test(driver.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be at least 10 digits.";
    }

    if (!driver.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (driver.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!/[A-Z]/.test(driver.password)) {
      newErrors.password = "Password must include an uppercase letter.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(driver.password)) {
      newErrors.password = "Password must include a special character.";
    }

    if (!driver.licenseNumber.trim()) newErrors.licenseNumber = "License number is required.";
    if (!driver.vehicleType) newErrors.vehicleType = "Please select a vehicle type.";
    if (!driver.driverImage) newErrors.driverImage = "Please attach an image.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const AddDriver = (e) => {
    e.preventDefault();
    if (!validateDriver()) return;

    const formData = new FormData();
    formData.append("FullName", driver.fullName);
    formData.append("Email", driver.email);
    formData.append("PhoneNumber", driver.phoneNumber);
    formData.append("Password", driver.password);
    formData.append("LicenseNumber", driver.licenseNumber);
    formData.append("VehicleType", driver.vehicleType);
    formData.append("DriverImage", driver.driverImage);

    axios.post("https://apcleaningbackend20251029193438.azurewebsites.net/api/DriverDetails", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        alert("Driver registered successfully");
        setDriver({
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
          licenseNumber: '',
          vehicleType: '',
          driverImage: ''
        });
        setErrors({});
        axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/DriverDetails")
          .then((res) => setGetDrivers(res.data))
          .catch((err) => console.error("Failed to refresh drivers:", err));
      })
      .catch((err) => {
        console.error("Registration error:", err.response?.data || err.message);
        alert("Error! Could not register driver");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      axios.delete(`https://apcleaningbackend20251029193438.azurewebsites.net/api/DriverDetails/${id}`)
        .then(() => {
          alert("Driver deleted successfully");
          setGetDrivers(prev => prev.filter(d => d.driverDetailsID !== id));
        })
        .catch((err) => {
          console.error("Delete error:", err.response?.data || err.message);
          alert("Error! Could not delete driver");
        });
    }
  };

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto mb-8">
        <h2 className="text-2xl font-bold text-center m-5">Manage Drivers</h2>
        <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-[#392C3A] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">License</th>
              <th className="px-4 py-2 text-left">Vehicle</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Driver Image</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getDrivers.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">No drivers found.</td>
              </tr>
            ) : (
              getDrivers.map((d) => (
                <tr key={d.driverDetailsID} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{d.fullName}</td>
                  <td className="px-4 py-2">{d.email}</td>
                  <td className="px-4 py-2">{d.phoneNumber}</td>
                  <td className="px-4 py-2">{d.licenseNumber}</td>
                  <td className="px-4 py-2">{d.vehicleType}</td>
                  <td className="px-4 py-2">{d.availabilityStatus}</td>
                  <td className="px-4 py-2">
                    {d.driverImageUrl ? (
                      <img
                        src={`https://apcleaningstorage12.blob.core.windows.net/driverimages/${d.driverImageUrl}`}
                        alt={d.fullName}
                        className="h-12 w-12 object-cover rounded-full border"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <Link to={`/edit-driver/${d.driverDetailsID}`}>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(d.driverDetailsID)}
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

      {/* Add Driver Section */}
      <section className="flex justify-center px-4 mb-4">
        <div className="border-2 border-solid w-full max-w-7xl p-4 md:p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Add Driver</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={AddDriver}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={driver.fullName}
                onChange={handleDriverChange}
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
                value={driver.phoneNumber}
                onChange={handleDriverChange}
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
                value={driver.email}
                onChange={handleDriverChange}
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
                value={driver.password}
                onChange={handleDriverChange}
                className={`w-full border rounded px-3 py-2 ${errors.password ? 'border-red-500' : 'border-[#9D949E]'}`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              <p className="text-sm text-gray-500 mt-1">
                Must be at least 6 characters, include an uppercase letter and a special character.
              </p>
            </div>

            {/* License Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={driver.licenseNumber}
                onChange={handleDriverChange}
                className={`w-full border rounded px-3 py-2 ${errors.licenseNumber ? 'border-red-500' : 'border-[#9D949E]'}`}
              />
              {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
              <select
                name="vehicleType"
                value={driver.vehicleType}
                onChange={handleDriverChange}
                className={`w-full border rounded px-3 py-2 ${errors.vehicleType ? 'border-red-500' : 'border-[#9D949E]'}`}
              >
                <option value="">Select</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Van">Van</option>
                <option value="Bakkie">Bakkie</option>
              </select>
              {errors.vehicleType && <p className="text-red-500 text-sm mt-1">{errors.vehicleType}</p>}
            </div>

            {/* Attach Image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Attach Image</label>
              <input
                type="file"
                name="driverImageUrl"
                accept="image/*"
                onChange={handleDriverChange}
                className={`w-full border rounded px-3 py-2 ${errors.driverImage ? 'border-red-500' : 'border-[#9D949E]'}`}
              />
              {errors.driverImage && <p className="text-red-500 text-sm mt-1">{errors.driverImage}</p>}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4 flex justify-center">
              <button
                type="submit"
                className="bg-[#392C3A] text-white py-2 px-6 rounded hover:bg-gray-800 transition max-w-md w-full"
              >
                Add Driver
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ManageDrivers;