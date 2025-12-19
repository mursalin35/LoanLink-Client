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
  const slidesPerView = Math.min(feedbacks.length, 3);

  return (
    <section className="py-24 ">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#1F4F45]"
        >
          What Our Customers Say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-[#6B7C75] text-lg"
        >
          Thousands of users trust LoanLink for fast, secure and transparent
          microloan processing.
        </motion.p>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        loop={enableLoop}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={slidesPerView}
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
        className="max-w-6xl mx-auto mySwiper"
        breakpoints={{
          520: { slidesPerView: 1 },
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
              <div className="rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm p-6 flex flex-col items-center text-center min-h-[380px] relative">
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 text-[#B6E04C]/20 w-10 h-10" />

                {/* Avatar */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 rounded-full border-4 border-[#6FBF73]/20 shadow-md mt-4"
                />

                {/* Name & Role */}
                <h3 className="text-xl font-semibold text-[#1C2B27] mt-4">
                  {item.name}
                </h3>
                <p className="text-[#6B7C75] text-sm">{item.role}</p>

                {/* Feedback Text */}
                <p className="text-[#1C2B27] mt-4 leading-relaxed text-center flex-1">
                  "{item.feedback}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-4">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-5 h-5 text-[#B6E04C] fill-[#B6E04C]"
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
