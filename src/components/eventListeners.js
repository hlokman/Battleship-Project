import { gameLoop, players } from "./gameFlow";
import { gameboardUpdate } from "./renderBoard";

//const controller = gameFlow.getController();

//console.log(grid1[1].attributes[0].value); //column
//console.log(grid1[1].attributes[1].value); //line
//console.log(players.getPlayers()[0].getBoard()[0][1].getLength());

function displayController() {
  const gridDiv = document.querySelector("#gridDiv");
  const gridDiv2 = document.querySelector("#gridDiv2");
  gameboardUpdate();

  let playerChoiceLine;
  let playerChoiceColumn;
  let computerChoiceLine;
  let computerChoiceColumn;

  gridDiv.addEventListener("click", (e) => {
    /*console.log(e.target.dataset.line);
    console.log(e.target.dataset.column);*/
  });

  gridDiv2.addEventListener("click", (e) => {
    if (e.target.dataset.line) {
      playerChoiceLine = e.target.dataset.line;
      playerChoiceColumn = e.target.dataset.column;
      console.log(playerChoiceLine);
      console.log(playerChoiceColumn);
      let result = players
        .getPlayerUnderAttack()
        .receiveAttack(playerChoiceLine, playerChoiceColumn);
      console.log("==========>" + result);
      console.log("this:" + (result === false));

      players.changePlayer();

      if (result == true) {
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

        players.changePlayer();
        gameboardUpdate();
      } else {
        players.changePlayer();
        gameboardUpdate();
      }

      playerChoiceLine = undefined;
      playerChoiceColumn = undefined;
      console.log(players.getPlayers()[1].allShipsSunk());
    }

    gameLoop(); //!
  });
  //console.log(players.getPlayerUnderAttack().name);
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
