// src/components/Home/Hero.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => (
  <section className="bg-gradient-to-r from-blue-50 to-white py-20">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <h1 className="text-4xl md:text-5xl font-bold">LoanLink — Fast & Secure Microloans</h1>
        <p className="mt-4 text-gray-600">Apply quickly, get verified, repay easily with transparent EMI plans.</p>
        <div className="mt-6 flex gap-4">
          <Link to="/all-loans" className="btn btn-primary">Explore Loans</Link>
          <Link to="/register" className="btn btn-outline">Apply for Loan</Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2"
      >
        <img src="https://s31898.pcdn.co/wp-content/uploads/2022/06/HOME-LOAN-HIKE1200X800-e1655099511258.jpg" alt="Loan" className="w-full" />
      </motion.div>
    </div>
  </section>
);
export default Hero;
