import { Gameboard } from "./gameboard";
import { gameboardUpdate } from "./renderBoard";

let check;

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

  //
  function playerTurn(line, column) {
    let result = playerUnderAttack.receiveAttack(line, column);
    changePlayer();
    check = result;

    if (result || result === null) {
      computerTurn();
      changePlayer();
      //gameboardUpdate(); to erase for loose coupling
    } else {
      changePlayer();
      //gameboardUpdate();
    }

    line = undefined;
    column = undefined;
    console.log(players[1].allShipsSunk());
  }
  //
  function computerTurn() {
    //To modify after to put setTimeout logic !!!
    let attackResult;
    do {
      attackResult = playerUnderAttack.receiveAttack(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        false
      );
    } while (attackResult === false);
  }

  const getPlayers = () => players;
  const getPlayerUnderAttack = () => playerUnderAttack;

  return { getPlayers, changePlayer, getPlayerUnderAttack, playerTurn };
};

export { Players, check };

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
