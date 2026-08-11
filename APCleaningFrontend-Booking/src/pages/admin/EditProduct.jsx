import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    axios.get(`https://apcleaningbackend20251029193438.azurewebsites.net/api/Products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error("Failed to fetch product:", err);
        alert("Could not load product details.");
        navigate("/manage-products");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ProductName", product.productName);
    formData.append("Description", product.description);
    formData.append("Price", parseFloat(product.price));
    formData.append("StockQuantity", parseInt(product.stockQuantity));
    formData.append("Category", product.category);
    formData.append("IsAvailable", product.isAvailable);
    if (newImage) {
      formData.append("ProductImage", newImage);
    }

    axios.put(`https://apcleaningbackend20251029193438.azurewebsites.net/api/Products/${id}`, formData)
      .then(() => {
        alert("Product updated successfully");
        navigate("/manage-products");
      })
      .catch((err) => {
        console.error("Update error:", err.response?.data || err.message);
        alert("Error! Could not update product");
      });
  };

  if (!product) return <p className="text-center mt-10 text-gray-500">Loading product details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>
      <form className="grid grid-cols-1 gap-4" onSubmit={handleUpdate} encType="multipart/form-data">
        <input
          name="productName"
          value={product.productName}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 rounded"
        />
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
        />
        <input
          name="stockQuantity"
          type="number"
          value={product.stockQuantity}
          onChange={handleChange}
          placeholder="Stock Quantity"
          className="border p-2 rounded"
        />
        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          className="border p-2 rounded"
        />
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Available</label>
          <input
            type="checkbox"
            name="isAvailable"
            checked={product.isAvailable}
            onChange={handleChange}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        {product.productImageUrl && (
          <div>
            <p className="text-sm text-gray-600">Current Image:</p>
            <img
              src={`https://apcleaningstorage12.blob.core.windows.net/productimages/${product.productImageUrl}`}
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

export default EditProduct;