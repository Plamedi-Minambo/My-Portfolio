// src/pages/PaymentCancelled.jsx
import { Link } from "react-router-dom";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F8F8] px-4">
      <img
        src="https://cdn-icons-png.flaticon.com/512/753/753345.png"
        alt="Payment Cancelled"
        className="w-32 h-32 mb-6"
      />
      <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Cancelled</h1>
      <p className="text-gray-700 text-center max-w-md mb-6">
        It looks like your payment was cancelled or interrupted. No worries—your booking hasn’t been confirmed yet.
      </p>
      <div className="flex gap-4">
        <Link
          to="/book"
          className="px-4 py-2 bg-[#392C3A] text-white rounded hover:bg-gray-800 transition"
        >
          Try Again
        </Link>
        <Link
          to="/contact"
          className="px-4 py-2 border border-[#392C3A] text-[#392C3A] rounded hover:bg-gray-100 transition"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;