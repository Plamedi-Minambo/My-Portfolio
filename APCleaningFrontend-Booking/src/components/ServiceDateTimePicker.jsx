import { useState, useEffect } from "react";

const generateTimeSlots = (start = 8, end = 17, interval = 30) => {
  const slots = [];
  for (let hour = start; hour < end; hour++) {
    for (let min = 0; min < 60; min += interval) {
      const h = hour.toString().padStart(2, '0');
      const m = min.toString().padStart(2, '0');
      slots.push(`${h}:${m}`);
    }
  }
  return slots;
};

const ServiceDateTimePicker = ({ value, onChange, error }) => {
  const [date, setDate] = useState(value?.date || '');
  const [time, setTime] = useState(value?.time || '');
  const timeSlots = generateTimeSlots();

  // Sync with parent state
  useEffect(() => {
    if (date && time) {
      onChange({ date, time });
    }
  }, [date, time]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-[#392C3A]">Choose Your Appointment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date Picker */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-300">
          <label className="block text-sm font-semibold text-[#392C3A] mb-2">Select a Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#392C3A] ${
              error?.date ? 'border-red-500' : ''
            }`}
          />
          {error?.date && <p className="text-red-500 text-sm mt-1">{error.date}</p>}
        </div>

        {/* Time Picker */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-300">
          <label className="block text-sm font-semibold text-[#392C3A] mb-2">Select a Time</label>
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {timeSlots.map(slot => (
              <button
                key={slot}
                type="button"
                onClick={() => setTime(slot)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  time === slot
                    ? "bg-[#392C3A] text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-[#EDE9ED]"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          {error?.time && <p className="text-red-500 text-sm mt-2">{error.time}</p>}
        </div>
      </div>

      {/* Summary */}
      {date && time && (
        <div className="text-center mt-4 text-sm text-gray-700">
          <p>
            You’ve selected <span className="font-semibold text-[#392C3A]">{date}</span> at{" "}
            <span className="font-semibold text-[#392C3A]">{time}</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceDateTimePicker;