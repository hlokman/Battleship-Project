import { players } from "./gameFlow";

function gameboardUpdate() {
  const grid1 = document.querySelectorAll("#grid1 > span");
  const grid2 = document.querySelectorAll("#grid2 > span");

  console.log(grid1[1].attributes[0].value); //column
  console.log(grid1[1].attributes[1].value); //line
  //console.log(players.getPlayers()[0].getBoard()[0][1].getLength());
  console.log(players.getPlayers()[0].getShips());

  console.log(grid1[10].attributes[0].value); //column
  console.log(grid1[10].attributes[1].value); //line

  /*console.log(players.getPlayerUnderAttack().name);
  players.changePlayer();
  console.log(players.getPlayerUnderAttack().name);*/

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
      //grid1[i].textContent = "x";
      grid1[i].className = "fail";
    } else if (
      players.getPlayers()[0].getBoard()[grid1[i].attributes[1].value][
        grid1[i].attributes[0].value
      ] === "hit"
    ) {
      //grid1[i].textContent = "hit";
      grid1[i].className = "hit";
    }
  }

  for (let i = 0; i < 100; i++) {
    if (
      players.getPlayers()[1].getBoard()[grid2[i].attributes[1].value][
        grid2[i].attributes[0].value
      ] === false
    ) {
      //grid2[i].textContent = "x";
      grid2[i].className = "fail";
    } else if (
      players.getPlayers()[1].getBoard()[grid2[i].attributes[1].value][
        grid2[i].attributes[0].value
      ] === "hit"
    ) {
      //grid2[i].textContent = "hit";
      grid2[i].className = "hit";
    }
  }

  console.log(players.getPlayers()[0].getBoard());
  console.log(players.getPlayers()[1].getBoard());
  console.log(players);
}

function playerWins() {
  const flow = document.querySelector("#flow");
  flow.textContent = "Congratulations you won!";
}

function computerWins() {
  const flow = document.querySelector("#flow");
  flow.textContent = "Oh.. you lost..";
}

export { gameboardUpdate, playerWins, computerWins };
