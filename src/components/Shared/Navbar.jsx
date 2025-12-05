import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/all-loans">All Loans</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl font-bold flex items-center gap-2">
                    <span className="text-primary">Loan</span>Link
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <Link to="/login" className="btn btn-sm btn-outline btn-primary">Login</Link>
                <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
            </div>
        </div>
    );
};

export default Navbar;
