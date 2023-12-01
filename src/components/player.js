import { Gameboard } from "./gameboard";
import { gameboardUpdate } from "./renderBoardAndMessages";

let check;
let checkPositions;

const Players = (playerOne = "Player", playerTwo = "Computer") => {
  const player1 = Gameboard();
  player1.name = "Player";
  const player2 = Gameboard();
  player2.name = "Computer";

  const players = [player1, player2];

  let playerUnderAttack = players[1];
  function changePlayer() {
    playerUnderAttack =
      playerUnderAttack === players[1] ? players[0] : players[1];
  }

  //PLAYER AND COMPUTER ATTACKING LOGICS
  function playerTurn(line, column) {
    check = players[1].receiveAttack(line, column);
    return check;
    //console.log("receive==  " + players[1].receiveAttack(line, column));
    /*let result = playerUnderAttack.receiveAttack(line, column);
    changePlayer();
    check = result;

    if (result || result === null) {
      computerTurn();
    }
    changePlayer();*/
  }

  function computerTurn() {
    let attackResult;
    do {
      attackResult = players[0].receiveAttack(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        false
      );
    } while (attackResult === false);
  }

  //PLAYER AND COMPUTER PLACING SHIPS (Horizontally + Vertically)
  //---Horizontal
  function playerShipPlacementH(line, column, length) {
    let result = players[0].placeShipHorizontally(line, column, length);
    checkPositions = result;

    //console.log("result:   " + result);
    if (result === true) {
      computerShipPlacementH(length);
    }
  }

  function computerShipPlacementH(chosenLength) {
    let placeResult;

    do {
      placeResult = players[1].placeShipHorizontally(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        chosenLength
      );
      //console.log("placeResult:   " + placeResult);
    } while (placeResult === false || placeResult === null);
  }
  //---Vertical
  function playerShipPlacementV(line, column, length) {
    let result = players[0].placeShipVertically(line, column, length);
    checkPositions = result;

    console.log("result:   " + result);
    if (result === true) {
      computerShipPlacementV(length);
    }
  }

  function computerShipPlacementV(chosenLength) {
    let placeResult;
    do {
      placeResult = players[1].placeShipVertically(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        chosenLength
      );
    } while (placeResult === false || placeResult === null);
  }

  const getPlayers = () => players;
  const getPlayerUnderAttack = () => playerUnderAttack;

  return {
    getPlayers,
    changePlayer,
    getPlayerUnderAttack,
    playerTurn,
    computerTurn,
    playerShipPlacementH,
    playerShipPlacementV,
  };
};

export { Players, check, checkPositions };

//Math.floor(Math.random()*10)
/*const player1 = Gameboard();
const player2 = Gameboard();
const players = [player1, player2];*/

/*
const Player = (playerOne = "Player", playerTwo = "Computer") => {
  const player1 = Gameboard();
  player1.name = playerOne;

  const player2 = Gameboard();
  player2.name = playerTwo;

  return [player1, player2];
};

const players = Player();
let playerUnderAttack = players[0];

function changePlayer() {
  playerUnderAttack =
    playerUnderAttack === players[0] ? players[1] : players[0];
  console.log(playerUnderAttack.name);
}
*/
