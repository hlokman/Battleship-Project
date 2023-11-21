import { Ship } from "./ship";

const Gameboard = (grid = 10) => {
  let board = [];
  let allShips = []; //To keep track of all the ships created

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
    let checkContent = check.every((item) => item === null);
    if (checkContent) {
      for (let i = 0; i < shipLength; i++) {
        board[line + i][column] = newShip;
      }
      allShips.push(newShip); //track
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
    let checkContent = check.every((item) => item === null);
    if (checkContent) {
      for (let i = 0; i < shipLength; i++) {
        board[line][column + i] = newShip;
      }
      allShips.push(newShip); //track
      check = [];
    } else {
      check = [];
      throw new Error("The ship touches another ship");
    }
  }

  function receiveAttack(line, column) {
    if (board[line][column] === null) {
      board[line][column] = false;
    } else if (board[line][column] === false) {
      throw new Error("This spot has already been hit ");
    } else {
    }
  }

  const getBoard = () => board;
  const getShips = () => allShips;

  return { getBoard, placeShipHorizontally, placeShipVertically, getShips };
};

export { Gameboard };
