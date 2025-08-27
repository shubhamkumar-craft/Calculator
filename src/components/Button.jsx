import React from "react";

const Button = ({ value, onClick, className = "" }) => {
  return (
    <button
      className={`py-4 text-lg sm:text-xl rounded-xl shadow-md bg-gray-800 text-white hover:bg-gray-700 active:scale-95 transition w-full ${className}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default Button;
