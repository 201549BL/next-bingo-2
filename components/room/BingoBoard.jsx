import React from "react";
import { createClassString } from "../../utils/colorClassString";

const BingoBoard = ({ room, onItemClick }) => {
  return (
    <article className="flex flex-col min-h-0 border border-black overflow-hidden rounded ">
      <div className="border-b border-black p-2 bg-gray-100 flex justify-between">
        <p>Board</p>
        <div
          className="bg-white border border-black px-2 rounded overflow-hidden cursor-pointer"
          onClick={async () => {
            const response = await fetch(
              process.env.NEXT_PUBLIC_SERVER_HOST +
                `/update-room/${room.id}?event=hide-board`,
              { method: "POST", credentials: "include" }
            );
            const data = await response.json();
            console.log(data);
          }}
        >
          {room.isHidden ? "Show board" : "Hide board"}
        </div>
      </div>

      <div className=" flex h-full w-full relative transition-all ">
        <div
          className=" p-4 grid grid-rows-5 grid-cols-5 gap-1 text-sm aspect-square bg-gray-200 shrink-0 max-h-full w-full transition-all duration-500"
          style={
            room.isHidden
              ? {
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }
              : {
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0)",
                }
          }
        >
          {room.items.map((i, index) => {
            const classString =
              i.owners.length > 0
                ? createClassString(
                    i.owners.map(
                      (owner) => room.players[owner]?.color ?? "gray"
                    )
                  )
                : "";

            return (
              <div
                className=" flex justify-center items-center p-1"
                style={{
                  backgroundImage: classString,
                }}
                key={index}
                onClick={() => onItemClick(i)}
              >
                {i.content}
              </div>
            );
          })}
        </div>
        <div
          className="absolute inset-0 bg-yellow-300 flex justify-center items-center transition-all duration-500"
          style={
            room.isHidden
              ? {
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0)",
                }
              : {
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }
          }
        >
          <img
            loading="lazy"
            className="max-h-full"
            src="https://media.giphy.com/media/jWexOOlYe241y/giphy.gif"
            alt="john travolta lost gif"
          />
        </div>
      </div>
    </article>
  );
};

export default BingoBoard;
