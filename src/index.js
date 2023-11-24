import "./style/style.css";
import { render } from "./components/renderPage";
import { gameboardUpdate } from "./components/renderBoard";
import { Players } from "./components/player";
import { gameFlow } from "./components/gameFlow";

render();
gameboardUpdate();
gameFlow();
