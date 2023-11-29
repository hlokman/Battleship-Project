//import { /*gameLoop,*/ players } from "./gameFlow";

import { gameboardUpdate, playerWins, computerWins } from "./renderBoard";
import { Players, chosenLength } from "./player";
import { changeDisplayChoices } from "./renderPage";

function play() {
  const players = Players();

  gameboardUpdate(players);
  (function displayController() {
    const gridDiv = document.querySelector("#gridDiv");
    const gridDiv2 = document.querySelector("#gridDiv2");
    const playerGrid = document.querySelector("#grid1");
    const controllers = document.querySelector("#controllers");
    const ships = document.querySelector("#choices");
    let chosenLength = 3;
    let position = "horizontal";

    //DRAG AND DROP--------------------------------------------------------------------------------------------------------------------------------
    ships.addEventListener("dragstart", (e) => {
      //take the values of the dragged element
      chosenLength = Number(e.target.attributes[0].value);
      position = e.target.className;
    });

    playerGrid.addEventListener("dragover", (e) => {
      e.preventDefault();
      //take the values of the hovered element
      e.target.dataset.over = "yes";
      //IF HORIZONTAL
      if (position === "horizontal") {
        //Change the background color taking into account the chosen length (declared above) IF the data attribute number exist
        for (let i = 0; i < chosenLength; i++) {
          if (
            e.target.parentNode.childNodes[Number(e.target.dataset.number) + i]
          ) {
            e.target.parentNode.childNodes[
              Number(e.target.dataset.number) + i
            ].dataset.over = "yes";
          }
        }
      } //IF VERTICAL
      else {
        //Change the background color taking into account the chosen length (declared above) IF the data attribute number exist
        for (
          let i = Number(e.target.dataset.number);
          i <= Number(e.target.dataset.number) + (chosenLength - 1) * 10;
          i += 10
        ) {
          if (e.target.parentNode.childNodes[i]) {
            e.target.parentNode.childNodes[i].dataset.over = "yes";
          }
        }
      }
    });

    playerGrid.addEventListener("dragleave", (e) => {
      e.preventDefault();
      e.target.dataset.over = "";
      //In order to undo the changing background color
      //IF HORIZONTAL
      if (position === "horizontal") {
        for (let i = 0; i < chosenLength; i++) {
          if (
            e.target.parentNode.childNodes[Number(e.target.dataset.number) + i]
          ) {
            e.target.parentNode.childNodes[
              Number(e.target.dataset.number) + i
            ].dataset.over = "";
          }
        }
      } //IF VERTICAL
      else {
        //Change the background color taking into account the chosen length (declared above) IF the data attribute number exist
        for (
          let i = Number(e.target.dataset.number);
          i <= Number(e.target.dataset.number) + (chosenLength - 1) * 10;
          i += 10
        ) {
          if (e.target.parentNode.childNodes[i]) {
            e.target.parentNode.childNodes[i].dataset.over = "";
          }
        }
      }
    });

    playerGrid.addEventListener("drop", (e) => {
      e.preventDefault();
      //In order to undo the changing background color when leave drop when placement fails (Horizontal)
      for (let i = 0; i < chosenLength; i++) {
        if (
          e.target.parentNode.childNodes[Number(e.target.dataset.number) + i]
        ) {
          e.target.parentNode.childNodes[
            Number(e.target.dataset.number) + i
          ].dataset.over = "";
        }
      }
      //In order to undo the changing background color when leave drop when placement fails (Vertical)
      for (
        let i = Number(e.target.dataset.number);
        i <= Number(e.target.dataset.number) + (chosenLength - 1) * 10;
        i += 10
      ) {
        if (e.target.parentNode.childNodes[i]) {
          e.target.parentNode.childNodes[i].dataset.over = "";
        }
      }

      //+logic when drop => run the functions below
      let playerChoiceLine = e.target.attributes[1].value;
      let playerChoiceColumn = e.target.attributes[0].value;

      if (/*e.target.attributes[1].value &&*/ position === "horizontal") {
        players.playerShipPlacementH(
          Number(playerChoiceLine),
          Number(playerChoiceColumn),
          Number(chosenLength)
        );
      } else {
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
    //END OF DRAG AND DROP-----------------------------------------------------------------------------------------------------------------------
    //Drag and Drop used instead of .addEventListener("click")

    controllers.addEventListener("click", (e) => {
      if (e.target.localName === "button") {
        changeDisplayChoices(e.target.dataset.position);
      }
    });

    //Player grid (to place ships)
    /*gridDiv.addEventListener("click", (e) => {
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
    });*/

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
