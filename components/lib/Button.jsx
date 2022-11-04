import React from "react";

const sizes = {
  default: " px-4 py-2",
};

const Button = ({
  size = "default",
  stretch,
  onClick = () => {},
  children,
}) => {
  return (
    <button
      className={`bg-white border border-black rounded ${sizes[size]} ${
        stretch ? "w-full" : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
        console.log(onClick);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
