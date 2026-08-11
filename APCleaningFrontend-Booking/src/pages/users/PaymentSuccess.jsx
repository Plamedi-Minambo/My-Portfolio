// src/pages/PaymentSuccess.jsx
const PaymentSuccess = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-gray-700">Thank you for your booking. We’ll be in touch soon.</p>
      <a href="/" className="mt-6 inline-block text-blue-500 underline">Return to Home</a>
    </div>
  );
};

export default PaymentSuccess;