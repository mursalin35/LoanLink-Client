import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CustomerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("/feedback.json")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error(err));
  }, []);

  // Loop only if enough slides
  const enableLoop = feedbacks.length >= 3;

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#11121A]">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-16 px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F4F45] dark:text-[#E6F4F1]" // dark mode
        >
          What Our Customers Say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-[#6B7C75] dark:text-gray-300 text-base sm:text-lg" // dark mode
        >
          Thousands of users trust LoanLink for fast, secure and transparent microloan processing.
        </motion.p>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        key={feedbacks.length}
        loop={enableLoop}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        coverflowEffect={{
          rotate: 30,
          stretch: 40,
          depth: 100,
          modifier: 1,
          scale: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="max-w-6xl mx-auto mySwiper px-4 sm:px-0"
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {feedbacks.map((item, i) => (
          <SwiperSlide key={item.id || i}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              {/* Card */}
              <div className="rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-[#1C1C28]/80 backdrop-blur-sm p-6 sm:p-8 flex flex-col items-center text-center min-h-[380px] sm:min-h-[420px] relative">
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 text-[#B6E04C]/20 dark:text-[#B6E04C]/30 w-8 sm:w-10 h-8 sm:h-10" /> {/* dark mode */}

                {/* Avatar */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#6FBF73]/20 dark:border-[#6FBF73]/30 shadow-md mt-4" // dark mode
                />

                {/* Name & Role */}
                <h3 className="text-lg sm:text-xl font-semibold text-[#1C2B27] dark:text-[#E6F4F1] mt-4"> {/* dark mode */}
                  {item.name}
                </h3>
                <p className="text-[#6B7C75] dark:text-gray-300 text-sm sm:text-base"> {/* dark mode */}
                  {item.role}
                </p>

                {/* Feedback Text */}
                <p className="text-[#1C2B27] dark:text-[#E6F4F1] mt-4 leading-relaxed text-center flex-1 text-sm sm:text-base"> {/* dark mode */}
                  "{item.feedback}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-4">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#B6E04C] fill-[#B6E04C]"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomerFeedback;
