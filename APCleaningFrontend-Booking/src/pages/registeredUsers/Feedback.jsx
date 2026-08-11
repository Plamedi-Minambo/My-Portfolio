import { useEffect, useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedbacks, setFeedbacks] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [customerID, setCustomerID] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCleaners();
    fetchCustomerID();
  }, []);

  const fetchCleaners = () => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/Feedbacks/completed-cleaners", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setCleaners(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch cleaners:", err);
        setError("Unable to load cleaner list.");
        setLoading(false);
      });
  };

  const fetchCustomerID = () => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/UserDashboard/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setCustomerID(res.data.customerID);
      })
      .catch(err => {
        console.error("Failed to fetch customer ID:", err);
      });
  };

  const handleFeedbackChange = (cleanerID, field, value) => {
    setFeedbacks(prev => ({
      ...prev,
      [cleanerID]: {
        ...prev[cleanerID],
        [field]: value
      }
    }));
  };

  const submitFeedback = async (cleanerID) => {
    const { rating, comments } = feedbacks[cleanerID] || {};
    if (!rating || rating < 1 || rating > 5) {
      alert("Please provide a rating between 1 and 5.");
      return;
    }

    try {
      await axios.post("https://apcleaningbackend20251029193438.azurewebsites.net/api/Feedbacks/submit", {
        cleanerID,
        rating,
        comments,
        customerID
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSubmitted(prev => ({ ...prev, [cleanerID]: true }));
      alert("Feedback submitted!");
    } catch (err) {
  console.error("Failed to submit feedback:", err.response);
  alert("Failed to submit feedback.");
  console.log("Submitting feedback:", { cleanerID, rating, comments });
}

  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Review Your Cleaners</h2>

      {loading ? (
        <p>Loading cleaners...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : cleaners.length === 0 ? (
        <p>No cleaners available for review.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cleaners.map(c => (
            <div key={c.cleanerDetailsID} className="border rounded p-4 shadow-sm bg-white">
              <div className="flex items-center space-x-4 mb-3">
                <img
                  src={`https://apcleaningstorage12.blob.core.windows.net/cleanerimages/${c.cleanerImageUrl}` || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1887"}
                  alt={c.fullName}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-lg">{c.fullName}</p>
                  <p className="text-sm text-gray-600">Cleaner ID: {c.cleanerDetailsID}</p>
                </div>
              </div>

              {submitted[c.cleanerDetailsID] ? (
                <p className="text-green-600 font-medium">Feedback submitted ✅</p>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block font-medium">Rating (1–5):</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={feedbacks[c.cleanerDetailsID]?.rating || ""}
                      onChange={(e) =>
                        handleFeedbackChange(c.cleanerDetailsID, "rating", parseInt(e.target.value))
                      }
                      className="border rounded px-2 py-1 w-20"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Comments (optional):</label>
                    <textarea
                      value={feedbacks[c.cleanerDetailsID]?.comments || ""}
                      onChange={(e) =>
                        handleFeedbackChange(c.cleanerDetailsID, "comments", e.target.value)
                      }
                      className="w-full border rounded px-2 py-1"
                      rows={3}
                      placeholder="Share your experience..."
                    />
                  </div>

                  <button
                    onClick={() => submitFeedback(c.cleanerDetailsID)}
                    className="bg-[#392C3A] text-white px-4 py-2 rounded hover:bg-[#2e232f]"
                  >
                    Submit Feedback
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedback;