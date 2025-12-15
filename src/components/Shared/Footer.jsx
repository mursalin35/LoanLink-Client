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
    <footer className="relative mt-16 overflow-hidden rounded-t-3xl shadow-lg">
      {/* Gradient Background (LoanLink Theme) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1F4F45] to-[#2E6A5F] opacity-95"></div>
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative py-12 px-6 md:px-12 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <h2 className="text-2xl font-bold">LoanLink</h2>
            </div>
            <p className="text-sm text-gray-100/90 leading-relaxed">
              LoanLink is a secure microloan request, review, and approval
              management platform built to streamline lending operations and
              ensure transparency across the entire loan lifecycle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#B6E04C]">
              Quick Links
            </h3>
            <ul className="space-y-2 opacity-90">
              <li>
                <Link to="/" className="hover:text-[#B6E04C]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/all-loans" className="hover:text-[#B6E04C]">
                  All Loans
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#B6E04C]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#B6E04C]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#B6E04C]">Legal</h3>
            <ul className="space-y-2 opacity-90">
              <li className="">
                Terms & Conditions
              </li>
              <li className="">Privacy Policy</li>
              <li className="">Support</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#B6E04C]">
              Contact Us
            </h3>
            <p className="text-sm text-gray-100 mb-2 flex  items-center gap-2">
              <MdOutlineMailOutline /> support@loanlink.com
            </p>
            <p className="text-sm text-gray-100 mb-3 flex  items-center gap-2">
              <MdPhoneCallback /> +880 1700-000000
            </p>

            <div className="flex  gap-3 mt-2">
              {[
                { icon: <FaFacebookF />, href: "https://www.facebook.com/mursalin07" },
                { icon: <FaInstagram />, href: "https://www.instagram.com/msmursalin07/?hl=en" },
                { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/mursalin07/" },
                { icon: <FaGithub />, href: "https://github.com/mursalin35" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  className="p-2 rounded-full bg-white/10 hover:bg-[#B6E04C] hover:text-[#1F4F45] transition transform hover:scale-110"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/30 mt-10 pt-8 text-sm text-gray-100/80      flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="md:flex gap-1">
            <p className="text-center">© {new Date().getFullYear()} LoanLink. </p>
            <p> All rights reserved by M.S Mursalin.</p>
          </div>
          <p>Built for transparent & secure micro‑lending solutions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

  