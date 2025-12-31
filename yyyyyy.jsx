import React from 'react';

const yyyyyy = () => {
  return (
   <div className="flex items-center gap-2">
  {/* Icon */}
  <img src={logo} alt="logo" className={`${imgSize} object-contain`} />

  {/* Text */}
  <span
    className={`
      ${textSize} font-bold tracking-wide
      text-[${loanColor}]
      dark:text-[#E6F4F1]
    `}
  >
    Loan
    <span className="text-[${linkColor}] dark:text-[#B6E04C]">
      Link
    </span>
  </span>
</div>

  );
};

export default yyyyyy;