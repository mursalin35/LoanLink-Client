import logo from "../assets/logo-1.png"

const Logo = () => {
  return (
    <div className="flex items-center gap-1 ">
      {/* Icon */}
    <img src={logo} alt="logo" className="max-h-10 max-w-10" />
      {/* Text */}
      <span className="text-3xl font-bold tracking-wide text-[#14532d] -ms-0.5">
        Loan<span className="text-[#22c55e]">Link</span>
      </span>
    </div>
  );
};

export default Logo;
