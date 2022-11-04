import React, { useEffect, useState } from "react";
// import { colorArray } from "../../utils/colorArray";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import Container from "../lib/Container";

const ColorPicker = ({ currentColor, onColorClick, player }) => {
  const [colors, setColors] = useState(undefined);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_HOST + "/colors")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.colors);
        setColors(data.colors);
      });
  }, []);

  return (
    colors && (
      <Container
        autoClose
        heading={
          <p
            style={{ backgroundColor: currentColor, color: "white" }}
            className=" px-2 py-1 font-bold"
          >
            {player.nickname}
          </p>
        }
      >
        {Object.keys(colors).map((color) => (
          <div
            key={color}
            className=" cursor-pointer px-2 py-1 text-white font-bold"
            style={{ backgroundColor: color }}
            onClick={() => onColorClick(color)}
          >
            {colors[color]}
          </div>
        ))}
      </Container>
    )
  );
};

export default ColorPicker;
