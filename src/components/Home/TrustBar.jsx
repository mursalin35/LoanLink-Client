import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Award, Zap } from "lucide-react";

const TrustBar = () => {
  const items = [
    {
      icon: ShieldCheck,
      title: "Bank-Grade Security",
      desc: "Advanced encryption keeps your financial data safe at all times.",
    },
    {
      icon: Users,
      title: "40,000+ Users",
      desc: "A rapidly growing community trusting LoanLink every day.",
    },
    {
      icon: Award,
      title: "Reliable Platform",
      desc: "Built with transparency, performance, and long-term trust.",
    },
    {
      icon: Zap,
      title: "Instant Processing",
      desc: "Loan approvals handled efficiently within minutes.",
    },
  ];

  return (
    <section className="py-20 bg-[#F3FBF9] dark:bg-[#11121A]"> {/* dark mode bg */}
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C28] dark:text-[#E6F4F1]"> {/* dark mode text */}
            Trusted by Thousands
          </h2>
          <p className="mt-4 text-[#5F6C72] dark:text-gray-300 mx-auto text-base"> {/* dark mode text */}
            LoanLink delivers a secure, fast, and transparent micro-loan
            experience designed for real people.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(31, 122, 99, 0.12)",
                }}
                className="group bg-white dark:bg-[#1C1C28] border border-[#DFF1EC] dark:border-[#2C2C38] rounded-2xl p-7 transition-all duration-300" 
                /* dark mode card bg + border */
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#E8FAF7] dark:bg-[#232634] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#1F7A63]">
                  <Icon className="w-7 h-7 text-[#1F7A63] dark:text-[#B6E04C] transition-colors duration-300 group-hover:text-white" /> {/* dark mode icon */}
                </div>

                {/* Content */}
                <h3 className="mt-6 text-lg font-semibold text-[#1C1C28] dark:text-[#E6F4F1]"> {/* dark mode text */}
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-[#5F6C72] dark:text-gray-400 leading-relaxed"> {/* dark mode text */}
                  {item.desc}
                </p>

                {/* Accent Line */}
                <div className="mt-5 h-[3px] w-10 rounded-full bg-[#4FD1B2] dark:bg-[#6FBF73] opacity-70 group-hover:w-16 transition-all duration-300"></div> {/* dark mode line */}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
