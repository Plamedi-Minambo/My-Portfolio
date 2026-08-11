import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditDriver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    axios.get(`https://apcleaningbackend20251029193438.azurewebsites.net/api/DriverDetails/${id}`)
      .then((res) => setDriver(res.data))
      .catch((err) => {
        console.error("Failed to fetch driver:", err);
        alert("Could not load driver details.");
        navigate("/manage-drivers");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("FullName", driver.fullName);
    formData.append("Email", driver.email);
    formData.append("PhoneNumber", driver.phoneNumber);
    formData.append("LicenseNumber", driver.licenseNumber);
    formData.append("VehicleType", driver.vehicleType);
    formData.append("AvailabilityStatus", driver.availabilityStatus);
    if (driver.password?.trim()) {
      formData.append("Password", driver.password.trim());
    }
    if (newImage) {
      formData.append("DriverImage", newImage);
    }

    axios.put(`https://apcleaningbackend20251029193438.azurewebsites.net/api/DriverDetails/${id}`, formData)
      .then(() => {
        alert("Driver updated successfully");
        navigate("/manage-drivers");
      })
      .catch((err) => {
        console.error("Update error:", err.response?.data || err.message);
        alert("Error! Could not update driver");
      });
  };

  const handlePasswordReset = () => {
    const trimmedPassword = driver.password?.trim();
    if (!trimmedPassword) {
      alert("Please enter a new password before resetting.");
      return;
    }

    axios.put(
      `https://apcleaningbackend20251029193438.azurewebsites.net/api/DriverDetails/reset-password/${id}`,
      JSON.stringify(trimmedPassword),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(() => {
        alert("Password reset successfully");
        setDriver(prev => ({ ...prev, password: '' }));
      })
      .catch((err) => {
        console.error("Password reset error:", err.response?.data || err.message);
        alert("Error! Could not reset password");
      });
  };

  if (!driver) return <p className="text-center mt-10 text-gray-500">Loading driver details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Driver</h2>
      <form className="grid grid-cols-1 gap-4" onSubmit={handleUpdate} encType="multipart/form-data">
        <input name="fullName" value={driver.fullName} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" />
        <input name="email" value={driver.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
        <input type="password" name="password" value={driver.password || ''} onChange={handleChange} placeholder="New Password (optional)" className="border p-2 rounded" />
        <input name="phoneNumber" value={driver.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="border p-2 rounded" />
        <input name="licenseNumber" value={driver.licenseNumber} onChange={handleChange} placeholder="License Number" className="border p-2 rounded" />
        <select name="vehicleType" value={driver.vehicleType} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Vehicle</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Van">Van</option>
          <option value="Bakkie">Bakkie</option>
        </select>
        <select name="availabilityStatus" value={driver.availabilityStatus} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Availability Status</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
        {driver.driverImageUrl && (
          <div>
            <p className="text-sm text-gray-600">Current Image:</p>
            <img
              src={`https://apcleaningstorage12.blob.core.windows.net/driverimages/${driver.driverImageUrl}`}
              alt="Current"
              className="h-16 w-16 object-cover mt-2"
            />
          </div>
        )}

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>

      {driver.password?.trim() && (
        <button
          type="button"
          onClick={handlePasswordReset}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Reset Password
        </button>
      )}
    </div>
  );
};

export default EditDriver;