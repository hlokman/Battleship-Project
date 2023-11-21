import { Ship } from "./ship";

const Gameboard = (grid = 10) => {
  let board = [];

  for (let i = 0; i < grid; i++) {
    let line = new Array(grid).fill(null);
    board.push(line);
  }

  function placeShipVertically(line, column, shipLength) {
    if (
      line < 0 ||
      line > grid - 1 ||
      line + shipLength > grid ||
      column < 0 ||
      column > grid - 1
    ) {
      throw new Error("The ship goes beyond the limits");
    }
    let newShip = Ship(shipLength);
    //A system to check if all value = null before placing the ship
    let check = [];
    for (let i = 0; i < shipLength; i++) {
      check.push(board[line + i][column]);
    }
    if (!check.includes("ship")) {
      for (let i = 0; i < shipLength; i++) {
        board[line + i][column] = "ship";
      }
      check = [];
    } else {
      check = [];
      throw new Error("The ship touches another ship");
    }
  }

  function placeShipHorizontally(line, column, shipLength) {
    if (
      line < 0 ||
      line > grid - 1 ||
      column + shipLength > grid ||
      column < 0 ||
      column > grid - 1
    ) {
      throw new Error("The ship goes beyond the limits");
    }
    let newShip = Ship(shipLength);
    //A system to check if all value = null before placing the ship
    let check = [];
    for (let i = 0; i < shipLength; i++) {
      check.push(board[line][column + i]);
    }
    if (!check.includes("ship")) {
      for (let i = 0; i < shipLength; i++) {
        board[line][column + i] = "ship";
      }
      check = [];
    } else {
      check = [];
      throw new Error("The ship touches another ship");
    }
  }

  const getBoard = () => board;

  return { getBoard, placeShipHorizontally, placeShipVertically };
};

export { Gameboard };
