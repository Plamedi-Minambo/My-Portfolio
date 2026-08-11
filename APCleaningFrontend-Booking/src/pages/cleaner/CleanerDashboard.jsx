import { useEffect, useState } from "react";
import axios from "axios";
import NotificationsPanel from "../../components/CleanerNotificationsPanel";

const CleanerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
    fetchAvailability();
  }, []);

  const fetchBookings = () => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/CleanerDashboard/bookings", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch bookings:", err);
        setError("Unauthorized or session expired.");
        setLoading(false);
      });
  };

  const fetchAvailability = () => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/CleanerDashboard/availability", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const status = res.data.status;
        setAvailability(status === "Available");
      })
      .catch(err => console.error("Failed to fetch availability:", err));
  };

  const toggleAvailability = () => {
    axios.put("https://apcleaningbackend20251029193438.azurewebsites.net/api/CleanerDashboard/availability", availability, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setAvailability(!availability))
      .catch(err => console.error("Failed to update availability:", err));
  };

  const updateBookingStatus = (id, newStatus) => {
    axios.put(
      `https://apcleaningbackend20251029193438.azurewebsites.net/api/CleanerDashboard/bookings/${id}/status`,
      JSON.stringify(newStatus),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
      .then(() => {
        fetchBookings();
        fetchAvailability();
      })
      .catch(err => console.error("Failed to update booking status:", err));
  };

  const filteredBookings = bookings.filter(b => {
    if (filter === "All") return true;
    if (filter === "Pending") return ["Pending", "EnRoute", "Arrived"].includes(b.bookingStatus);
    return b.bookingStatus === filter;
  });

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Cleaner Dashboard</h2>

      <div className="flex justify-end">
        <NotificationsPanel token={token} />
      </div>

      <div className="flex justify-between items-center">
        <span className="font-semibold">Availability:</span>
        {availability === null ? (
          <span className="text-gray-500">Loading status...</span>
        ) : (
          <button
            onClick={toggleAvailability}
            className={`px-4 py-2 rounded ${availability ? "bg-green-600" : "bg-red-600"} text-white`}
          >
            {availability ? "Available" : "Unavailable"}
          </button>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Assigned Bookings</h3>

        {/* Tab Buttons */}
        <div className="flex space-x-4 mb-4">
          {["All", "Pending", "Completed"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded font-medium ${
                filter === status ? "bg-[#392C3A] text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : filteredBookings.length === 0 ? (
          <p>No bookings found for this status.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBookings.map(b => (
              <div key={b.bookingID} className="border rounded-lg shadow-sm p-4 bg-white space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg">{new Date(b.serviceDate).toLocaleDateString()}</h4>
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${
                    b.bookingStatus === "Pending" ? "bg-yellow-500" :
                    b.bookingStatus === "EnRoute" ? "bg-blue-500" :
                    b.bookingStatus === "Arrived" ? "bg-green-500" :
                    b.bookingStatus === "Completed" ? "bg-green-800" : "bg-gray-300"
                  }`}>
                    {b.bookingStatus}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  <strong>Time:</strong> {new Date(b.serviceStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(b.serviceEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm text-gray-600"><strong>Service:</strong> {b.serviceName}</p>
                <p className="text-sm text-gray-600"><strong>Location:</strong> {b.address}, {b.city}, {b.province}</p>
                <p className="text-sm text-gray-600"><strong>Driver:</strong> {b.driverName}</p>

                {["Pending", "EnRoute", "Arrived"].includes(b.bookingStatus) && (
                  <button
                    onClick={() => updateBookingStatus(b.bookingID, "Completed")}
                    className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full"
                  >
                    Accept & Complete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CleanerDashboard;