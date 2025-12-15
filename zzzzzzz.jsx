// Contact.jsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    toast.success("Message Sent Successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#004d40] to-[#00695c] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">Contact Us</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Have questions or need support? Our team is here to assist you promptly.
        </p>
      </section>

      {/* Contact Form & Info */}
      <section className="max-w-6xl mx-auto px-6 md:px-0 -mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-[#e8f5e9] to-[#f1f8f6]">
            <h3 className="text-xl font-semibold mb-2 text-[#004d40]">Office Address</h3>
            <p>123 LoanLink Street, Dhaka, Bangladesh</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-[#e8f5e9] to-[#f1f8f6]">
            <h3 className="text-xl font-semibold mb-2 text-[#004d40]">Email & Phone</h3>
            <p>Email: support@loanlink.com</p>
            <p>Phone: +880 1234 567890</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-[#e8f5e9] to-[#f1f8f6]">
            <h3 className="text-xl font-semibold mb-2 text-[#004d40]">Working Hours</h3>
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p>Sat: 10:00 AM - 2:00 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-2xl space-y-5 border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-[#004d40] mb-4">Send a Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full rounded-lg bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#8bc34a] focus:border-[#004d40]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full rounded-lg bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#8bc34a] focus:border-[#004d40]"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="input input-bordered w-full rounded-lg bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#8bc34a] focus:border-[#004d40]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            className="textarea textarea-bordered w-full rounded-lg bg-gray-50 border-gray-300 focus:ring-2 focus:ring-[#8bc34a] focus:border-[#004d40]"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#8bc34a] hover:bg-lime-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Map Section */}
      <section className="mt-20 px-6 md:px-0">
        <h3 className="text-2xl font-bold text-[#004d40] mb-6 text-center">Our Location</h3>
        <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl border border-gray-200">
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
  );
};

export default Contact;
