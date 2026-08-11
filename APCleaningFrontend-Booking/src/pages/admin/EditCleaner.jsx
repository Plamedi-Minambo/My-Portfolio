import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditCleaner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cleaner, setCleaner] = useState(null);
  const [getServices, setGetServices] = useState([]);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/ServiceTypes")
      .then((res) => setGetServices(res.data))
      .catch((err) => console.error("Failed to fetch services:", err));
  }, []);

  useEffect(() => {
    axios.get(`https://apcleaningbackend20251029193438.azurewebsites.net/api/CleanerDetails/${id}`)
      .then((res) => setCleaner(res.data))
      .catch((err) => {
        console.error("Failed to fetch cleaner:", err);
        alert("Could not load cleaner details.");
        navigate("/manage-cleaners");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCleaner(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("FullName", cleaner.fullName);
    formData.append("Email", cleaner.email);
    formData.append("PhoneNumber", cleaner.phoneNumber);
    formData.append("ServiceTypeID", cleaner.serviceTypeID);
    formData.append("AvailabilityStatus", cleaner.availabilityStatus);
    if (cleaner.password?.trim()) {
      formData.append("Password", cleaner.password.trim());
    }
    if (newImage) {
      formData.append("CleanerImage", newImage);
    }

    axios.put(`https://apcleaningbackend20251029193438.azurewebsites.net/api/CleanerDetails/${id}`, formData)
      .then(() => {
        alert("Cleaner updated successfully");
        navigate("/manage-cleaners");
      })
      .catch((err) => {
        console.error("Update error:", err.response?.data || err.message);
        alert("Error! Could not update cleaner");
      });
  };

  const handlePasswordReset = () => {
    const trimmedPassword = cleaner.password?.trim();
    if (!trimmedPassword) {
      alert("Please enter a new password before resetting.");
      return;
    }

    axios.put(
      `https://apcleaningbackend20251029193438.azurewebsites.net/api/CleanerDetails/reset-password/${id}`,
      JSON.stringify(trimmedPassword),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(() => {
        alert("Password reset successfully");
        setCleaner(prev => ({ ...prev, password: '' }));
      })
      .catch((err) => {
        console.error("Password reset error:", err.response?.data || err.message);
        alert("Error! Could not reset password");
      });
  };

  if (!cleaner) return <p className="text-center mt-10 text-gray-500">Loading cleaner details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Cleaner</h2>
      <form className="grid grid-cols-1 gap-4" onSubmit={handleUpdate} encType="multipart/form-data">
        <input name="fullName" value={cleaner.fullName} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" />
        <input name="email" value={cleaner.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
        <input type="password" name="password" value={cleaner.password || ''} onChange={handleChange} placeholder="New Password (optional)" className="border p-2 rounded" />
        <select name="serviceTypeID" value={cleaner.serviceTypeID} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select a service</option>
          {getServices.map((s) => (
            <option key={s.serviceTypeID} value={s.serviceTypeID}>{s.name}</option>
          ))}
        </select>
        <select name="availabilityStatus" value={cleaner.availabilityStatus} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Availability Status</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        {/* Image Upload */}
        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
        {cleaner.cleanerImageUrl && (
          <div>
            <p className="text-sm text-gray-600">Current Image:</p>
            <img
              src={`https://apcleaningstorage12.blob.core.windows.net/cleanerimages/${cleaner.cleanerImageUrl}`}
              alt="Current"
              className="h-16 w-16 object-cover mt-2"
            />
          </div>
        )}

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Update Cleaner
        </button>
      </form>

      {cleaner.password?.trim() && (
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

export default EditCleaner;