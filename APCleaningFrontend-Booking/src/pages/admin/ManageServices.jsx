import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageServices = () => {
  const [service, setService] = useState({
    Name: '',
    Description: '',
    Price: '',
    ImageURL: ''
  });

  const [errors, setErrors] = useState({});
  const [getServices, setGetServices] = useState([]);

  useEffect(() => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/ServiceTypes")
      .then((res) => setGetServices(res.data))
      .catch((err) => console.error("Failed to fetch services:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setService(prev => ({ ...prev, ImageURL: files[0] }));
    } else {
      setService(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateService = () => {
    const newErrors = {};

    if (!service.Name.trim()) newErrors.Name = "Service name is required.";
    if (!service.Description.trim()) newErrors.Description = "Description is required.";

    if (!service.Price.trim()) {
      newErrors.Price = "Price is required.";
    } else if (isNaN(service.Price) || parseFloat(service.Price) <= 0) {
      newErrors.Price = "Price must be a valid number greater than 0.";
    }

    if (!service.ImageURL) newErrors.ImageURL = "Please attach an image.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const AddService = (e) => {
    e.preventDefault();
    if (!validateService()) return;

    const formData = new FormData();
    formData.append("Name", service.Name);
    formData.append("Description", service.Description);
    formData.append("Price", parseFloat(service.Price));
    formData.append("ServiceImage", service.ImageURL);

    axios.post("https://apcleaningbackend20251029193438.azurewebsites.net/api/ServiceTypes", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        alert("Service has been added successfully");
        setService({ Name: '', Description: '', Price: '', ImageURL: '' });
        setErrors({});
        axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/ServiceTypes")
          .then((res) => setGetServices(res.data))
          .catch((err) => console.error("Failed to refresh services:", err));
      })
      .catch((err) => {
        console.error("Submission error: ", err.response?.data || err.message);
        alert("Error! Could not add service into the system");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      axios.delete(`https://apcleaningbackend20251029193438.azurewebsites.net/api/ServiceTypes/${id}`)
        .then(() => {
          alert("Service deleted successfully");
          setGetServices(prev => prev.filter(s => s.serviceTypeID !== id));
        })
        .catch((err) => {
          console.error("Delete error:", err.response?.data || err.message);
          alert("Error! Could not delete service");
        });
    }
  };

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto mb-8">
        <h2 className="text-2xl font-bold text-center m-5">Manage Services</h2>
        <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-[#392C3A] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getServices.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">No services found.</td>
              </tr>
            ) : (
              getServices.map((s) => (
                <tr key={s.serviceTypeID} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.description}</td>
                  <td className="px-4 py-2">R{s.price}</td>
                  <td className="px-4 py-2">
                    {s.imageURL && (
                      <img
                        src={`https://apcleaningstorage12.blob.core.windows.net/serviceimages/${s.imageURL}`}
                        alt={s.name}
                        className="h-12 w-12 object-cover"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <Link to={`/edit-service/${s.serviceTypeID}`}>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(s.serviceTypeID)}
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

      {/* Add Service Section */}
      <section className="flex justify-center px-4">
        <div className="border-2 border-solid w-full max-w-7xl p-4 md:p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Add Service Type</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={AddService}>
            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
              <input
                type="text"
                name="Name"
                value={service.Name}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.Name ? 'border-red-500' : 'border-[#9D949E]'}`}
              />
              {errors.Name && <p className="text-red-500 text-sm mt-1">{errors.Name}</p>}
            </div>

            {/* Service Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price of Service</label>
              <input
                type="text"
                name="Price"
                value={service.Price}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.Price ? 'border-red-500' : 'border-[#9D949E]'}`}
              />
              {errors.Price && <p className="text-red-500 text-sm mt-1">{errors.Price}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="Description"
                rows="6"
                value={service.Description}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.Description ? 'border-red-500' : 'border-[#9D949E]'}`}
              />
              {errors.Description && <p className="text-red-500 text-sm mt-1">{errors.Description}</p>}
            </div>

            {/* Attach Image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Attach Image</label>
              <input
                type="file"
                name="ImageURL"
                accept="image/*"
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.ImageURL ? 'border-red-500' : 'border-[#9D949E]'}`}
              />
              {errors.ImageURL && <p className="text-red-500 text-sm mt-1">{errors.ImageURL}</p>}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4 flex justify-center">
              <button
                type="submit"
                className="bg-[#392C3A] text-white py-2 px-6 rounded hover:bg-gray-800 transition max-w-md w-full"
              >
                Add Service
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ManageServices;
         