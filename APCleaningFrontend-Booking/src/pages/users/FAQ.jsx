import { useState } from 'react';
import Footer from "../../components/Footer";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "Do your cleaners bring their own supplies?",
      answer: "Yes! All our cleaners arrive fully equipped with high-quality, eco-friendly cleaning products. You don't need to lift a finger — unless it's to make coffee while we work."
    },
    {
      question: "What if I need to reschedule my booking?",
      answer: "No problem! We understand that life happens. You can reschedule your booking up to 24 hours before your scheduled appointment without any fees. Simply contact us through your account dashboard or give us a call, and we'll find a new time that works for you."
    },
    {
      question: "How are your cleaners vetted?",
      answer: "We take safety and quality seriously. All our cleaners go through a comprehensive background check, reference verification, and thorough training program. Each cleaner is also insured and bonded for your peace of mind. We only work with experienced professionals who share our commitment to excellence."
    },
    {
      question: "How long does a typical cleaning take?",
      answer: "Cleaning times vary based on your home size and the service you choose. A standard clean for a 2-bedroom apartment typically takes 2-3 hours, while larger homes may take 4-5 hours. Deep cleaning services take longer. You'll see an estimated duration when you book, and our cleaners work efficiently without rushing."
    },
    {
      question: "What's included in a standard cleaning?",
      answer: "Our standard cleaning covers all the essentials: dusting all surfaces, vacuuming and mopping floors, cleaning bathrooms (toilets, showers, sinks, mirrors), kitchen cleaning (counters, sinks, appliances), and trash removal. We also make beds and do light tidying. Need something specific? Just add it to your booking notes!"
    },
    {
      question: "Do I need to be home during the cleaning?",
      answer: "Not at all! Many of our clients prefer to be out while we work. You can provide access instructions during booking, whether that's a key lockbox, door code, or leaving a key with a neighbor. If you'd rather be home, that's perfectly fine too—whatever makes you most comfortable."
    },
    {
      question: "What's your cancellation policy?",
      answer: "You can cancel free of charge up to 24 hours before your scheduled cleaning. Cancellations made less than 24 hours in advance will incur a 50% fee. We understand emergencies happen, so we handle each situation with understanding and flexibility."
    },
    {
      question: "Are you insured if something gets damaged?",
      answer: "Absolutely. We carry full liability insurance and all our cleaners are bonded. In the rare event that something is damaged during a cleaning, simply contact us within 24 hours and we'll make it right. Your peace of mind is our priority."
    },
    {
      question: "What if I'm not satisfied with the cleaning?",
      answer: "We stand behind our work with a 100% satisfaction guarantee. If you're not happy with any aspect of your cleaning, contact us within 24 hours and we'll send our team back to re-clean those areas at no additional charge. Your happiness is what matters most to us."
    },
    {
      question: "Do you clean homes with pets?",
      answer: "We love pets! Just let us know in your booking notes what furry friends we'll be meeting. We ask that you secure pets in a safe area during cleaning if they're nervous around strangers. Don't worry about pet hair—we're experienced at tackling even the fluffiest situations."
    },
    {
      question: "How do I pay for services?",
      answer: "We accept all major credit cards, debit cards, and digital payment methods through our secure platform. Payment is processed automatically after your cleaning is complete. You'll receive a detailed receipt via email, and you can view your payment history anytime in your account dashboard."
    },
    {
      question: "Can I book recurring cleaning services?",
      answer: "Yes! We offer weekly, bi-weekly, and monthly recurring services at discounted rates. Once you set up a recurring schedule, your preferred cleaner will come automatically on your chosen days. You can pause, modify, or cancel your recurring service anytime from your account."
    }
  ];

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const styles = {
    container: {
      backgroundColor: '#F3F4F6',
      minHeight: '100vh',
      padding: '60px 20px',
      fontFamily: 'Georgia, serif'
    },
    title: {
      textAlign: 'center',
      fontSize: '2.5rem',
      color: '#3a3a3a',
      marginBottom: '40px',
      fontWeight: '400',
      letterSpacing: '0.5px'
    },
    searchContainer: {
      maxWidth: '600px',
      margin: '0 auto 30px',
      position: 'relative'
    },
    searchInput: {
      width: '100%',
      padding: '15px 45px 15px 20px',
      border: '1px solid #b8b0a0',
      backgroundColor: '#f5f2ed',
      fontSize: '1rem',
      borderRadius: '8px',
      outline: 'none',
      fontFamily: 'Georgia, serif',
      color: '#3a3a3a',
      boxSizing: 'border-box'
    },
    searchIcon: {
      position: 'absolute',
      right: '18px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '1.1rem',
      color: '#8a8275',
      pointerEvents: 'none'
    },
    faqList: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    faqItem: {
      backgroundColor: '#f5f2ed',
      border: '1px solid #b8b0a0',
      borderRadius: '8px',
      marginBottom: '15px',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    },
    faqQuestion: {
      padding: '20px 25px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '1.1rem',
      color: '#3a3a3a',
      userSelect: 'none',
      transition: 'background-color 0.2s ease'
    },
    questionNumber: {
      fontWeight: '600',
      flexShrink: 0
    },
    questionText: {
      flexGrow: 1,
      fontWeight: '500'
    },
    toggleIcon: {
      fontSize: '2rem',
      fontWeight: '300',
      color: '#6a6050',
      transition: 'transform 0.3s ease',
      flexShrink: 0,
      lineHeight: 1
    },
    toggleIconOpen: {
      transform: 'rotate(45deg)'
    },
    faqAnswer: {
      padding: '0 25px 25px 45px',
      color: '#5a5a5a',
      lineHeight: '1.7',
      fontSize: '1rem'
    },
    noResults: {
      textAlign: 'center',
      padding: '40px 20px',
      color: '#8a8275',
      fontSize: '1.1rem',
      fontStyle: 'italic'
    }
  };

  return (
    <>
    <div style={styles.container}>
      <h1 style={styles.title}>Frequently Asked Questions</h1>
      
      <div style={styles.searchContainer}>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span style={styles.searchIcon}>🔍</span>
      </div>

      <div style={styles.faqList}>
        {filteredFAQs.map((faq, index) => (
          <div 
            key={index} 
            style={styles.faqItem}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#9a8f7f'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#b8b0a0'}
          >
            <div 
              style={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eee9e0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span style={styles.questionNumber}>{index + 1}.</span>
              <span style={styles.questionText}>{faq.question}</span>
              <span style={{
                ...styles.toggleIcon,
                ...(openIndex === index ? styles.toggleIconOpen : {})
              }}>+</span>
            </div>
            {openIndex === index && (
              <div style={styles.faqAnswer}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        {filteredFAQs.length === 0 && (
          <div style={styles.noResults}>No matching questions found.</div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default FAQ;