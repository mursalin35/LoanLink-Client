import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is LoanLink?",
    answer:
      "LoanLink is a web-based microloan request, review, and approval management system for borrowers, managers, and admins.",
  },
  {
    question: "How can I apply for a loan?",
    answer:
      "Register and login first. Then, browse loans on the Home or All Loans page and click 'Apply Now' on the loan details page.",
  },
  {
    question: "What are the eligibility criteria?",
    answer:
      "Eligibility criteria may vary based on the loan category. Ensure your personal and financial information is accurate when applying.",
  },
  {
    question: "How can I track my loan application status?",
    answer:
      "Logged-in borrowers can check their loan status under the 'My Loans' section in the dashboard.",
  },
  {
    question: "Can managers approve loans?",
    answer:
      "Yes, managers (loan officers) can approve or reject pending loan applications through their dashboard.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white">
      {/* Optional top wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,154.7C672,128,768,128,864,144C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 drop-shadow-lg">
          Frequently Asked Questions
        </h2>
        <div className="grid  gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              layout
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left text-gray-800 dark:text-gray-200 font-semibold text-lg"
              >
                {faq.question}
                {activeIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0 }}
                    className="px-6 pb-5 text-gray-600 dark:text-gray-300 text-base"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
