import React from "react";

const Spinner = ({ text = "Preparing your dashboard..." }) => {
  return (
    <div className="flex items-center justify-center backdrop-blur-md">
  {/* Card */}
  <div
    className="
      relative flex flex-col items-center gap-6 px-10 py-12 rounded-3xl
      bg-transparent
    "
  >
    {/* Spinner */}
    <div className="relative w-20 h-20">
      {/* outer ring */}
      <div className="absolute inset-0 rounded-full border-[6px] border-[#E0E7E2] "></div>
      {/* spinning ring */}
      <div className="absolute inset-0 rounded-full border-[6px]
        border-t-[#1F4F45] dark:border-t-[#1f3f35]
        border-r-[#6FBF73] dark:border-r-[#B6E04C]
        border-b-[#B6E04C] dark:border-b-[#6FBF73]
        border-l-transparent animate-spin">
      </div>
    </div>

    {/* Text */}
    <div className="text-center">
      <h2 className="text-xl font-semibold text-[#1C2B27] dark:text-[#EAF3F1] tracking-wide">
        Loading
      </h2>
      <p className="text-sm text-[#6B7C75] dark:text-[#9FB8B1] mt-1">
        {text}
      </p>
    </div>

    {/* Progress Dots */}
    <div className="flex gap-2">
      <span className="w-3 h-3 rounded-full bg-[#1F4F45] dark:bg-[#6FBF73] animate-bounce [animation-delay:0ms]"></span>
      <span className="w-3 h-3 rounded-full bg-[#6FBF73] dark:bg-[#B6E04C] animate-bounce [animation-delay:150ms]"></span>
      <span className="w-3 h-3 rounded-full bg-[#B6E04C] dark:bg-[#6FBF73] animate-bounce [animation-delay:300ms]"></span>
    </div>
  </div>
</div>

  );
};

export default Spinner;


