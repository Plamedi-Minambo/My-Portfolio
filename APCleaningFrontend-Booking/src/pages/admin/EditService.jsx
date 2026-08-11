import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    axios.get(`https://apcleaningbackend20251029193438.azurewebsites.net/api/ServiceTypes/${id}`)
      .then((res) => setService(res.data))
      .catch((err) => {
        console.error("Failed to fetch service:", err);
        alert("Could not load service details.");
        navigate("/manage-services");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", service.name);
    formData.append("Description", service.description);
    formData.append("Price", parseFloat(service.price));
    if (newImage) {
      formData.append("ServiceImage", newImage);
    }

    axios.put(`https://apcleaningbackend20251029193438.azurewebsites.net/api/ServiceTypes/${id}`, formData)
      .then(() => {
        alert("Service updated successfully");
        navigate("/manage-services");
      })
      .catch((err) => {
        console.error("Update error:", err.response?.data || err.message);
        alert("Error! Could not update service");
      });
  };

  if (!service) return <p className="text-center mt-10 text-gray-500">Loading service details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Service</h2>
      <form className="grid grid-cols-1 gap-4" onSubmit={handleUpdate} encType="multipart/form-data">
        <input
          name="name"
          value={service.name}
          onChange={handleChange}
          placeholder="Service Name"
          className="border p-2 rounded"
        />
        <input
          name="price"
          type="number"
          value={service.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          value={service.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        {service.imageURL && (
          <div>
            <p className="text-sm text-gray-600">Current Image:</p>
            <img
              src={`https://apcleaningstorage12.blob.core.windows.net/serviceimages/${service.imageURL}`}
              alt="Current"
              className="h-16 w-16 object-cover mt-2"
            />
          </div>
        )}
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditService;