import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is LoanLink?",
    answer:
      "LoanLink is a digital micro-loan management platform that allows users to apply, monitor, and repay loans transparently while enabling managers to review and approve applications efficiently.",
  },
  {
    question: "How do I apply for a loan?",
    answer:
      "After registering and logging in, you can explore available loan options and submit an application directly from the loan details page.",
  },
  {
    question: "Who can approve my loan?",
    answer:
      "Loan applications are reviewed by authorized loan managers based on verification and eligibility rules defined by the platform.",
  },
  {
    question: "How can I track loan status?",
    answer:
      "You can track real-time loan progress from your dashboard under the “My Loans” section once you are logged in.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Yes. LoanLink uses encrypted data handling and role-based access to ensure your personal and financial data remains protected.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#11121A]"> {/* dark mode bg */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#1C1C28] dark:text-[#E6F4F1]"> {/* dark mode text */}
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-[#6B7280] dark:text-gray-300 max-w-2xl mx-auto"> {/* dark mode text */}
            Clear answers to common questions about how LoanLink works and how
            we keep the loan process simple, secure, and transparent.
          </p>
        </motion.div>

        {/* FAQ Cards */}
        <div className="space-y-6">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-white dark:bg-[#1C1C28] border border-[#E3F1EC] dark:border-[#2C2C38] rounded-2xl shadow-sm hover:shadow-lg transition"
              /* dark mode bg + border */
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-8 py-6 text-left"
              >
                <div className="flex items-center gap-4">
                  {/* Accent Bar */}
                  <span
                    className={`h-8 w-1 rounded-full transition ${
                      open === i
                        ? "bg-[#1F7A63]"
                        : "bg-[#CDEAE2] group-hover:bg-[#1F7A63] dark:bg-[#2C2C38] dark:group-hover:bg-[#1F7A63]"
                    }`}
                  ></span>

                  <h3 className="text-lg font-semibold text-[#1C1C28] dark:text-[#E6F4F1]"> {/* dark mode text */}
                    {item.question}
                  </h3>
                </div>

                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[#1F7A63] dark:text-[#B6E04C]" /* dark mode icon color */
                >
                  {open === i ? <Minus size={20} /> : <Plus size={20} />}
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="px-8 pb-6 text-[#6B7280] dark:text-gray-300 leading-relaxed" 
                    /* dark mode text */
                  >
                    {item.answer}
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
