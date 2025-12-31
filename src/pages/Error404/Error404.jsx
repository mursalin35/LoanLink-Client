import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Home, CreditCard, HelpCircle } from "lucide-react";

const Error404 = () => {
  const navigate = useNavigate();

  return (
   <section
  className="relative min-h-screen flex items-center justify-center
             bg-[#5dac9c]/12 dark:bg-[#0f1f1c] overflow-hidden" // dark bg
>
  <title>Error 404</title>

  {/* Background blobs */}
  <motion.div
    animate={{ y: [0, 20, 0] }}
    transition={{ duration: 8, repeat: Infinity }}
    className="absolute -top-40 -left-40 w-96 h-96 bg-[#1F7A63]/10 dark:bg-[#1F7A63]/20 rounded-full blur-3xl"
  />
 

  {/* Main Card */}
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="relative z-10 max-w-xl text-center px-6"
  >
    {/* 404 */}
    <h1 className="text-[120px] font-extrabold text-[#1F7A63]/40 dark:text-[#1F7A63] leading-none">
      404
    </h1>

    {/* Title */}
    <h2 className="mt-2 text-3xl font-bold text-[#1C1C28] dark:text-gray-100">
      This Page Took a Loan Break
    </h2>

    {/* Description */}
    <p className="mt-4 text-[#6B7280] dark:text-gray-300 leading-relaxed">
      Looks like the page you’re searching for isn’t available right now.
      But don’t worry — your financial journey with{" "}
      <strong>LoanLink</strong> is safe and secure.
    </p>

    {/* Suggestions */}
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
      <div className="p-4 rounded-xl bg-white dark:bg-[#132e2a] shadow-sm border border-[#1F7A63]/10">
        <Home className="text-[#1F7A63] mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Return to homepage and explore available loans.
        </p>
      </div>
      <div className="p-4 rounded-xl bg-white dark:bg-[#132e2a] shadow-sm border border-[#1F7A63]/10">
        <CreditCard className="text-[#1F7A63] mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Browse verified micro-loan options tailored for you.
        </p>
      </div>
      <div className="p-4 rounded-xl bg-white dark:bg-[#132e2a] shadow-sm border border-[#1F7A63]/10">
        <HelpCircle className="text-[#1F7A63] mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Need help? Our support team is always ready.
        </p>
      </div>
    </div>

    {/* CTA Buttons */}
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="px-6 py-3 rounded-xl bg-[#1F7A63] dark:bg-[#176653] text-white font-medium hover:bg-[#176653] transition"
      >
        Go back
      </Link>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl border border-[#1F7A63]/30 dark:border-[#4FD1B2]/50 text-[#1F7A63] dark:text-[#4FD1B2] font-medium hover:bg-[#1F7A63]/5 dark:hover:bg-[#4FD1B2]/10 transition"
      >
        Back to Home
      </Link>
    </div>

    {/* Footer note */}
    <p className="mt-12 text-xs text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} LoanLink — Smart. Secure. Simple Loans.
    </p>
  </motion.div>
</section>

  );
};

export default Error404;
