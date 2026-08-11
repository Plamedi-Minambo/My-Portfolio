import { useEffect, useState } from 'react';
import axios from 'axios';

const ViewWaitlist = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get('https://apcleaningbackend20251029193438.azurewebsites.net/api/WaitlistEntries')
      .then(res => setEntries(res.data))
      .catch(err => console.error('Error fetching waitlist:', err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Waitlist Entries</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-[#392C3A] text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">{entry.email}</td>
              <td className="px-4 py-2">
                {new Date(entry.submittedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewWaitlist;