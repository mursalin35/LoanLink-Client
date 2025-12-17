// Spinner.jsx
import React from "react";

const Spinner = ({ size = "12", color = "green-500" }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={`w-${size} h-${size} rounded-full border-4 border-t-transparent animate-spin`}
        style={{
          borderColor: `${color} ${color} #B6E04C ${color}`,
          boxShadow: `0 0 6px ${color}`,
        }}
      ></div>
    </div>
  );
};

export default Spinner;
