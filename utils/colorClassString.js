export const createClassString = (arrOfColors) => {
  let divided = Math.floor(100 / arrOfColors.length);

  let gradientStops = [];
  for (let i = 0; i <= arrOfColors.length; i++) {
    gradientStops.push(divided * i);
  }

  let result = "linear-gradient(135deg,";

  result += arrOfColors
    .map(
      (value, index) =>
        `${arrOfColors[index]} ${gradientStops[index]}%, ${
          arrOfColors[index]
        } ${gradientStops[index + 1]}%,`
    )
    .join("")
    .slice(0, -1);

  result += ")";

  return result;
};
