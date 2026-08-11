import { useState } from "react";
import Footer from "../../components/Footer";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitted) {
      setErrors(validate());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setSuccessMessage("");
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        await axios.post("https://apcleaningbackend20251029193438.azurewebsites.net/api/Contacts", form);
        setSuccessMessage("✅ Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
        setSubmitted(false);
      } catch (error) {
        console.error("Contact submission failed:", error);
        alert("❌ Failed to send message. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="w-full max-w-5xl bg-white shadow rounded-lg p-4 sm:p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-semibold">Contact Us</h1>
              <p className="text-sm sm:text-base text-gray-600">We are here to help</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Contact Form */}
              <form
                className="space-y-4 transition-transform duration-300 hover:scale-[1.01] hover:shadow-md"
                onSubmit={handleSubmit}
                noValidate
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    autoFocus
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`mt-1 block w-full text-base border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-[#392C3A] focus:border-[#392C3A] sm:text-sm`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    inputMode="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`mt-1 block w-full text-base border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-[#392C3A] focus:border-[#392C3A] sm:text-sm`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className={`mt-1 block w-full text-base border ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-[#392C3A] focus:border-[#392C3A] sm:text-sm`}
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Write your message..."
                    className={`mt-1 block w-full text-base border resize-none ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-[#392C3A] focus:border-[#392C3A] sm:text-sm`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#392C3A] text-white py-2 px-4 text-base rounded-md transition duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#4A3A4F] hover:scale-[1.01]"
                  }`}
                >
                  {loading ? "Sending..." : "Contact Us"}
                </button>

                {successMessage && (
                  <p className="text-green-600 text-sm mt-4 text-center">{successMessage}</p>
                )}
              </form>

              {/* Contact Info */}
              <div className="space-y-6 border border-gray-200 rounded-md p-6 bg-gray-50 transition-transform duration-300 hover:scale-[1.01] hover:shadow-md">
                <div>
                  <h3 className="text-lg font-medium mb-2">📧 Email</h3>
                  <p className="text-gray-600 break-words">support@apcleaners.com</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">📞 Phone</h3>
                  <p className="text-gray-600">+27 123 456 7890</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">⏰ Business Hours</h3>
                  <p className="text-gray-600">Mon - Fri: 9am - 6pm</p>
                  <p className="text-gray-600">Sat - Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Contact;