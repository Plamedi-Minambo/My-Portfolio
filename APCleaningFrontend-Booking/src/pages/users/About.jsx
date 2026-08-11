import Footer from "../../components/Footer";

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#392C3A] to-[#5a4a5e] text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About AP Cleaning Services
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto">
              Cleaning Redefined. Effortlessly.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  AP Cleaning Services was founded with a simple belief: everyone deserves a clean, comfortable space without the stress and hassle of traditional cleaning services.
                </p>
                <p>
                  What started as a small team of dedicated professionals has grown into a trusted cleaning service provider, serving homes and businesses across the region. We've built our reputation on reliability, transparency, and exceptional service quality.
                </p>
                <p>
                  In partnership with <span className="font-semibold text-[#392C3A]">Webcraft Solutions</span>, we've transformed the way customers book and experience cleaning services. Our innovative platform makes professional cleaning accessible, transparent, and completely stress-free.
                </p>
              </div>
            </div>
            <div className="relative flex items-center justify-center bg-gray-100 rounded-xl shadow-lg p-6 sm:p-8 md:p-12">
              <img
                src="/src/assets/APCleaningLogo.png"
                alt="AP Cleaning Services Logo"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#9D949E] rounded-xl p-6 sm:p-8">
              <div className="w-16 h-16 bg-[#392C3A] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide professional, reliable, and eco-friendly cleaning services that exceed expectations. We're committed to making every space spotless while respecting your time, budget, and the environment.
              </p>
            </div>

            <div className="bg-white border border-[#9D949E] rounded-xl p-6 sm:p-8">
              <div className="w-16 h-16 bg-[#392C3A] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">👁</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To become the most trusted and innovative cleaning service provider, where technology meets traditional quality. We envision a future where booking professional cleaning is as easy as ordering your favorite meal.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from how we train our team to how we serve our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border border-[#9D949E] rounded-xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-[#392C3A] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Trust</h4>
              <p className="text-sm text-gray-600">
                Thoroughly vetted, trained, and background-checked professionals you can rely on.
              </p>
            </div>

            <div className="text-center p-6 border border-[#9D949E] rounded-xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-[#392C3A] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Quality</h4>
              <p className="text-sm text-gray-600">
                Exceptional standards in every clean, with satisfaction guaranteed every time.
              </p>
            </div>

            <div className="text-center p-6 border border-[#9D949E] rounded-xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-[#392C3A] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Sustainability</h4>
              <p className="text-sm text-gray-600">
                Eco-friendly products and practices that are safe for your family and the planet.
              </p>
            </div>

            <div className="text-center p-6 border border-[#9D949E] rounded-xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-[#392C3A] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Innovation</h4>
              <p className="text-sm text-gray-600">
                Cutting-edge technology that makes booking and managing services effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Partnership */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#9D949E] rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Powered by Webcraft Solutions
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our platform is built and maintained by <span className="font-semibold text-[#392C3A]">Webcraft Solutions</span>, 
                  a team of passionate developers and designers dedicated to creating exceptional digital experiences.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  This collaboration brings together AP Cleaning's industry expertise with cutting-edge web technology, 
                  resulting in a seamless, secure, and user-friendly platform that sets new standards in the cleaning 
                  service industry.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Real-time booking and availability tracking</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Secure payment processing and data protection</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Mobile-responsive design for booking on-the-go</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">Comprehensive admin dashboard for efficient operations</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/api/placeholder/500/400" 
                  alt="Technology Platform" 
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#392C3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1,200+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
              <div className="text-gray-300">Cleans Completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-gray-300">Professional Cleaners</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9/5</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AP Cleaning?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're not just another cleaning service—we're your partner in maintaining a pristine space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-[#9D949E] rounded-xl p-6">
              <div className="flex items-start mb-3">
                <span className="text-2xl text-[#392C3A] mr-3 flex-shrink-0 mt-1">🔒</span>
                <h4 className="text-lg font-bold text-gray-900">Fully Insured & Bonded</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Complete peace of mind with comprehensive insurance coverage and bonded professionals.
              </p>
            </div>

            <div className="bg-white border border-[#9D949E] rounded-xl p-6">
              <div className="flex items-start mb-3">
                <span className="text-2xl text-[#392C3A] mr-3 flex-shrink-0 mt-1">🕐</span>
                <h4 className="text-lg font-bold text-gray-900">Flexible Scheduling</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Book at your convenience with real-time availability and easy rescheduling options.
              </p>
            </div>

            <div className="bg-white border border-[#9D949E] rounded-xl p-6">
              <div className="flex items-start mb-3">
                <span className="text-2xl text-[#392C3A] mr-3 flex-shrink-0 mt-1">💰</span>
                <h4 className="text-lg font-bold text-gray-900">Transparent Pricing</h4>
              </div>
              <p className="text-gray-600 text-sm">
                No hidden fees. What you see is what you pay—clear pricing for every service level.
              </p>
            </div>

            <div className="bg-white border border-[#9D949E] rounded-xl p-6">
              <div className="flex items-start mb-3">
                <span className="text-2xl text-[#392C3A] mr-3 flex-shrink-0 mt-1">✅</span>
                <h4 className="text-lg font-bold text-gray-900">Satisfaction Guarantee</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Not happy? We'll make it right—or your money back. Your satisfaction is our priority.
              </p>
            </div>

            <div className="bg-white border border-[#9D949E] rounded-xl p-6">
              <div className="flex items-start mb-3">
                <span className="text-2xl text-[#392C3A] mr-3 flex-shrink-0 mt-1">🌿</span>
                <h4 className="text-lg font-bold text-gray-900">Eco-Friendly Products</h4>
              </div>
              <p className="text-gray-600 text-sm">
                High-quality, environmentally responsible cleaning products safe for your family and pets.
              </p>
            </div>

            <div className="bg-white border border-[#9D949E] rounded-xl p-6">
              <div className="flex items-start mb-3">
                <span className="text-2xl text-[#392C3A] mr-3 flex-shrink-0 mt-1">📱</span>
                <h4 className="text-lg font-bold text-gray-900">Easy Management</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Track bookings, manage preferences, and communicate with your cleaner—all from one dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#392C3A] to-[#5a4a5e] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of satisfied customers who trust AP Cleaning Services for their homes and offices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/book" 
              className="bg-white text-[#392C3A] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Book Your First Clean
            </a>
            <a 
              href="#contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-[#392C3A] transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      </div>
      <Footer />
    </>
  );
};

export default About;