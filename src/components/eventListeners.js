import { gameLoop, players } from "./gameFlow";
import { gameboardUpdate } from "./renderBoard";

function displayController() {
  const gridDiv = document.querySelector("#gridDiv");
  const gridDiv2 = document.querySelector("#gridDiv2");
  //gameboardUpdate();

  gridDiv.addEventListener("click", (e) => {
    /*console.log(e.target.dataset.line);
    console.log(e.target.dataset.column);*/
  });

  gridDiv2.addEventListener("click", (e) => {
    let playerChoiceLine;
    let playerChoiceColumn;

    if (e.target.dataset.line) {
      playerChoiceLine = e.target.dataset.line;
      playerChoiceColumn = e.target.dataset.column;
      players.playerTurn(playerChoiceLine, playerChoiceColumn);
      gameboardUpdate(players);
    }

    gameLoop();
  });
}

export { displayController };

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
