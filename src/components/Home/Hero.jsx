import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="bg-[#E8FAF7] dark:bg-[#11121A] relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

    {/* LEFT CONTENT */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-white dark:bg-[#1C1C28] text-[#1F7A63] dark:text-[#B6E04C] font-medium"
      >
        Secure • Transparent • Reliable
      </motion.span>

      <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#1C1C28] dark:text-[#E6F4F1]">
        Smart Microloans <br />
        for a <span className="text-[#1F7A63] dark:text-[#B6E04C]">Better Tomorrow</span>
      </h1>

      <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-xl">
        LoanLink is a modern microloan management platform that connects
        borrowers and managers through a transparent and secure system.
        Apply for loans, track approvals, and manage repayments — all in
        one trusted place.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex gap-4"
      >
        <Link
          to="/all-loans"
          className="px-6 py-3 rounded-xl bg-[#1F7A63] dark:bg-[#6FBF73] text-white dark:text-[#1C2B27] font-medium hover:opacity-90 transition"
        >
          Get Started
        </Link>

        <Link
          to="/about"
          className="px-6 py-3 rounded-xl border border-[#1F7A63] dark:border-[#6FBF73] text-[#1F7A63] dark:text-[#B6E04C] font-medium hover:bg-[#1F7A63]/10 dark:hover:bg-[#6FBF73]/20 transition"
        >
          Learn More
        </Link>
      </motion.div>
    </motion.div>

    {/* RIGHT IMAGE */}
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="flex justify-center"
    >
      <div className="bg-gradient-to-br from-[#ccf1e5] to-[#43a188] dark:from-[#0E2B23] dark:to-[#165047] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-800">
        <img
          src="https://png.pngtree.com/png-vector/20220615/ourmid/pngtree-mortgage-loan-debt-instruments-that-are-secured-by-property-assets-such-png-image_5085800.png"
          alt="Loan management illustration"
          className="w-full max-w-md"
        />
      </div>
    </motion.div>
  </div>
</section>

  );
};

export default Hero;
