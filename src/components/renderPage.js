function render() {
  const content = document.querySelector("#content");
  const header = document.querySelector("#header");

  //Players and flow part
  const buttonsAndFlow = document.createElement("div");
  buttonsAndFlow.setAttribute("class", "buttonsAndFlow");
  header.appendChild(buttonsAndFlow);
  const alert = document.createElement("div");
  alert.setAttribute("class", "alert");
  header.appendChild(alert);
  //
  const remaining = document.createElement("div");
  remaining.setAttribute("class", "remaining");
  remaining.textContent = "Remaining ships: 10";
  header.append(remaining);
  //
  const lastResult = document.createElement("div");
  lastResult.setAttribute("class", "lastResult");
  lastResult.textContent = "your (last) result:";
  header.appendChild(lastResult);
  //
  const turns = document.createElement("div");
  turns.setAttribute("class", "turns");
  turns.textContent = "turns test";
  header.appendChild(turns);

  const flow = document.createElement("div");
  flow.setAttribute("class", "flow");
  flow.textContent = "Place your ships (Max: 10 ships)";
  buttonsAndFlow.appendChild(flow);

  const buttons = document.createElement("div");
  buttons.setAttribute("class", "buttons");
  buttonsAndFlow.appendChild(buttons);
  const start = document.createElement("button");
  start.setAttribute("class", "startButton");
  start.textContent = "Start";
  buttons.appendChild(start);
  const restart = document.createElement("button");
  restart.setAttribute("class", "restartButton");
  restart.textContent = "Restart";
  buttons.appendChild(restart);

  //Grids part
  const grids = document.createElement("div");
  grids.setAttribute("class", "grids");
  content.appendChild(grids);

  const displays = document.createElement("div");
  displays.setAttribute("class", "displays");
  grids.appendChild(displays);

  const gridDiv = document.createElement("div");
  gridDiv.setAttribute("class", "gridDiv");
  displays.appendChild(gridDiv);
  const playerOne = document.createElement("div");
  playerOne.setAttribute("class", "playerOne");
  playerOne.textContent = "player";
  gridDiv.appendChild(playerOne);
  const grid1 = document.createElement("div");
  grid1.setAttribute("class", "grid1");
  gridDiv.appendChild(grid1);
  for (let line = 0; line < 10; line++) {
    for (let column = 0; column < 10; column++) {
      const square = document.createElement("span");
      square.setAttribute("data-column", `${column}`);
      square.setAttribute("data-line", `${line}`);
      square.setAttribute("class", "square");

      grid1.appendChild(square);
    }
  }
  const square = document.querySelectorAll(".square");
  for (let i = 0; i < 100; i++) {
    square[i].setAttribute("data-number", `${i}`);
  }

  const separation = document.createElement("div");
  separation.setAttribute("class", "separation");
  displays.appendChild(separation);
  separation.innerHTML = "<h1>VS</h1>";

  const gridDiv2 = document.createElement("div");
  gridDiv2.setAttribute("class", "gridDiv2");
  displays.appendChild(gridDiv2);
  const playerTwo = document.createElement("div");
  playerTwo.setAttribute("class", "playerTwo");
  playerTwo.textContent = "computer";
  gridDiv2.appendChild(playerTwo);
  const grid2 = document.createElement("div");
  grid2.setAttribute("class", "grid2");
  gridDiv2.appendChild(grid2);
  for (let line = 0; line < 10; line++) {
    for (let column = 0; column < 10; column++) {
      const square = document.createElement("span");
      square.setAttribute("data-column", `${column}`);
      square.setAttribute("data-line", `${line}`);
      square.setAttribute("class", "square");
      grid2.appendChild(square);
    }
  }

  //Controller part
  const controllers = document.createElement("div");
  controllers.setAttribute("class", "controllers");
  grids.appendChild(controllers);

  const bottom = document.createElement("div");
  bottom.setAttribute("class", "bottomController");
  controllers.appendChild(bottom);
  const buttonH = document.createElement("button");
  buttonH.setAttribute("data-position", "horizontal");
  buttonH.textContent = "Horizontal";
  bottom.appendChild(buttonH);
  const buttonV = document.createElement("button");
  buttonV.setAttribute("data-position", "vertical");
  buttonV.textContent = "Vertical";
  bottom.appendChild(buttonV);

  const choices = document.createElement("div");
  choices.setAttribute("id", "choices");
  choices.setAttribute("class", "horizontal");
  controllers.appendChild(choices);
  for (let i = 1; i <= 5; i++) {
    const square = document.createElement("div");
    square.setAttribute("data-shipLength", `${i}`);
    square.setAttribute("id", "ship");
    square.setAttribute("class", "horizontal");
    square.setAttribute("draggable", "true");
    choices.appendChild(square);
    for (let j = 1; j <= i; j++) {
      const ship = document.createElement("div");
      ship.setAttribute("class", `squareShip`);
      square.appendChild(ship);
      square.style.gridTemplateColumns = `repeat(${i}, 40px )`;
    }
  }
}

function changeDisplayChoices(target) {
  const choices = document.querySelector("#choices");
  choices.className = "";
  choices.className = target;

  const ships = document.querySelectorAll("#ship");
  if (target === "vertical") {
    ships.forEach((item, index) => {
      item.className = target;
      item.style.gridTemplateColumns = "";
      item.style.gridTemplateRows = `repeat(${index + 1}, 40px )`;
    });
  } else {
    ships.forEach((item, index) => {
      item.className = target;
      item.style.gridTemplateRows = "";
      item.style.gridTemplateColumns = `repeat(${index + 1}, 40px )`;
    });
  }
}

function startTriggered() {
  const controllers = document.querySelector(".controllers");
  controllers.style.display = "none";
  const remaining = document.querySelector(".remaining");
  remaining.style.display = "none";
  const alert = document.querySelector(".alert");
  alert.style.display = "none";
  const turns = document.querySelector(".turns");
  turns.style.display = "flex";
  const lastResult = document.querySelector(".lastResult");
  lastResult.style.display = "flex";

  const grids = document.querySelector(".grids");
  grids.classList.add("rearranged");
  const start = document.querySelector(".startButton");
  start.style.display = "none";
}

export { render, changeDisplayChoices, startTriggered };
