import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
// Using FaTwitter (which is typically the bird) but requested X logo. 
// Ideally I'd import specifically, but for now standard icons.
// Actually, react-icons/fa6 has FaXTwitter. I should check installed version.
// "react-icons": "^5.5.0" supports FaXTwitter.

import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
            <aside>
                <p className="text-2xl font-bold text-primary">LoanLink</p>
                <p>Reliable Microloan Provider.<br />Providing financial solutions since 2024.</p>
                <p>Copyright © 2025 - All right reserved</p>
            </aside>
            <nav>
                <header className="footer-title">Services</header>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <header className="footer-title">Company</header>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <header className="footer-title">Social</header>
                <div className="grid grid-flow-col gap-4">
                    <a className="text-xl curser-pointer"><FaXTwitter /></a>
                    <a className="text-xl curser-pointer"><FaFacebookF /></a>
                    <a className="text-xl curser-pointer"><FaLinkedinIn /></a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
