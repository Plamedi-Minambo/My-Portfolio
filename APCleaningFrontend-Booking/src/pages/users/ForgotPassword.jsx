import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("https://apcleaningbackend20251029193438.azurewebsites.net/api/Auth/forgot-password", { email });
      alert("Reset link sent! Check your inbox.");
      setEmail("");
      setSubmitted(false);
    } catch (err) {
      console.error("Reset failed:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
            alt="Password Reset Illustration"
            className="w-32 h-32 mx-auto mb-6"
          />
          <h1 className="text-xl font-semibold mb-2">Trouble Logging In?</h1>
          <p className="text-gray-600 mb-6">
            We’ll send you a link to reset your password. It only takes a minute.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                  submitted && !email ? "border-red-500" : "border-gray-300"
                } focus:ring-gray-500`}
              />
              {submitted && !email && (
                <p className="text-red-500 text-sm mt-1">Email is required.</p>
              )}
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 bg-gray-800 text-white rounded-lg transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Already remembered it?{" "}
            <Link to="/login" className="text-gray-900 font-medium hover:underline">
              Back to Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;