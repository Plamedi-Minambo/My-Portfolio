import livingroom from "../../assets/Livingroom.jpeg";
import chooseService from "../../assets/PickAService.jpeg";
import pickTime from "../../assets/SelectTime.jpeg";
import relax from "../../assets/Relax.jpeg";
import whyhomeowners from "../../assets/WhyHomeOwnersTrustAP.jpeg";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const bookPage = () => {
    navigate(`/book`);
  };

  const pricingPage = () => {
    navigate(`/pricing`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">A Cleaner Home Starts Here.</h1>
            <p className="text-gray-600 mb-6">
              Professional, friendly cleaning services that fit your busy schedule.
            </p>
            <div className="space-x-4">
              <button
                onClick={bookPage}
                className="bg-blue-600 text-white px-6 py-2 rounded transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] hover:shadow-md"
              >
                Book a Cleaner
              </button>
              <button
                onClick={pricingPage}
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded transition-all duration-300 hover:bg-blue-50 hover:scale-[1.02]"
              >
                Explore Services
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.01]">
              <img src={livingroom} alt="Living Room" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* How Booking Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">How Booking Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[chooseService, pickTime, relax].map((img, index) => {
              const titles = ["Choose Your Service", "Pick a Time", "Relax & Enjoy"];
              const descriptions = [
                "Select the cleaning service that suits your needs.",
                "Schedule a time that works best for you.",
                "Let our trusted cleaners handle the rest while you relax."
              ];
              return (
                <div
                  key={index}
                  className="p-6 border rounded-lg shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-md"
                >
                  <div className="w-8 h-8 rounded-full bg-[#392C3A] text-white flex items-center justify-center text-sm font-bold mb-4 mx-auto">
                    {index + 1}
                  </div>
                  <img
                    src={img}
                    alt={titles[index]}
                    className="w-full h-48 object-cover rounded mb-4 mx-auto transition-transform duration-300 hover:scale-[1.01]"
                  />
                  <h3 className="text-xl font-semibold mb-2">{titles[index]}</h3>
                  <p className="text-gray-600">{descriptions[index]}</p>
                </div>
              );
            })}
          </div>
          <button
            onClick={bookPage}
            className="mt-8 bg-black text-white px-6 py-2 rounded transition-all duration-300 hover:bg-gray-800 hover:scale-[1.02]"
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Why Trust Section */}
      <section className="bg-[#392C3A] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <div className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.01]">
              <img src={whyhomeowners} alt="Why Homeowners Trust AP" className="w-full h-auto object-cover" />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Why Homeowners Trust AP Cleaning</h2>
            <p className="text-gray-200">
              With cleaners you can rely on, AP Cleaning takes care of your home with detail and care.
              Our cleaners bring strong work ethic, flexibility, and passion to ensure your home sparkles.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "They did an amazing job with my apartment. Highly recommend!", name: "Sarah M." },
              { quote: "Professional cleaners, punctual and detail-oriented.", name: "John K." },
              { quote: "The booking process was so simple and convenient.", name: "Lisa P." }
            ].map((t, i) => (
              <div
                key={i}
                className="p-6 border rounded-lg shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-md"
              >
                <p className="text-gray-600 italic">“{t.quote}”</p>
                <p className="mt-4 font-semibold">- {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Home;