import { useEffect, useState } from "react";
import axios from "axios";

const CleanerFeedbackViewer = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = () => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/Feedbacks/cleaner", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setFeedbackList(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch feedback:", err);
        setError("Unable to load feedback.");
        setLoading(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Your Feedback</h2>

      {loading ? (
        <p>Loading feedback...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : feedbackList.length === 0 ? (
        <p className="text-gray-600 text-center">No feedback received yet. Keep up the good work!</p>
      ) : (
        <div className="space-y-4">
          {feedbackList.map((f, index) => (
            <div key={index} className="border rounded p-4 shadow-sm bg-white">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-lg">Rating: ⭐ {f.rating}/5</p>
                <p className="text-sm text-gray-500">{new Date(f.createdDate).toLocaleDateString()}</p>
              </div>
              <p className="text-gray-800">{f.comments || "No comments provided."}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CleanerFeedbackViewer;