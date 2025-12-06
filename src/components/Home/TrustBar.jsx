import { motion } from "framer-motion";
import { ShieldCheck, Users, Award, Zap } from "lucide-react";

export default function TrustBar() {
  const items = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Bank-Level Security",
      desc: "Your personal and financial data is always encrypted.",
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "40,000+ Active Users",
      desc: "Growing community trusting LoanLink every day.",
    },
    {
      icon: <Award className="w-10 h-10 text-primary" />,
      title: "Top Rated Platform",
      desc: "Recognized for reliability, speed & transparency.",
    },
    {
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: "Lightning-Fast Approval",
      desc: "Your loan gets processed in minutes, not hours.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-100/10 to-primary/10 blur-3xl opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ scale: 1.05, y: -6 }}
            className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-lg rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-2xl hover:bg-white/70"
          >
            {/* Icon Wrapper */}
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="w-20 h-20 flex items-center justify-center rounded-2xl bg-primary/10 mx-auto shadow-inner"
            >
              {item.icon}
            </motion.div>

            {/* Title */}
            <h3 className="mt-6 text-xl font-bold text-gray-900">
              {item.title}
            </h3>

            {/* Line Divider */}
            <div className="mt-3 mb-3 w-12 h-[3px] bg-primary/60 mx-auto rounded-full"></div>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}



// export default TrustBar;