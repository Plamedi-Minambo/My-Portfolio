import { useEffect, useState } from "react";
import axios from "axios";

const ManageInquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("unresolved");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/Contacts")
      .then(res => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch contacts:", err);
        setLoading(false);
      });
  }, []);

  const handleResolve = async (id) => {
    try {
      await axios.put(`https://apcleaningbackend20251029193438.azurewebsites.net/api/Contacts/${id}/resolve`);
      setContacts(prev =>
        prev.map(c => c.contactID === id ? { ...c, isResolved: true } : c)
      );
    } catch (err) {
      console.error("Failed to resolve inquiry:", err);
      alert("❌ Could not mark as resolved.");
    }
  };

  const filtered = contacts.filter(c => activeTab === "resolved" ? c.isResolved : !c.isResolved);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#392C3A] text-center">Manage Inquiries</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("unresolved")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "unresolved" ? "bg-[#392C3A] text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Unresolved
        </button>
        <button
          onClick={() => setActiveTab("resolved")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "resolved" ? "bg-[#392C3A] text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Resolved
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading inquiries...</p>
      ) : filtered.length === 0 ? (
        <p>No {activeTab} inquiries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-[#392C3A] text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Message</th>
                {activeTab === "unresolved" && <th className="px-4 py-2 text-left">Action</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(contact => (
                <tr key={contact.contactID} className="border-t">
                  <td className="px-4 py-2">{contact.name}</td>
                  <td className="px-4 py-2">{contact.email}</td>
                  <td className="px-4 py-2">{contact.subject}</td>
                  <td className="px-4 py-2">{contact.message}</td>
                  {activeTab === "unresolved" && (
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleResolve(contact.contactID)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Mark Resolved
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageInquiries;