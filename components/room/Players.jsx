import { LazyResult } from "postcss";
import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

const Players = ({ players }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      className="border border-black rounded overflow-hidden "
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
    >
      <div
        className={`p-2 flex bg-gray-100 justify-between border-black  ${
          isOpen ? "border-b" : ""
        }`}
      >
        <p>Players</p>
        {isOpen ? (
          <HiChevronUp className="self-center"></HiChevronUp>
        ) : (
          <HiChevronDown className="self-center"></HiChevronDown>
        )}
      </div>
      <div className={`px-4 bg-gray-200 ${isOpen ? "h-auto p-4" : "h-0"}`}>
        {players &&
          Object.values(players).map((player) => (
            <div
              key={player.nickname}
              className=""
              style={{ backgroundColor: player.color }}
            >
              {player.nickname}
            </div>
          ))}
      </div>
    </article>
  );
};

export default Players;
