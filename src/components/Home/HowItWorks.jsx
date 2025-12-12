import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  if (inView) controls.start("visible");

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          How LoanLink Works
        </h2>

        <div
          ref={ref}
          className="relative flex flex-col md:flex-row items-center md:justify-between"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center text-center md:w-1/5 mb-20 md:mb-0 relative"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.3 },
                },
              }}
            >
              {/* Animated Connector */}
              {index !== steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-8 right-[-50%] w-full h-1 bg-gradient-to-r from-gray-300 to-gray-300 z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  style={{ transformOrigin: "left" }}
                ></motion.div>
              )}

              {/* Step Icon with Bounce */}
              <motion.div
                className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${step.color} mb-4 shadow-xl cursor-pointer`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: index * 0.3,
                }}
              >
                {step.icon}
              </motion.div>

              {/* Step Title */}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

              {/* Step Description */}
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
