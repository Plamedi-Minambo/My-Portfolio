import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
Modal.setAppElement("#root");

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("unassigned");
  const [cleaners, setCleaners] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedAssignments, setSelectedAssignments] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editBookingData, setEditBookingData] = useState(null);


  useEffect(() => {
    fetchBookings();
    fetchCleaners();
    fetchDrivers();
  }, []);

  useEffect(() => {
  axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/ServiceTypes")
    .then(res => setServiceTypes(res.data))
    .catch(() => toast.error("Failed to load service types"));
}, []);

  const fetchBookings = () => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/Admin")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to fetch bookings:", err));
  };

  const fetchCleaners = () => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/Admin/cleaners")
      .then((res) => setCleaners(res.data))
      .catch((err) => console.error("Failed to fetch cleaners:", err));
  };

  const fetchDrivers = () => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/Admin/drivers")
      .then((res) => setDrivers(res.data))
      .catch((err) => console.error("Failed to fetch drivers:", err));
  };

  const handleCleanerSelect = (bookingID, cleanerID) => {
    setSelectedAssignments(prev => ({
      ...prev,
      [bookingID]: {
        ...prev[bookingID],
        cleanerID
      }
    }));
  };

  const handleDriverSelect = (bookingID, driverID) => {
    setSelectedAssignments(prev => ({
      ...prev,
      [bookingID]: {
        ...prev[bookingID],
        driverID
      }
    }));
  };

  const assign = (bookingID) => {
    const assignment = selectedAssignments[bookingID];
    if (!assignment) return;

    axios.put(`https://apcleaningbackend20251029193438.azurewebsites.net/api/Admin/${bookingID}/assign`, {
      cleanerID: assignment.cleanerID ?? null,
      driverID: assignment.driverID ?? null
    })
      .then(() => {
        toast.success("Booking assigned successfully");
        fetchBookings();
        fetchCleaners();
        fetchDrivers();
      })
      .catch(err => toast.error("Assignment failed"));
  };

  const editBooking = (bookingID, updatedBooking) => {
    axios.put(`https://apcleaningbackend20251029193438.azurewebsites.net/api/Admin/${bookingID}`, updatedBooking)
      .then(() => {
        toast.success("Booking updated");
        fetchBookings();
      })
      .catch(err => toast.error("Update failed"));
  };

  const deleteBooking = (bookingID) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    axios.delete(`https://apcleaningbackend20251029193438.azurewebsites.net/api/Admin/${bookingID}`)
      .then(() => {
        toast.success("Booking deleted");
        fetchBookings();
      })
      .catch(err => toast.error("Delete failed"));
  };

  const resetAssignment = (bookingID) => {
    if (!window.confirm("Reset cleaner and driver assignment for this booking?")) return;

    axios.put(`https://apcleaningbackend20251029193438.azurewebsites.net/api/Admin/bookings/${bookingID}/reset-assignment`)
      .then(() => {
        toast.success("Assignment reset successfully");
        fetchBookings();
        fetchCleaners();
        fetchDrivers();
      })
      .catch(err => toast.error("Reset failed"));
  };

  const openEditModal = (booking) => {
  const extractTime = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const date = new Date(dateTimeStr);
    return date.toTimeString().slice(0, 5); // "HH:mm"
  };

  setEditBookingData({
    bookingID: booking.bookingID,
    fullName: booking.fullName || "",
    email: booking.email || "",
    address: booking.address || "",
    city: booking.city || "",
    province: booking.province || "",
    zipCode: booking.zipCode || "",
    serviceDate: booking.serviceDate?.slice(0, 10) || "",
    serviceStartTime: extractTime(booking.serviceStartTime),
    serviceEndTime: extractTime(booking.serviceEndTime),
    bookingAmount: booking.bookingAmount || 0,
    bookingStatus: booking.bookingStatus || "",
    customerID: booking.customerID || "",
    serviceTypeID: booking.serviceTypeID || 1
  });

  setEditModalOpen(true);
};


const closeEditModal = () => {
  setEditModalOpen(false);
  setEditBookingData(null);
};

const handleEditChange = (field, value) => {
  setEditBookingData(prev => ({ ...prev, [field]: value }));
};

const combineDateAndTime = (dateStr, timeStr) => {
  return `${dateStr}T${timeStr}:00`
};

