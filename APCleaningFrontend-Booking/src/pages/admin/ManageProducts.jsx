import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageProducts = () => {
  const [product, setProduct] = useState({
    ProductName: '',
    Description: '',
    Price: '',
    StockQuantity: '',
    Category: '',
    IsAvailable: true,
    ProductImage: null
  });

  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/Products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setProduct(prev => ({ ...prev, ProductImage: files[0] }));
    } else if (type === "checkbox") {
      setProduct(prev => ({ ...prev, [name]: checked }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateProduct = () => {
    const newErrors = {};

    if (!product.ProductName.trim()) newErrors.ProductName = "Product name is required.";
    if (!product.Description.trim()) newErrors.Description = "Description is required.";
    if (!product.Category.trim()) newErrors.Category = "Category is required.";

    if (!product.Price.trim()) {
      newErrors.Price = "Price is required.";
    } else if (isNaN(product.Price) || parseFloat(product.Price) <= 0) {
      newErrors.Price = "Price must be a number greater than 0.";
    }

    if (!product.StockQuantity.trim()) {
      newErrors.StockQuantity = "Stock quantity is required.";
    } else if (!Number.isInteger(Number(product.StockQuantity)) || Number(product.StockQuantity) < 0) {
      newErrors.StockQuantity = "Stock quantity must be a non-negative integer.";
    }

    if (!product.ProductImage) newErrors.ProductImage = "Please attach a product image.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const AddProduct = (e) => {
    e.preventDefault();
    if (!validateProduct()) return;

    const formData = new FormData();
    formData.append("ProductName", product.ProductName);
    formData.append("Description", product.Description);
    formData.append("Price", parseFloat(product.Price));
    formData.append("StockQuantity", parseInt(product.StockQuantity));
    formData.append("Category", product.Category);
    formData.append("IsAvailable", product.IsAvailable);
    formData.append("ProductImage", product.ProductImage);

    axios.post("https://apcleaningbackend20251029193438.azurewebsites.net/api/Products", formData)
      .then(() => {
        alert("Product added successfully");
        setProduct({
          ProductName: '',
          Description: '',
          Price: '',
          StockQuantity: '',
          Category: '',
          IsAvailable: true,
          ProductImage: null
        });
        setErrors({});
        axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/Products")
          .then((res) => setProducts(res.data));
      })
      .catch((err) => {
        console.error("Submission error:", err.response?.data || err.message);
        alert("Error! Could not add product");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`https://apcleaningbackend20251029193438.azurewebsites.net/api/Products/${id}`)
        .then(() => {
          alert("Product deleted successfully");
          setProducts(prev => prev.filter(p => p.productID !== id));
        })
        .catch((err) => {
          console.error("Delete error:", err.response?.data || err.message);
          alert("Error! Could not delete product");
        });
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div className="overflow-x-auto mb-8">
          <h2 className="text-2xl font-bold text-center m-5">Manage Products</h2>
          <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-[#392C3A] text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Available</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center text-gray-500">No products found.</td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.productID} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2">{p.productName}</td>
                    <td className="px-4 py-2">{p.description}</td>
                    <td className="px-4 py-2">R{p.price}</td>
                    <td className="px-4 py-2">{p.stockQuantity}</td>
                    <td className="px-4 py-2">{p.category}</td>
                    <td className="px-4 py-2">{p.isAvailable ? "Yes" : "No"}</td>
                    <td className="px-4 py-2">
                      {p.productImageUrl && (
                        <img src={`https://apcleaningstorage12.blob.core.windows.net/productimages/${p.productImageUrl}`} alt={p.productName} className="h-12 w-12 object-cover" />
                      )}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <Link to={`/edit-product/${p.productID}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(p.productID)}
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

        {/* Add Product Section */}
        <section className="flex justify-center px-4">
          <div className="border-2 border-solid w-full max-w-7xl p-4 md:p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={AddProduct}>
              <div>
                <input
                  type="text"
                  name="ProductName"
                  placeholder="Product Name"
                  value={product.ProductName}
                  onChange={handleChange}
                  className={`border px-3 py-2 rounded w-full ${errors.ProductName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.ProductName && <p className="text-red-500 text-sm mt-1">{errors.ProductName}</p>}
              </div>

              <div>
                <input
                  type="text"
                  name="Category"
                  placeholder="Category"
                  value={product.Category}
                  onChange={handleChange}
                  className={`border px-3 py-2 rounded w-full ${errors.Category ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.Category && <p className="text-red-500 text-sm mt-1">{errors.Category}</p>}
              </div>

              <div>
                <input
                  type="number"
                  name="Price"
                  placeholder="Price"
                  value={product.Price}
                  onChange={handleChange}
                  className={`border px-3 py-2 rounded w-full ${errors.Price ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.Price && <p className="text-red-500 text-sm mt-1">{errors.Price}</p>}
              </div>

              <div>
                <input
                  type="number"
                  name="StockQuantity"
                  placeholder="Stock Quantity"
                  value={product.StockQuantity}
                                    onChange={handleChange}
                  className={`border px-3 py-2 rounded w-full ${errors.StockQuantity ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.StockQuantity && <p className="text-red-500 text-sm mt-1">{errors.StockQuantity}</p>}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <textarea
                  name="Description"
                  placeholder="Description"
                  value={product.Description}
                  onChange={handleChange}
                  rows="4"
                  className={`border px-3 py-2 rounded w-full ${errors.Description ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.Description && <p className="text-red-500 text-sm mt-1">{errors.Description}</p>}
              </div>

              {/* Availability */}
              <div className="md:col-span-2 flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Available</label>
                <input
                  type="checkbox"
                  name="IsAvailable"
                  checked={product.IsAvailable}
                  onChange={handleChange}
                />
              </div>

              {/* Product Image */}
              <div className="md:col-span-2">
                <input
                  type="file"
                  name="ProductImage"
                  accept="image/*"
                  onChange={handleChange}
                  className={`border px-3 py-2 rounded w-full ${errors.ProductImage ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.ProductImage && <p className="text-red-500 text-sm mt-1">{errors.ProductImage}</p>}
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 mt-4 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#392C3A] text-white py-2 px-6 rounded hover:bg-gray-800 transition max-w-md w-full"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ManageProducts;