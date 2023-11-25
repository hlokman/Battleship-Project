import { Ship } from "./ship";

const Gameboard = (grid = 10) => {
  let board = [];
  let allShips = []; //To keep track of all the ships created

  for (let i = 0; i < grid; i++) {
    let line = new Array(grid).fill(null);
    board.push(line);
  }
  //All the functions below interact with board(/getBoard())
  //=> .getLength(), .getHits(), .hit() & .isSunk() are from Ship factory and so we have to target a specific ship from the board(/getBoard()) to use them
  //=> receiveAttack(line, column) target a specific ship and call .hit() function
  function placeShipVertically(line, column, shipLength, showAlert = true) {
    if (
      line < 0 ||
      line > grid - 1 ||
      line + shipLength > grid ||
      column < 0 ||
      column > grid - 1
    ) {
      if (showAlert) {
        alert("The ship goes beyond the limits"); //if the AI plays: set showAlert to false
      }
      return false;
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
      if (showAlert) {
        alert("The ship touches another ship"); //if the AI plays: set showAlert to false
      }
      return false;
    }
  }

  function placeShipHorizontally(line, column, shipLength, showAlert = true) {
    if (
      line < 0 ||
      line > grid - 1 ||
      column + shipLength > grid ||
      column < 0 ||
      column > grid - 1
    ) {
      if (showAlert) {
        alert("The ship goes beyond the limits"); //if the AI plays: set showAlert to false
      }
      return false;
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
      if (showAlert) {
        alert("The ship touches another ship"); //if the AI plays: set showAlert to false
      }
      return false;
    }
  }

  function receiveAttack(line, column, showAlert = true) {
    if (board[line][column] === null) {
      board[line][column] = false;
      //return "Oops.. nothing has been hit"; RETURN STATEMENT TO BE CHANGED if you want the loop te go to 6 (or change the loop)
      console.log("Oops.. nothing has been hit");
      return true;
    } else if (board[line][column] === false || board[line][column] === "hit") {
      if (showAlert) {
        alert("This spot has already been hit "); //if the AI plays: set showAlert to false
      }
      return false;
    } else if (board[line][column] && typeof board[line][column] === "object") {
      //if it is an object different from null
      board[line][column].hit();
      board[line][column] = "hit";
      //return "A ship has been hit!"; RETURN STATEMENT TO BE CHANGED if you want the loop te go to 6 (or change the loop)
      console.log("A ship has been hit!");
      return true;
    }
  }

  function allShipsSunk() {
    return allShips.every((item) => item.isSunk() === true);
  }

  const getBoard = () => board;
  const getShips = () => allShips;

  return {
    getBoard,
    placeShipHorizontally,
    placeShipVertically,
    receiveAttack,
    getShips,
    allShipsSunk,
  };
};

export { Gameboard };
