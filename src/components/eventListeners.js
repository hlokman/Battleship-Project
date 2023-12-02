import {
  gameboardUpdate,
  playerWins,
  computerWins,
  noShipPlacedMessage,
  startMessage,
  erasedAlert,
  renderRemaining,
} from "./renderBoardAndMessages";
import { Players } from "./player";
import { changeDisplayChoices, startTriggered } from "./renderPage";

function play() {
  const players = Players();

  gameboardUpdate(players);
  (function displayController() {
    const gridDiv2 = document.querySelector("#gridDiv2");
    const playerGrid = document.querySelector("#grid1");
    const controllers = document.querySelector("#controllers");
    const ships = document.querySelector("#choices");
    const start = document.querySelector("#startButton");
    const restart = document.querySelector("#restartButton");
    let chosenLength = 3;
    let position = "horizontal";
    let maxPlacement = 0;

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
      //To limit the number of of ships to 10 max
      if (players.getPlayers()[0].getShips().length < 10) {
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

        if (players.getPlayers()[0].getShips().length === 10) {
          startMessage();
          startTriggered();
        }
        gameboardUpdate(players);
        renderRemaining(10 - players.getPlayers()[0].getShips().length);
      }
    });

    //END OF DRAG AND DROP-----------------------------------------------------------------------------------------------------------------------
    //Drag and Drop used instead of .addEventListener("click")

    start.addEventListener("click", (e) => {
      if (players.getPlayers()[0].getShips().length !== 0) {
        startMessage();
        startTriggered();
      } else if (players.getPlayers()[0].getShips().length === 0) {
        noShipPlacedMessage();
      }
    });

    restart.addEventListener("click", (e) => {
      document.location.reload();
    });
    controllers.addEventListener("click", (e) => {
      if (e.target.localName === "button") {
        changeDisplayChoices(e.target.dataset.position);
      }
    });

    //Computer grid (to attack)
    const controller = new AbortController();
    gridDiv2.addEventListener(
      "click",
      (e) => {
        let playerChoiceLine;
        let playerChoiceColumn;

        //In case the computer grid is clicked before any ship is placed
        if (players.getPlayers()[0].getShips().length === 0) {
          noShipPlacedMessage();
        } else if (players.getPlayerUnderAttack().name === "Computer") {
          //Avoid to trigger anything if it is computer turn + if at least 1 ship placed => start triggered when computer grid is clicked
          if (e.target.dataset.line && gameLoop() !== true) {
            playerChoiceLine = e.target.dataset.line;
            playerChoiceColumn = e.target.dataset.column;
            let result = players.playerTurn(
              playerChoiceLine,
              playerChoiceColumn
            );
            players.changePlayer(); //In order to avoid to trigger anything if it is computer turn
            gameboardUpdate(players);
            if ((result || result === null) && gameLoop() !== true) {
              setTimeout(() => {
                players.computerTurn();
                players.changePlayer(); //"force" to wait the setTimeOut => allow to click the computer's grid again
                gameboardUpdate(players);
                gameLoop(); //To check after the setTimeout is done
              }, 1200);
            } else {
              players.changePlayer(); //if player clicks spot already hit => allow to click the computer's grid again
              gameboardUpdate(players);
            }
            startTriggered();
            erasedAlert();
          }
        }

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
    return {};
  }
}

export { play };
