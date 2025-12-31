import { motion } from "framer-motion";
import { Link } from "react-router";

export default function About() {
  return (
  <div className="bg-[#F4F7F5] dark:bg-[#11121A] text-[#1C2B27] dark:text-[#E6F4F1]">
  <title>About Us</title>

  {/* HERO SECTION */}
  <section className="bg-gradient-to-br from-[#1F4F45] to-[#2E6A5F] text-white">
    <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About LoanLink
        </h1>
        <p className="text-lg text-gray-200 mb-8">
          LoanLink is a full-stack microloan request, review, approval, and
          tracking platform built to modernize how small financial organizations
          manage lending operations. We focus on transparency, security, and
          operational efficiency across the entire loan lifecycle.
        </p>
        <div className="flex gap-4">
          <Link
            to="/all-loans"
            className="px-6 py-3 rounded-xl bg-[#B6E04C] text-[#1F4F45] font-semibold hover:opacity-90"
          >
            Explore Loans
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl border border-white hover:bg-white hover:text-[#1F4F45]"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
          alt="Finance discussion"
          className="rounded-2xl shadow-xl"
        />
      </motion.div>
    </div>
  </section>

  {/* WHO WE ARE */}
  <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="text-3xl font-bold mb-4 text-[#1F4F45] dark:text-[#B6E04C]">
        {/* dark mode */}
        Who We Are
      </h2>
      <p className="text-[#6B7C75] dark:text-gray-300 leading-relaxed">
        {/* dark mode */}
        LoanLink is designed for NGOs, microfinance institutions, and small loan
        providers who want to move away from spreadsheets, manual approvals, and
        fragmented systems. Our platform centralizes loan requests,
        verification, approvals, application fees, and status tracking into one
        secure digital workflow.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-6">
      {[
        "End-to-End Loan Lifecycle",
        "Admin, Manager & Borrower Dashboards",
        "Stripe-Powered Secure Payments",
        "Real-Time Application Status",
      ].map((item) => (
        <div
          key={item}
          className="bg-white dark:bg-[#1C1C28] rounded-2xl p-6 shadow"
          // dark mode
        >
          <p className="font-semibold text-[#1F4F45] dark:text-[#E6F4F1]">
            {/* dark mode */}
            {item}
          </p>
        </div>
      ))}
    </div>
  </section>

  {/* MISSION & VISION */}
  <section className="bg-white dark:bg-[#0F1017]">
    {/* dark mode */}
    <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
      <div className="rounded-2xl p-8 bg-[#F4F7F5] dark:bg-[#1C1C28]">
        {/* dark mode */}
        <h3 className="text-2xl font-bold mb-3 text-[#1F4F45] dark:text-[#B6E04C]">
          Our Mission
        </h3>
        <p className="text-[#6B7C75] dark:text-gray-300">
          {/* dark mode */}
          To simplify micro-lending by providing a secure, transparent, and
          scalable system that reduces operational friction while building trust
          between borrowers and loan providers.
        </p>
      </div>

      <div className="rounded-2xl p-8 bg-[#F4F7F5] dark:bg-[#1C1C28]">
        {/* dark mode */}
        <h3 className="text-2xl font-bold mb-3 text-[#1F4F45] dark:text-[#B6E04C]">
          Our Vision
        </h3>
        <p className="text-[#6B7C75] dark:text-gray-300">
          {/* dark mode */}
          To become a trusted digital backbone for microfinance organizations by
          setting a new standard for transparency, accountability, and
          user-centric financial technology.
        </p>
      </div>
    </div>
  </section>

  {/* WHY CHOOSE US */}
  <section className="max-w-7xl mx-auto px-6 py-20">
    <h2 className="text-3xl font-bold text-center mb-12 text-[#1F4F45] dark:text-[#B6E04C]">
      {/* dark mode */}
      What LoanLink Does — And What It Doesn’t
    </h2>

    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
      {[
        "Manages loan requests, reviews & approvals",
        "Tracks loan status & EMI plans",
        "Collects fixed application fees securely",
        "Provides role-based dashboards",
      ].map((item) => (
        <div
          key={item}
          className="bg-white dark:bg-[#1C1C28] p-6 rounded-2xl shadow hover:shadow-lg transition"
          // dark mode
        >
          <p className="font-semibold dark:text-[#E6F4F1]">
            {/* dark mode */}
            {item}
          </p>
        </div>
      ))}
    </div>
  </section>
</div>

  );
}
