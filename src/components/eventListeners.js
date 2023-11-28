//import { /*gameLoop,*/ players } from "./gameFlow";

import { gameboardUpdate, playerWins, computerWins } from "./renderBoard";
import { Players, chosenLength } from "./player";

function play() {
  const players = Players();
  /*players.changePlayer();
  players.getPlayers()[0].placeShipHorizontally(5, 4, 4);
  players.getPlayers()[0].placeShipHorizontally(7, 4, 4);
  players.getPlayers()[0].placeShipHorizontally(9, 4, 4);
  players.getPlayers()[0].placeShipVertically(1, 1, 1);
  players.getPlayers()[0].placeShipVertically(0, 1, 1);
  players.getPlayers()[0].placeShipVertically(6, 1, 1);
  players.getPlayers()[0].placeShipVertically(0, 9, 2);

  players.changePlayer();
  players.getPlayers()[1].placeShipHorizontally(1, 4, 2);
  players.getPlayers()[1].placeShipHorizontally(3, 4, 2);
  players.getPlayers()[1].placeShipHorizontally(5, 4, 2);
  players.getPlayers()[1].placeShipVertically(8, 8, 1);
  players.getPlayers()[1].placeShipVertically(9, 9, 1);
  players.getPlayerUnderAttack().receiveAttack(1, 4, false);
  players.getPlayerUnderAttack().receiveAttack(1, 5, false);
  players.getPlayerUnderAttack().receiveAttack(3, 4, false);
  players.getPlayerUnderAttack().receiveAttack(3, 5, false);
  players.getPlayerUnderAttack().receiveAttack(5, 4, false);
  players.getPlayerUnderAttack().receiveAttack(5, 5, false);*/
  //gameboardUpdate(players);

  /*
  
  EVENT LISTENERS

  */
  //players.playerShipsHorizontal(1, 1, 9);

  gameboardUpdate(players);
  (function displayController() {
    const gridDiv = document.querySelector("#gridDiv");
    const gridDiv2 = document.querySelector("#gridDiv2");
    const controllers = document.querySelector("#controllers");
    let chosenLength = 3;
    let position = "horizontal";

    controllers.addEventListener("click", (e) => {
      if (e.target.id === "length") {
        chosenLength = Number(e.target.dataset.length);
      }

      if (e.target.localName === "button") {
        position = e.target.dataset.position;
      }
    });

    //Player grid (to place ships)
    gridDiv.addEventListener("click", (e) => {
      let playerChoiceLine = e.target.dataset.line;
      let playerChoiceColumn = e.target.dataset.column;

      if (playerChoiceLine && position === "horizontal") {
        players.playerShipPlacementH(
          Number(playerChoiceLine),
          Number(playerChoiceColumn),
          Number(chosenLength)
        );
      } else if (playerChoiceLine && position === "vertical") {
        players.playerShipPlacementV(
          Number(playerChoiceLine),
          Number(playerChoiceColumn),
          Number(chosenLength)
        );
      }

      gameboardUpdate(players);
      console.log(
        players.getPlayers()[0].getShips().length +
          "  AI=" +
          players.getPlayers()[1].getShips().length
      );
    });

    /*
          if (e.target.dataset.line) {
        playerChoiceLine = Number(e.target.dataset.line);
        playerChoiceColumn = Number(e.target.dataset.column);
        players.playerShipsHorizontal(
          playerChoiceLine,
          playerChoiceColumn,
          chosenLength
        );
        gameboardUpdate(players);
      } */
    //Computer grid (to attack)
    const controller = new AbortController();
    gridDiv2.addEventListener(
      "click",
      (e) => {
        let playerChoiceLine;
        let playerChoiceColumn;

        if (e.target.dataset.line) {
          playerChoiceLine = e.target.dataset.line;
          playerChoiceColumn = e.target.dataset.column;
          players.playerTurn(playerChoiceLine, playerChoiceColumn);
          gameboardUpdate(players);
        }
        gameLoop();

        if (gameLoop() === true) {
          controller.abort();
        }
      },
      { signal: controller.signal }
    );
  })();

  function gameLoop() {
    if (
      players.getPlayers()[0].allShipsSunk() &&
      players.getPlayers()[0].getShips().length !== 0
    ) {
      computerWins();
      return true;
    } else if (
      players.getPlayers()[1].allShipsSunk() &&
      players.getPlayers()[1].getShips().length !== 0
    ) {
      playerWins();
      return true;
    }

    //const getController = () => controller;

    return {};
  }
}

export { /*displayController,*/ play /*, players*/ };

/*
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
LOGIQUE A AJOUTER DANS PLAYER??????
  
  let computerChoiceLine;
let computerChoiceColumn;

gridDiv.addEventListener("click", (e) => {

});

gridDiv2.addEventListener("click", (e) => {
  let playerChoiceLine;
  let playerChoiceColumn;

  if (e.target.dataset.line) {
    playerChoiceLine = e.target.dataset.line;
    playerChoiceColumn = e.target.dataset.column;
  }
  playerTurn(playerChoiceLine, playerChoiceColumn);

  gameLoop(); //!
});

//console.log(players.getPlayerUnderAttack().name);


//---------------------------------------------
function playerTurn(line, column) {
  let result = players.getPlayerUnderAttack().receiveAttack(line, column);
  players.changePlayer();
  if (result) {
    computerTurn();
    players.changePlayer();
    gameboardUpdate();
  } else {
    players.changePlayer();
    gameboardUpdate();
  }

  line = undefined;
  column = undefined;
  console.log(players.getPlayers()[1].allShipsSunk());
}

function computerTurn() {
  let attackResult;
  do {
    attackResult = players
      .getPlayerUnderAttack()
      .receiveAttack(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        false
      );
  } while (attackResult === false);
}

  
  
  
  
  */
