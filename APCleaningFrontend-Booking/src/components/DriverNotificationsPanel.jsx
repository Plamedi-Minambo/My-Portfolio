import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DriverNotificationsPanel = ({ token }) => {
  const [notifications, setNotifications] = useState([]);
  const [visible, setVisible] = useState(false);
  const prevUnreadCount = useRef(0);

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = () => {
    axios.get("https://localhost:7196/api/DriverDashboard/notifications", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const newData = res.data;
        const currentUnread = newData.filter(n => !n.isRead).length;

        // Toast + vibration + sound if new unread messages arrive
        if (currentUnread > prevUnreadCount.current) {
          toast.info(`📬 You have ${currentUnread} unread notification${currentUnread > 1 ? "s" : ""}`);

          if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
          }

          const audio = new Audio("../assets/sounds/notification.wav"); // Sound file
          audio.play().catch(err => console.warn("Sound playback failed:", err));
        }

        prevUnreadCount.current = currentUnread;
        setNotifications(newData);
      })
      .catch(err => console.error("Failed to fetch notifications:", err));
  };

  const markAsRead = (id) => {
    axios.put(`https://localhost:7196/api/DriverDashboard/notifications/${id}/read`, null, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => fetchNotifications())
      .catch(err => console.error("Failed to mark notification as read:", err));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      <button
        onClick={() => setVisible(!visible)}
        className="text-xl px-3 py-1 bg-gray-800 text-white rounded relative"
      >
        🔔 Notifications
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {visible && (
        <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg rounded z-10">
          <div className="p-4">
            <h4 className="font-bold mb-2">Notifications</h4>
            {notifications.length === 0 ? (
              <p className="text-gray-500">No notifications</p>
            ) : (
              <ul className="space-y-2">
                {notifications.map(n => (
                  <li
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`p-2 rounded cursor-pointer transition ${
                      n.isRead ? "bg-gray-100" : "bg-blue-100 font-semibold"
                    }`}
                  >
                    {n.message}
                    <div className="text-xs text-gray-500">
                      {new Date(n.createdAt).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverNotificationsPanel;