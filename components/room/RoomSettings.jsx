import React from "react";
import Button from "../lib/Button";
import Container from "../lib/Container";

const RoomSettings = ({ onGenerateNewBoardClick }) => {
  console.log("777777777", onGenerateNewBoardClick);

  return (
    <Container autoClose heading="Settings">
      <Button stretch onClick={onGenerateNewBoardClick}>
        Generate new board
      </Button>
    </Container>
  );
};

export default RoomSettings;
