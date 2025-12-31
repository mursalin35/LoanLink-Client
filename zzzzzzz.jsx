  <div className="min-h-screen  bg-gray-50 text-gray-700 font-sans">
      <title>Contact</title>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#004d40] to-[#00695c] text-white h-64 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl pt-7 font-bold"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Have questions or need support? Our team is here to assist you.
        </motion.p>
      </section>

      {/* Contact Info + Form */}
      <section className="max-w-6xl mx-auto px-6 md:px-0 -mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {[
            {
              title: "Office Address",
              content: "123 LoanLink Street, Dhaka, Bangladesh",
            },
            {
              title: "Email & Phone",
              content: "Email: support@loanlink.com\nPhone: +880 1234 567890",
            },
            {
              title: "Working Hours",
              content: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 2:00 PM",
            },
          ].map((info, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl shadow-lg bg-white border-l-4 border-[#8bc34a]"
            >
              <h3 className="text-xl font-semibold text-[#004d40] mb-2">
                {info.title}
              </h3>
              <p className="whitespace-pre-line">{info.content}</p>
            </div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-2xl space-y-5 border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-[#004d40] mb-4">
            Send a Message
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered pl-3 w-full rounded-lg bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#8bc34a] focus:border-[#004d40]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered pl-3 w-full rounded-lg bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#8bc34a] focus:border-[#004d40]"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="input input-bordered pl-3 w-full rounded-lg bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#8bc34a] focus:border-[#004d40]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            className="textarea textarea-bordered pl-3 pt-1 w-full rounded-lg bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#8bc34a] focus:border-[#004d40]"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#8bc34a] hover:bg-lime-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
          >
            Send Message
          </button>
        </motion.form>
      </section>

      {/* Map Section */}
      <section className="mt-20 px-6 md:px-0 max-w-6xl mx-auto">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#004d40] mb-6 text-center"
        >
          Our Location
        </motion.h3>
        <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          <iframe
            title="LoanLink Office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902619573973!2d90.39125451543141!3d23.75090338459044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf0d1aa06b17%3A0x7e22aa1dc63aa87a!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>  