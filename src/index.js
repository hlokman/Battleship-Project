import "./style/style.css";
import { render } from "./components/renderPage";
import { gameboardUpdate } from "./components/renderBoard";
import { Players } from "./components/player";
//import { gameLoop, players } from "./components/gameFlow";
import { displayController, players, play } from "./components/eventListeners";

render();
//gameboardUpdate(players);
play();
//displayController();

//gameLoop();
