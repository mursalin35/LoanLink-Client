 const navLinksBeforeLogin = (
    <>
      <NavLink to="/" className="nav-item">Home</NavLink>
      <NavLink to="/all-loans" className="nav-item">All-Loans</NavLink>
      <NavLink to="/about" className="nav-item">About Us</NavLink>
      <NavLink to="/contact" className="nav-item">Contact</NavLink>
      <NavLink to="/auth/login" className="nav-item">Login</NavLink>
      <NavLink to="/auth/register" className="nav-item">Register</NavLink>
      <button className="px-3 py-1 border rounded-md">Theme</button>
    </>
  );

  const navLinksAfterLogin = (
    <>
      <NavLink to="/" className="nav-item">Home</NavLink>
      <NavLink to="/all-loans" className="nav-item">All-Loans</NavLink>
      <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
      <img src={user?.photoURL} alt="avatar" className="w-10 h-10 rounded-full border" />
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </>
  );
