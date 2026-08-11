import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://apcleaningbackend20251029193438.azurewebsites.net/api/Auth";

const UserSettings = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        userId: "",
        fullName: "",
        email: "",
        phoneNumber: "",
    });
    const [passwords, setPasswords] = useState({
        new: "",
        confirm: "",
        current: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (storedUser) {
            setProfile({
                userId: user.id,
                fullName: user.fullName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
            });
        }
    }, []);

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post(
                `${API_BASE}/updateUser`,
                {
                    UserId: profile.userId,
                    FullName: profile.fullName,
                    Email: profile.email,
                    PhoneNumber: profile.phoneNumber,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage(res.data.message || "Profile updated successfully");
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.errors?.join(", ") || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (passwords.new !== passwords.confirm) {
            setMessage("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(
                `${API_BASE}/change-password`,
                {
                    UserId: user.id,
                    Email: null,
                    Token: null,
                    CurrentPassword: passwords.current,
                    NewPassword: passwords.new,
                }
            );
            setMessage(res.data.message || "Password changed successfully");
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.errors?.join(", ") || "Password change failed");
        } finally {
            setLoading(false);
        }
    };

    const handleAccountDelete = async () => {
        if (!window.confirm("Are you sure you want to permanently delete your account?"))
            return;

        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post(
                `${API_BASE}/deleteProfile`,
                { userId: profile.userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage(res.data.message || "Account deleted successfully");
            localStorage.clear();
            navigate("/login")
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.errors?.join(", ") || "Delete failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 text-gray-800">
            <h1 className="text-2xl font-semibold mb-4 text-center">
                Profile Settings
            </h1>

            {message && (
                <div
                    className={`text-center mb-4 p-2 rounded ${message.toLowerCase().includes("fail")
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                        }`}
                >
                    {message}
                </div>
            )}

            <form onSubmit={handleProfileSave} className="border p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Edit Profile</h3>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border rounded p-2 mb-2"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border rounded p-2 mb-2"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
                <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full border rounded p-2 mb-2"
                    value={profile.phoneNumber}
                    onChange={(e) =>
                        setProfile({ ...profile, phoneNumber: e.target.value })
                    }
                />
                <button
                    disabled={loading}
                    className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>

            {/* 🔹 Change Password */}
            <form onSubmit={handlePasswordChange} className="border p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Change Password</h3>
                <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full border rounded p-2 mb-2"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border rounded p-2 mb-2"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full border rounded p-2 mb-2"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                />
                <button
                    disabled={loading}
                    className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-50"
                >
                    {loading ? "Changing..." : "Change Password"}
                </button>
            </form>

            {/* 🔹 Delete Account */}
            <div className="bg-red-100 border border-red-300 p-6 rounded-lg text-center">
                <h3 className="font-semibold text-red-700 mb-2">Delete Account</h3>
                <p className="text-sm text-red-600 mb-4">
                    This will permanently remove your account, including booking history
                    and preferences.
                </p>
                <button
                    onClick={handleAccountDelete}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded disabled:opacity-50"
                >
                    {loading ? "Deleting..." : "Delete Account"}
                </button>
            </div>
        </div>
    );
};

export default UserSettings;