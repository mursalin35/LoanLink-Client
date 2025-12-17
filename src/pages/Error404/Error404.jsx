import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Home, CreditCard, HelpCircle } from "lucide-react";

const Error404 = () => {
const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#F6FBFA] overflow-hidden">

      {/* Background blobs */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-[#1F7A63]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 -right-40 w-[520px] h-[520px] bg-[#4FD1B2]/10 rounded-full blur-3xl"
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-xl text-center px-6"
      >
        {/* 404 */}
        <h1 className="text-[120px] font-extrabold text-[#1F7A63]/20 leading-none">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-2 text-3xl font-bold text-[#1C1C28]">
          This Page Took a Loan Break
        </h2>

        {/* Description */}
        <p className="mt-4 text-[#6B7280] leading-relaxed">
          Looks like the page you’re searching for isn’t available right now.
          But don’t worry — your financial journey with <strong>LoanLink</strong> is safe and secure.
        </p>

        {/* Suggestions */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#1F7A63]/10">
            <Home className="text-[#1F7A63] mb-2" />
            <p className="text-sm text-gray-600">
              Return to homepage and explore available loans.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#1F7A63]/10">
            <CreditCard className="text-[#1F7A63] mb-2" />
            <p className="text-sm text-gray-600">
              Browse verified micro-loan options tailored for you.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white shadow-sm border border-[#1F7A63]/10">
            <HelpCircle className="text-[#1F7A63] mb-2" />
            <p className="text-sm text-gray-600">
              Need help? Our support team is always ready.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            onClick={()=>navigate(-1)}
            className="px-6 py-3 rounded-xl bg-[#1F7A63] text-white font-medium hover:bg-[#176653] transition"
          >
            Go back
          </Link>
          <Link
            to="/"
            className="px-6 py-3 rounded-xl border border-[#1F7A63]/30 text-[#1F7A63] font-medium hover:bg-[#1F7A63]/5 transition"
          >
             Back to Home
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-12 text-xs text-[#9CA3AF]">
          © {new Date().getFullYear()} LoanLink — Smart. Secure. Simple Loans.
        </p>
      </motion.div>
    </section>
  );
};

export default Error404;
