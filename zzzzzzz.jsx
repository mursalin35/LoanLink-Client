import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaSearch,
  FaFileAlt,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Register Account",
    description: "Sign up as a user or manager using email and password.",
    icon: <FaUserPlus size={28} className="text-white" />,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    title: "Explore Loans",
    description:
      "Browse available microloans with interest, EMI, and max limit info.",
    icon: <FaSearch size={28} className="text-white" />,
    color: "from-green-400 to-green-600",
  },
  {
    id: 3,
    title: "Apply for Loan",
    description:
      "Fill in personal & financial info to submit a loan application.",
    icon: <FaFileAlt size={28} className="text-white" />,
    color: "from-yellow-400 to-yellow-600",
  },
  {
    id: 4,
    title: "Manager Approval",
    description: "Loan officers review and approve/reject applications.",
    icon: <FaCheckCircle size={28} className="text-white" />,
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 5,
    title: "Receive Loan",
    description:
      "Loan is disbursed and EMI schedules are tracked automatically.",
    icon: <FaMoneyBillWave size={28} className="text-white" />,
    color: "from-pink-400 to-pink-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          How LoanLink Works
        </h2>
        {/* Subtitle */}
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16 text-base md:text-lg">
          A seamless process to apply, track, and receive loans with complete
          transparency and convenience. Follow these simple steps to get started
          quickly.
        </p>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center text-center md:w-1/5 px-5 py-5 bg-white rounded-3xl shadow-lg hover:shadow-2xl cursor-pointer transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              
            >
              {/* Icon */}
              <motion.div
                className={`w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br ${step.color} mb-4 shadow-xl `}
              
                animate={{ y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: index * 0.1,
                }}
              >
                {step.icon}
              </motion.div>

              {/* Step Title */}
              <h3 className="text-lg md:text-xl flex-1  font-semibold mb-2">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-gray-500  text-sm md:text-base">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
