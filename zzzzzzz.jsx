import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";


const CustomerFeedback = () => {
   const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("/feedback.json")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900"
        >
          What Our <span className="text-primary">Customers Say</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg"
        >
          Thousands of users trust LoanLink for fast, secure and transparent
          microloan processing.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {feedbacks.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="h-full"
          >
            <div className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <div className="p-6 relative">
                {/* Quotation Icon */}
                <Quote className="absolute top-4 right-4 text-primary/20 w-10 h-10" />

                {/* Image */}
                <div className="flex flex-col items-center mt-2">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 rounded-full border-4 border-primary/10 shadow-md"
                  />

                  {/* Name & Role */}
                  <h3 className="text-xl font-semibold mt-4 text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.role}</p>

                  {/* Feedback Text */}
                  <p className="text-gray-700 mt-4 text-center leading-relaxed">
                    "{item.feedback}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-4">
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-5 h-5 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CustomerFeedback;
