import { players } from "./eventListeners";
import { check, checkPositions } from "./player";

function gameboardUpdate(players) {
  const grid1 = document.querySelectorAll(".grid1 > span");
  const grid2 = document.querySelectorAll(".grid2 > span");

  //Verify for each element of the board if the value is different from null AND false
  //Since each element of the grid1 Node contains a line and column that is used to iterate through each element of the board
  for (let i = 0; i < 100; i++) {
    if (
      players.getPlayers()[0].getBoard()[grid1[i].attributes[1].value][
        grid1[i].attributes[0].value
      ] !== null &&
      players.getPlayers()[0].getBoard()[grid1[i].attributes[1].value][
        grid1[i].attributes[0].value
      ] !== false &&
      players.getPlayers()[0].getBoard()[grid1[i].attributes[1].value][
        grid1[i].attributes[0].value
      ] !== "hit"
    ) {
      grid1[i].style.backgroundColor = "grey";
    } else if (
      players.getPlayers()[0].getBoard()[grid1[i].attributes[1].value][
        grid1[i].attributes[0].value
      ] === false
    ) {
      grid1[i].classList.add("fail");
    } else if (
      players.getPlayers()[0].getBoard()[grid1[i].attributes[1].value][
        grid1[i].attributes[0].value
      ] === "hit"
    ) {
      grid1[i].classList.add("hit");
    }
  }

  for (let i = 0; i < 100; i++) {
    if (
      players.getPlayers()[1].getBoard()[grid2[i].attributes[1].value][
        grid2[i].attributes[0].value
      ] === false
    ) {
      grid2[i].classList.add("fail");
    } else if (
      players.getPlayers()[1].getBoard()[grid2[i].attributes[1].value][
        grid2[i].attributes[0].value
      ] === "hit"
    ) {
      grid2[i].classList.add("hit");
    }

    messages(check);
    messagesPositions(checkPositions);

    if (players.getPlayerUnderAttack().name === "Computer") {
      playerTurnMessage();
    } else {
      computerTurnMessage();
    }
  }
}

function messages(checkStatus) {
  const flow = document.querySelector(".flow");

  if (checkStatus) {
    flow.textContent = "A ship has been hit!";
  } else if (checkStatus === false) {
    flow.textContent = "This spot has already been hit ";
  } else if (checkStatus === null) {
    flow.textContent = "Oops.. nothing has been hit";
  }
}

function messagesPositions(checkStatus) {
  const alert = document.querySelector(".alert");

  if (checkStatus) {
    alert.textContent = "";
  } else if (checkStatus === false) {
    alert.textContent = "The ship touches another ship. Choose another spot";
  } else if (checkStatus === null) {
    alert.textContent = "The ship goes beyond the limits";
  }
}

function noShipPlacedMessage() {
  const flow = document.querySelector(".flow");
  flow.textContent = "You have to place at least 1 ship";
}

function startMessage() {
  const flow = document.querySelector(".flow");
  flow.textContent = "Time to start! You play first";
}

function erasedAlert() {
  const alert = document.querySelector(".alert");
  alert.textContent = "";
}

function renderRemaining(number) {
  const remaining = document.querySelector(".remaining");
  remaining.textContent = `Remaining ships: ${number}`;
}

function computerTurnMessage() {
  const turns = document.querySelector(".turns");
  turns.textContent = "Computer's Turn";
}

function playerTurnMessage() {
  const turns = document.querySelector(".turns");
  turns.textContent = "Player's Turn";
}

function messagesPlaceShips() {
  const flow = document.querySelector(".flow");
}

function playerWins() {
  const flow = document.querySelector(".flow");
  const turns = document.querySelector(".turns");
  flow.textContent = "Congratulations you won!";
  turns.textContent = "";
}

function computerWins() {
  const flow = document.querySelector(".flow");
  const turns = document.querySelector(".turns");
  flow.textContent = "Oh.. you lost..";
  turns.textContent = "";
}

export {
  gameboardUpdate,
  playerWins,
  computerWins,
  noShipPlacedMessage,
  computerTurnMessage,
  playerTurnMessage,
  startMessage,
  erasedAlert,
  renderRemaining,
};
