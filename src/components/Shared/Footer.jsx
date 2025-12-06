import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router";
import { MdOutlineMailOutline, MdPhoneCallback } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="relative mt-16 text-base-content overflow-hidden rounded-t-3xl shadow-lg">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4126ba] to-[#088781] opacity-90 blur-[1px]"></div>
      {/* Dark overlay balanced */}
      <div className="absolute inset-0 bg-white/20 dark:bg-[#0e0e10]/60 backdrop-blur-md"></div>

      {/* Content */}
      <div className="relative glass-card py-10 px-6 md:px-12 text-center md:text-left text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <img
                src="https://i.ibb.co.com/0yDRJgjJ/finans-logo.png"
                alt="FinEase Logo"
                className="bg-white/90 dark:bg-gray-100/80 rounded-xl h-10"
              />
            </div>
            <p className="text-sm text-gray-100/90 dark:text-gray-200 leading-relaxed">
              FinEase helps you manage your income, expenses, and savings goals
              — making personal finance simple, smart, and stress-free.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-teal-100 dark:text-teal-300">
              Quick Links
            </h3>
            <ul className="space-y-2 opacity-90">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/add-transaction" className="hover:underline">
                  Add Transaction
                </Link>
              </li>
              <li>
                <Link to="/my-transactions" className="hover:underline">
                  My Transactions
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:underline">
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-teal-100 dark:text-teal-300">
              Legal
            </h3>
            <ul className="space-y-2 opacity-90">
              <li className="hover:underline cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
              <li className="hover:underline cursor-pointer">Support</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-teal-100 dark:text-teal-300">
              Contact Us
            </h3>
            <p className="text-sm text-gray-100 dark:text-gray-200 mb-2 flex justify-center md:justify-start items-center gap-2">
              <MdOutlineMailOutline /> support@finease.com
            </p>
            <p className="text-sm text-gray-100 dark:text-gray-200 mb-3 flex justify-center md:justify-start items-center gap-2">
              <MdPhoneCallback /> +880 1700-00000
            </p>

            <div className="flex justify-center md:justify-start gap-3 mt-2">
              {[
                {
                  icon: <FaFacebookF />,
                  href: "https://www.facebook.com/mursalin07",
                },
                {
                  icon: <FaInstagram />,
                  href: "https://www.instagram.com/msmursalin07/?hl=en",
                },
                {
                  icon: <FaLinkedinIn />,
                  href: "https://www.linkedin.com/in/mursalin07/",
                },
                { icon: <FaGithub />, href: "https://github.com/mursalin35" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  className="p-2 rounded-full bg-white/10 dark:bg-white/15 hover:bg-white/25 hover:scale-110 transition transform text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/30 dark:border-white/20 mt-10 pt-5 text-sm text-gray-100/80 dark:text-gray-300 text-center">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">FinEase</span> — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
