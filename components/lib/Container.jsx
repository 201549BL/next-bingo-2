import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

const Container = ({ heading, autoClose, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      className="border border-black rounded overflow-hidden "
      onMouseLeave={autoClose ? () => setIsOpen(false) : undefined}
    >
      <div
        onClick={(e) => {
          setIsOpen((prev) => !prev);
        }}
        className={`p-2 flex bg-gray-100 justify-between border-black  ${
          isOpen ? "border-b" : ""
        }`}
      >
        <p>{heading}</p>
        {isOpen ? (
          <HiChevronUp className="self-center"></HiChevronUp>
        ) : (
          <HiChevronDown className="self-center"></HiChevronDown>
        )}
      </div>
      <div className={`px-4 bg-gray-200 ${isOpen ? "h-auto p-4" : "h-0"}`}>
        {children}
      </div>
    </article>
  );
};

export default Container;
