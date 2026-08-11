import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_BASE_URL = "https://apcleaningbackend20251029193438.azurewebsites.net/api/UserDashboard";

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [upcomingRes, historyRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/GetUpcomingBookings?userID=${user.id}`),
                    fetch(`${API_BASE_URL}/GetBookingHistory?userID=${user.id}`),
                ]);

                if (!upcomingRes.ok || !historyRes.ok) {
                    throw new Error("Failed to fetch booking data");
                }

                const upcomingData = await upcomingRes.json();
                const historyData = await historyRes.json();

                setUpcomingBookings(upcomingData || []);
                setBookingHistory(historyData || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user.id]);

    if (loading)
        return (
            <div className="p-6 text-center text-gray-600">Loading bookings...</div>
        );

    if (error)
        return (
            <div className="p-6 text-center text-red-600">
                Error loading dashboard: {error}
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto p-6 text-gray-800">
            <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
            <hr className="my-6" />
            <section className="mt-6">
                <h2 className="text-lg font-semibold text-center mb-3">
                    Upcoming Bookings
                </h2>

                {upcomingBookings.length === 0 ? (
                    <div className="text-center text-gray-500 italic">
                        No upcoming bookings found.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-4">
                        {upcomingBookings.map((b) => (
                            <div
                                key={b.bookingID}
                                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                            >
                                <h3 className="font-semibold text-md mb-1">
                                    {b.serviceTypeName}
                                </h3>
                                <p>📅 {new Date(b.serviceDate).toLocaleDateString()}</p>
                                <p>
                                    🕓 {b.serviceStartTime}
                                </p>
                                <p>📍 {b.address}, {b.city}, {b.province}</p>
                                <p>💰 R{b.bookingAmount}</p>
                                <p className="text-green-600 font-semibold">
                                    {b.bookingStatus}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <hr className="my-6" />
            <section>
                <h2 className="text-lg font-semibold text-center mb-3">
                    Booking History
                </h2>

                {bookingHistory.length === 0 ? (
                    <div className="text-center text-gray-500 italic">
                        No previous bookings found.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-4 gap-4">
                        {bookingHistory.map((b) => (
                            <div
                                key={b.bookingID}
                                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                            >
                                <h3 className="font-semibold text-md mb-1">
                                    {b.serviceTypeName}
                                </h3>
                                <p>📅 {new Date(b.serviceDate).toLocaleDateString()}</p>
                                <p>
                                    🕓 {b.serviceStartTime}
                                </p>
                                <p>📍{b.address}, {b.city}, {b.province}</p>
                                <p>💰 R{b.bookingAmount}</p>
                                <p className="text-green-600 font-semibold">
                                    {b.bookingStatus}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <hr className="my-6" />
        </div>
    );
};

export default UserDashboard;