const submitEdit = () => {
  const payload = {
    ...editBookingData,
    serviceStartTime: combineDateAndTime(editBookingData.serviceDate, editBookingData.serviceStartTime),
    serviceEndTime: combineDateAndTime(editBookingData.serviceDate, editBookingData.serviceEndTime)
  };

  axios.put(`https://apcleaningbackend20251029193438.azurewebsites.net/api/Admin/${editBookingData.bookingID}`, payload)
    .then(() => {
      toast.success("Booking updated");
      fetchBookings();
      closeEditModal();
    })
    .catch(() => toast.error("Update failed"));
};



  const filteredBookings = bookings.filter(b => {
    const now = new Date();
    switch (activeTab) {
      case "unassigned":
        return b.paymentStatus === "Paid" && b.assignedCleanerID === null && b.bookingStatus !== "Pending";
      case "rejected":
        return b.bookingStatus === "Rejected";
      case "completed":
        return b.bookingStatus === "Completed";
      case "EnRoute":
        return b.bookingStatus === "EnRoute";
      case "Arrived":
        return b.bookingStatus === "Arrived";
      case "confirmed":
        return b.bookingStatus === "Confirmed" && new Date(b.serviceDate) > now;
      case "pending":
        return b.bookingStatus === "Pending";
      default:
        return true;
    }
  });

  const tabStyle = (tab) =>
    `px-4 py-2 rounded-t-lg font-semibold ${
      activeTab === tab ? "bg-[#392C3A] text-white" : "bg-gray-200 text-gray-700"
    }`;

  const availableCleaners = cleaners.filter(c => c.availabilityStatus === "Available");
  const availableDrivers = drivers.filter(d => d.availabilityStatus === "Available");

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Manage Bookings</h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 overflow-x-auto px-2 py-3">
        <button onClick={() => setActiveTab("unassigned")} className={tabStyle("unassigned")}>Paid & Unassigned</button>
        <button onClick={() => setActiveTab("rejected")} className={tabStyle("rejected")}>Rejected</button>
        <button onClick={() => setActiveTab("EnRoute")} className={tabStyle("EnRoute")}>EnRoute</button>
        <button onClick={() => setActiveTab("Arrived")} className={tabStyle("Arrived")}>Arrived</button>
        <button onClick={() => setActiveTab("completed")} className={tabStyle("completed")}>Completed</button>
        <button onClick={() => setActiveTab("confirmed")} className={tabStyle("confirmed")}>Upcoming</button>
        <button onClick={() => setActiveTab("pending")} className={tabStyle("pending")}>Pending</button>
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {filteredBookings.length === 0 ? (
    <div className="col-span-full text-center text-gray-500 py-6">
      No bookings found.
    </div>
  ) : (
    filteredBookings.map((b) => (
      <div key={b.bookingID} className="bg-white border rounded-lg shadow p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{b.fullName}</h3>
          <span className="text-sm text-gray-500">#{b.customerID}</span>
        </div>

        <p className="text-sm text-gray-600">{b.email}</p>
        <p className="text-sm text-gray-600">
          <strong>Address:</strong> {b.address}, {b.city}, {b.province}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Service:</strong> {b.serviceTypeName}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Date:</strong> {new Date(b.serviceDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Time:</strong>{" "}
          {new Date(b.serviceStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
          {new Date(b.serviceEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Amount:</strong> R{b.bookingAmount}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Status:</strong> {b.bookingStatus}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Payment:</strong> {b.paymentStatus}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Driver:</strong>{" "}
          {b.assignedDriverID
            ? drivers.find(d => d.driverDetailsID === b.assignedDriverID)?.fullName || b.assignedDriverID
            : "Unassigned"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Cleaner:</strong>{" "}
          {b.assignedCleanerID
            ? cleaners.find(c => c.cleanerDetailsID === b.assignedCleanerID)?.fullName || b.assignedCleanerID
            : "Unassigned"}
        </p>

        {activeTab === "unassigned" && (
          <div className="space-y-2">
            <select
              defaultValue=""
              onChange={(e) => handleCleanerSelect(b.bookingID, parseInt(e.target.value))}
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Assign Cleaner</option>
              {availableCleaners.map(c => (
                <option key={c.cleanerDetailsID} value={c.cleanerDetailsID}>
                  {c.fullName}
                </option>
              ))}
            </select>

            <select
              defaultValue=""
              onChange={(e) => handleDriverSelect(b.bookingID, parseInt(e.target.value))}
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Assign Driver</option>
              {availableDrivers.map(d => (
                <option key={d.driverDetailsID} value={d.driverDetailsID}>
                  {d.fullName}
                </option>
              ))}
            </select>

            <button
              onClick={() => assign(b.bookingID)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full"
            >
              Assign
            </button>
          </div>
        )}

        <div className="flex justify-between pt-3">
          <button
            onClick={() => openEditModal(b)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => resetAssignment(b.bookingID)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Reset
          </button>
          <button
            onClick={() => deleteBooking(b.bookingID)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    ))
  )}
</div>
      <Modal
  isOpen={editModalOpen}
  onRequestClose={closeEditModal}
  overlayClassName="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50"
  className="bg-white p-6 rounded shadow max-w-xl w-full mt-20 mb-20"
>
  <h3 className="text-xl font-bold mb-4">Edit Booking</h3>

  <div className="space-y-3 max-h-[70vh] overflow-y-auto">
    <input
      type="text"
      value={editBookingData?.fullName || ""}
      onChange={(e) => handleEditChange("fullName", e.target.value)}
      placeholder="Full Name"
      className="border px-3 py-2 w-full"
    />
    <input
      type="email"
      value={editBookingData?.email || ""}
      onChange={(e) => handleEditChange("email", e.target.value)}
      placeholder="Email"
      className="border px-3 py-2 w-full"
    />
    <input
      type="text"
      value={editBookingData?.address || ""}
      onChange={(e) => handleEditChange("address", e.target.value)}
      placeholder="Address"
      className="border px-3 py-2 w-full"
    />
    <input
      type="text"
      value={editBookingData?.city || ""}
      onChange={(e) => handleEditChange("city", e.target.value)}
      placeholder="City"
      className="border px-3 py-2 w-full"
    />
    <input
      type="text"
      value={editBookingData?.province || ""}
      onChange={(e) => handleEditChange("province", e.target.value)}
      placeholder="Province"
      className="border px-3 py-2 w-full"
    />
    <input
      type="text"
      value={editBookingData?.zipCode || ""}
      onChange={(e) => handleEditChange("zipCode", e.target.value)}
      placeholder="Zip Code"
      className="border px-3 py-2 w-full"
    />
    <select
    value={editBookingData?.serviceTypeID || ""}
    onChange={(e) => handleEditChange("serviceTypeID", parseInt(e.target.value))}
    className="border px-3 py-2 w-full">
      <option value="">Select Service Type</option>
      {serviceTypes.map((type) => (
        <option key={type.serviceTypeID} value={type.serviceTypeID}>
          {type.name}
          </option>
        ))}
        </select>

    <input
      type="date"
      value={editBookingData?.serviceDate?.slice(0, 10) || ""}
      onChange={(e) => handleEditChange("serviceDate", e.target.value)}
      className="border px-3 py-2 w-full"
    />
    <input
      type="time"
      value={editBookingData?.serviceStartTime || ""}
      onChange={(e) => handleEditChange("serviceStartTime", e.target.value)}
      className="border px-3 py-2 w-full"
    />
    <input
      type="time"
      value={editBookingData?.serviceEndTime || ""}
      onChange={(e) => handleEditChange("serviceEndTime", e.target.value)}
      className="border px-3 py-2 w-full"
    />
    <input
      type="number"
      value={editBookingData?.bookingAmount || ""}
      onChange={(e) => handleEditChange("bookingAmount", e.target.value)}
      placeholder="Amount"
      className="border px-3 py-2 w-full"
    />
    <select
      value={editBookingData?.bookingStatus || ""}
      onChange={(e) => handleEditChange("bookingStatus", e.target.value)}
      className="border px-3 py-2 w-full"
    >
      <option value="">Select Status</option>
      <option value="Pending">Pending</option>
      <option value="Confirmed">Confirmed</option>
      <option value="Rejected">Rejected</option>
      <option value="Completed">Completed</option>
      <option value="EnRoute">EnRoute</option>
      <option value="Arrived">Arrived</option>
    </select>
  </div>

  <div className="flex justify-end space-x-2 mt-6">
    <button
      onClick={submitEdit}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Save
    </button>
    <button
      onClick={closeEditModal}
      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
    >
      Cancel
    </button>
  </div>
</Modal>

    </div>
  );
};

export default ManageBookings;