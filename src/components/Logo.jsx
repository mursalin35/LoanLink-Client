import logo from "../assets/logo-1.png";

const Logo = ({
  imgSize = "h-9 w-9",
  textSize = "text-3xl",
  loanColor = "#14532d",
  linkColor = "#22c55e",
}) => {
  return (
    <div className="flex items-center gap-2">
      {/* Icon */}
      <img src={logo} alt="logo" className={`${imgSize} object-contain`} />

      {/* Text */}
      <div
        className={`${textSize} font-bold tracking-wide`}
        style={{ color: loanColor }}
      >
        Loan
        <span style={{ color: linkColor }}>Link</span>
      </div>
    </div>
  );
};

export default Logo;
