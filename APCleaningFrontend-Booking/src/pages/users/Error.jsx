import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center">
          {/* 404 Illustration (replace with your own if you have one) */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="Error Illustration"
            className="w-56 h-56 mx-auto mb-6"
          />

          {/* Error Message */}
          <h1 className="text-2xl font-semibold mb-2">
            Oops! Something went wrong.
          </h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            The page you’re looking for cannot be found or has encountered an
            issue.
          </p>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              Return to Home Page
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-100"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
