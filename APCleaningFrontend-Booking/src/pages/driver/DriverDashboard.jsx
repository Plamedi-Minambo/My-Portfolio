import { useEffect, useState } from "react";
import axios from "axios";
import DriverNotificationsPanel from "../../components/DriverNotificationsPanel";

const DriverDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeBooking, setActiveBooking] = useState(null);
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("All");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
    fetchAvailability();
  }, []);

  const fetchBookings = () => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/DriverDashboard/bookings", {
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
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/DriverDashboard/availability", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const status = res.data.status;
        setAvailability(status);
      })
      .catch(err => console.error("Failed to fetch availability:", err));
  };

  const submitNote = async (bookingID) => {
    const booking = bookings.find(b => b.bookingID === bookingID);
    const driverID = booking?.assignedDriverID;

    if (!driverID) {
      alert("No driver assigned to this booking.");
      return;
    }

    try {
      await axios.post("https://apcleaningbackend20251029193438.azurewebsites.net/api/DriverDashboard/DispatchNote", {
        bookingID,
        driverID,
        note
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Note submitted!");
      setNote("");
      setActiveBooking(null);
    } catch (err) {
      console.error("Failed to submit note:", err);
      alert("Failed to submit note.");
    }
  };

  const updateDriverStatus = async (bookingID, newStatus) => {
    try {
      await axios.put(`https://apcleaningbackend20251029193438.azurewebsites.net/api/DriverDashboard/bookings/${bookingID}/driver-status`, newStatus, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      alert(`Booking marked as ${newStatus}`);
      fetchBookings();
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Status update failed.");
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (filter === "All") return true;
    if (filter === "Pending") return ["Pending", "EnRoute", "Arrived"].includes(b.bookingStatus);
    return b.bookingStatus === filter;
  });

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Driver Dashboard</h2>

      <div className="flex justify-end">
        <DriverNotificationsPanel token={token} />
      </div>

      <div className="flex justify-between items-center">
        <span className="font-semibold">Current Status:</span>
        {availability === null ? (
          <span className="text-gray-500">Loading...</span>
        ) : (
          <span className={`px-4 py-2 rounded text-white ${availability === "Available" ? "bg-green-600" : "bg-red-600"}`}>
            {availability}
          </span>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Assigned Bookings</h3>

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
                <p className="text-sm text-gray-600"><strong>Location:</strong> {b.address}, {b.city}, {b.province}</p>
                <p className="text-sm text-gray-600"><strong>Cleaner:</strong> {b.cleanerName}</p>

                {["Pending", "EnRoute"].includes(b.bookingStatus) && (
                  <div className="flex space-x-2">
                    {b.bookingStatus === "Pending" && (
                      <button
                        onClick={() => updateDriverStatus(b.bookingID, "EnRoute")}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Mark EnRoute
                      </button>
                    )}
                    {b.bookingStatus === "EnRoute" && (
                      <button
                        onClick={() => updateDriverStatus(b.bookingID, "Arrived")}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Mark Arrived
                      </button>
                    )}
                  </div>
                )}

                {["Pending", "EnRoute", "Arrived"].includes(b.bookingStatus) && (
                  <div className="mt-2 space-y-2">
                    <button
                      onClick={() => setActiveBooking(b.bookingID)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Log Issue
                    </button>
                    {activeBooking === b.bookingID && (
                      <>
                        <textarea
                          placeholder="Describe issue..."
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          className="w-full border rounded px-2 py-1"
                        />
                        <button
                          onClick={() => submitNote(b.bookingID)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full"
                        >
                          Submit Note
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;