import { Players } from "./player";
import { gameboardUpdate, playerWins, computerWins } from "./renderBoard";

const players = Players();
players.changePlayer();
players.getPlayers()[0].placeShipHorizontally(5, 4, 4);
players.getPlayers()[0].placeShipHorizontally(7, 4, 4);
players.getPlayers()[0].placeShipHorizontally(9, 4, 4);
players.getPlayers()[0].placeShipVertically(1, 1, 1);
players.getPlayers()[0].placeShipVertically(0, 1, 1);
players.getPlayers()[0].placeShipVertically(6, 1, 1);
players.getPlayers()[0].placeShipVertically(0, 9, 2);
players.getPlayerUnderAttack().receiveAttack(5, 4);
players.getPlayerUnderAttack().receiveAttack(5, 5);
players.getPlayerUnderAttack().receiveAttack(5, 6);
players.getPlayerUnderAttack().receiveAttack(5, 7);
players.getPlayerUnderAttack().receiveAttack(7, 4);
players.getPlayerUnderAttack().receiveAttack(7, 5);
players.getPlayerUnderAttack().receiveAttack(7, 6);
players.getPlayerUnderAttack().receiveAttack(7, 7);
players.getPlayerUnderAttack().receiveAttack(9, 4);
players.getPlayerUnderAttack().receiveAttack(9, 5);
players.getPlayerUnderAttack().receiveAttack(9, 6);
players.getPlayerUnderAttack().receiveAttack(9, 7);
players.getPlayerUnderAttack().receiveAttack(1, 1);
players.getPlayerUnderAttack().receiveAttack(0, 1);
players.getPlayerUnderAttack().receiveAttack(6, 1);
players.getPlayerUnderAttack().receiveAttack(0, 9);
players.getPlayerUnderAttack().receiveAttack(4, 4);
players.getPlayerUnderAttack().receiveAttack(2, 7);
players.getPlayerUnderAttack().receiveAttack(7, 9);
//players.getPlayerUnderAttack().receiveAttack(1, 9);

players.changePlayer();
players.getPlayers()[1].placeShipHorizontally(1, 4, 2);
players.getPlayers()[1].placeShipHorizontally(3, 4, 2);
players.getPlayers()[1].placeShipHorizontally(5, 4, 2);
players.getPlayers()[1].placeShipVertically(8, 8, 1);
players.getPlayerUnderAttack().receiveAttack(1, 4);
players.getPlayerUnderAttack().receiveAttack(1, 5);
players.getPlayerUnderAttack().receiveAttack(3, 4);
players.getPlayerUnderAttack().receiveAttack(3, 5);
players.getPlayerUnderAttack().receiveAttack(5, 4);
players.getPlayerUnderAttack().receiveAttack(5, 5);
//players.getPlayerUnderAttack().receiveAttack(8, 8);

function gameFlow() {
  const controller = new AbortController();

  if (players.getPlayers()[0].allShipsSunk()) {
    computerWins();
    controller.abort();
  } else if (players.getPlayers()[1].allShipsSunk()) {
    playerWins();
    controller.abort();
  }

  const getController = () => controller;

  return { getController };
}

export { players, gameFlow };

/*
for (let i = 0; i < 6; i++) {
  players
    .getPlayerUnderAttack()
    .receiveAttack(
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10)
    );
}

for (let i = 0; i < 6; i++) {
  players
    .getPlayerUnderAttack()
    .receiveAttack(
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10)
    );
}













const players = Players();
players.changePlayer();
players.getPlayers()[0].placeShipHorizontally(5, 4, 4);
players.getPlayers()[0].placeShipHorizontally(7, 4, 4);
players.getPlayers()[0].placeShipHorizontally(9, 4, 4);
players.getPlayers()[0].placeShipVertically(1, 1, 1);
players.getPlayers()[0].placeShipVertically(0, 1, 1);
players.getPlayers()[0].placeShipVertically(6, 1, 1);
players.getPlayers()[0].placeShipVertically(0, 9, 7);
for (let i = 0; i < 6; i++) {
  players
    .getPlayerUnderAttack()
    .receiveAttack(
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10)
    );
}

players.changePlayer();
players.getPlayers()[1].placeShipHorizontally(1, 4, 4);
players.getPlayers()[1].placeShipHorizontally(3, 4, 4);
players.getPlayers()[1].placeShipHorizontally(5, 4, 4);
players.getPlayers()[1].placeShipVertically(8, 8, 1);
for (let i = 0; i < 6; i++) {
  players
    .getPlayerUnderAttack()
    .receiveAttack(
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10)
    );
}
*/
