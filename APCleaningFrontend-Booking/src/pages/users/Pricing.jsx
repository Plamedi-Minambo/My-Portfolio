import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const Pricing = () => {
  const [getServices, setGetServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://apcleaningbackend20251029193438.azurewebsites.net/api/ServiceTypes")
      .then((res) => setGetServices(res.data))
      .catch((err) => console.error("Failed to fetch services:", err));
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100">

        {/* Hero Section */}
        <section className="text-center py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
              Simple, Transparent Pricing
            </h1>
            <h2 className="text-3xl md:text-4xl font-light text-gray-700 mb-8">
              No hidden fees. Just spotless service.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether it's a deep clean, a fresh start, or weekly sparkle — we've got you covered.
            </p>
          </div>
        </section>

        {/* Service Cards */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {getServices.map((s) => (
                <div
                  key={s.serviceTypeID}
                  className="border-2 border-[#392C3A] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="relative h-48">
                    <img
                      src={`https://apcleaningstorage12.blob.core.windows.net/serviceimages/${s.imageURL}`}
                      alt={`${s.name} service image`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{s.name}</h3>
                    <p className="text-green-600 font-semibold mb-4">From R{s.price}</p>
                    <div className="text-gray-600 mb-4">
                      {s.description.includes('\n') ? (
                        s.description.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">{line.trim()}</p>
                      ))
                    ) : (
                    <p>{s.description}</p>
                    )}
                    </div>

                    <button
                      onClick={() => navigate(`/book?service=${s.serviceTypeID}`)}
                      className="w-full bg-[#392C3A] text-white py-3 px-4 rounded font-medium hover:bg-[#4A3A4F] transition-all duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr />

        {/* FAQ Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-light text-gray-800 text-center mb-12">FAQ / Service Notes</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Do you bring your own cleaning supplies?</h3>
                <p className="text-gray-600">Yes, we bring eco-friendly, high-quality products.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Can I cancel a booking?</h3>
                <p className="text-gray-600">Yes — cancellations allowed up to 24h in advance with full refund.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Do you clean windows, carpets, or pets?</h3>
                <p className="text-gray-600">Some services are available upon request — just ask!</p>
              </div>
            </div>
          </div>
        </section>

        <hr />

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light text-gray-800 mb-8">
              Ready for a cleaner space — without the stress?
            </h2>
            <button
              onClick={() => navigate("/book")}
              className="bg-[#392C3A] text-white py-4 px-12 rounded-lg text-lg font-medium hover:bg-[#4A3A4F] transition-all duration-300"
            >
              Book a Clean
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;