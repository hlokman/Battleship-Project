import "./style/style.css";
import { render } from "./components/renderPage";
import { gameboardUpdate } from "./components/renderBoard";
import { Players } from "./components/player";
import { gameLoop } from "./components/gameFlow";
import { displayController } from "./components/eventListeners";

render();
gameboardUpdate();
displayController();
//gameLoop();
