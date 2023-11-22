import { Gameboard } from "./gameboard";

const Player = (playerOne = "Player 1", playerTwo = "Computer") => {
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

export { players, playerUnderAttack, changePlayer };

//Math.floor(Math.random()*10)
/*const player1 = Gameboard();
const player2 = Gameboard();
const players = [player1, player2];*/
