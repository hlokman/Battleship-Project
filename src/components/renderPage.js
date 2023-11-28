function render() {
  const content = document.querySelector("#content");
  const header = document.querySelector("#header");

  //Players and flow part
  const playersAndFlow = document.createElement("div");
  playersAndFlow.setAttribute("id", "playersAndFlow");
  header.appendChild(playersAndFlow);

  const flow = document.createElement("div");
  flow.setAttribute("id", "flow");
  playersAndFlow.appendChild(flow);

  //Grids part
  const grids = document.createElement("div");
  grids.setAttribute("id", "grids");
  content.appendChild(grids);

  const displays = document.createElement("div");
  displays.setAttribute("id", "displays");
  grids.appendChild(displays);

  const gridDiv = document.createElement("div");
  gridDiv.setAttribute("id", "gridDiv");
  displays.appendChild(gridDiv);
  const playerOne = document.createElement("div");
  playerOne.setAttribute("id", "playerOne");
  gridDiv.appendChild(playerOne);
  const grid1 = document.createElement("div");
  grid1.setAttribute("id", "grid1");
  gridDiv.appendChild(grid1);
  for (let line = 0; line < 10; line++) {
    for (let column = 0; column < 10; column++) {
      const square = document.createElement("span");
      square.setAttribute("data-column", `${column}`);
      square.setAttribute("data-line", `${line}`);
      square.setAttribute("id", "square");
      grid1.appendChild(square);
    }
  }

  const separation = document.createElement("div");
  separation.setAttribute("id", "separation");
  displays.appendChild(separation);
  separation.innerHTML = "<h1>VS</h1>";

  const gridDiv2 = document.createElement("div");
  gridDiv2.setAttribute("id", "gridDiv2");
  displays.appendChild(gridDiv2);
  const playerTwo = document.createElement("div");
  playerTwo.setAttribute("id", "playerTwo");
  gridDiv2.appendChild(playerTwo);
  const grid2 = document.createElement("div");
  grid2.setAttribute("id", "grid2");
  gridDiv2.appendChild(grid2);
  for (let line = 0; line < 10; line++) {
    for (let column = 0; column < 10; column++) {
      const square = document.createElement("span");
      square.setAttribute("data-column", `${column}`);
      square.setAttribute("data-line", `${line}`);
      square.setAttribute("id", "square");
      grid2.appendChild(square);
    }
  }

  //Controller part
  const controllers = document.createElement("div");
  controllers.setAttribute("id", "controllers");
  grids.appendChild(controllers);
  const top = document.createElement("div");
  top.setAttribute("id", "topController");
  controllers.appendChild(top);
  for (let i = 1; i <= 10; i++) {
    const length = document.createElement("div");
    length.setAttribute("data-length", `${i}`);
    length.setAttribute("id", "length");
    length.textContent = `${i}`;
    top.appendChild(length);
  }

  const bottom = document.createElement("div");
  bottom.setAttribute("id", "bottomController");
  controllers.appendChild(bottom);
  const buttonH = document.createElement("button");
  buttonH.setAttribute("data-position", "horizontal");
  buttonH.textContent = "Horizontal";
  bottom.appendChild(buttonH);
  const buttonV = document.createElement("button");
  buttonV.setAttribute("data-position", "vertical");
  buttonV.textContent = "Vertical";
  bottom.appendChild(buttonV);
}

export { render };
