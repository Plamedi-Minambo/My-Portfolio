import { useEffect, useState } from "react";
import axios from "axios";

const ManageFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/feedbacks/all");
        const data = Array.isArray(response.data) ? response.data : [];
        setFeedbackList(data);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
        setFeedbackList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) return <p>Loading feedback...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>All Customer Feedback</h2>
      {feedbackList.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {feedbackList.map((fb) => (
            <div
              key={fb.feedbackID}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img
                src={
                  fb.cleanerImageUrl
                    ? `https://apcleaningstorage12.blob.core.windows.net/cleanerimages/${fb.cleanerImageUrl}`
                    : "image"
                }
                alt={fb.cleanerName || "Cleaner"}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div>
                <p><strong>{fb.cleanerName || "Unnamed Cleaner"}</strong></p>
                <p>Rating: {fb.rating ? `${fb.rating} ⭐` : "No rating"}</p>
                <p>{fb.comments || "No comments provided."}</p>
                <p style={{ fontSize: "0.8rem", color: "#666" }}>
                  {fb.createdDate
                    ? new Date(fb.createdDate).toLocaleString()
                    : "Unknown date"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageFeedback;