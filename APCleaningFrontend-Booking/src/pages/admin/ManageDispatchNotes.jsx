import { useEffect, useState } from "react";
import axios from "axios";

const ManageDispatchNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/dispatchnotes/all");
        const data = Array.isArray(response.data) ? response.data : [];
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch dispatch notes:", error);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <p>Loading dispatch notes...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>All Dispatch Notes</h2>
      {notes.length === 0 ? (
        <p>No dispatch notes available.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {notes.map((note) => (
            <div
              key={note.id}
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
                  note.driverImageUrl
                    ? `https://apcleaningstorage12.blob.core.windows.net/driverimages/${note.driverImageUrl}`
                    : "image"
                }
                alt={note.driverName || "Driver"}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div>
                <p><strong>{note.driverName || "Unnamed Driver"}</strong></p>
                <p>Booking ID: {note.bookingID}</p>
                <p>{note.note || "No note provided."}</p>
                <p style={{ fontSize: "0.8rem", color: "#666" }}>
                  {note.timestamp
                    ? new Date(note.timestamp).toLocaleString()
                    : "Unknown time"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageDispatchNotes;