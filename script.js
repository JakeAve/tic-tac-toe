import { getIndexFromAi } from "./ai.js";

const container = document.querySelector("#tic-tac-toe-container");

const buttons = [...container.querySelectorAll("button")];

const game = ["", "", "", "", "", "", "", "", ""];

let currentLetter = "x";
let artificialOponent = true;
let isArtificialX = true;

const topRow = (arr) => [arr[0], arr[1], arr[2]];
const middleRow = (arr) => [arr[3], arr[4], arr[5]];
const bottomRow = (arr) => [arr[6], arr[7], arr[8]];
const leftColumn = (arr) => [arr[0], arr[3], arr[6]];
const middleColumn = (arr) => [arr[1], arr[4], arr[7]];
const rightColumn = (arr) => [arr[2], arr[5], arr[8]];
const rightDiagonal = (arr) => [arr[0], arr[4], arr[8]];
const leftDiagonal = (arr) => [arr[2], arr[4], arr[6]];
const checkFuncs = [
  topRow,
  middleRow,
  bottomRow,
  leftColumn,
  middleColumn,
  rightColumn,
  leftDiagonal,
  rightDiagonal,
];

const checkForWin = (arr) => {
  let win;
  checkFuncs.forEach((f) => {
    if (f(arr).every((v) => v === "x")) win = "x";
    if (f(arr).every((v) => v === "o")) win = "o";
  });
  return win;
};

const mapGameToBoard = () =>
  buttons.forEach((b, i) => {
    b.innerHTML = game[i];
    b.setAttribute("letter", game[i]);
  });

const playTurn = (index) => {
  if (index === undefined) throw new Error("No index provided");
  if (game[index] !== "") throw new Error("Space already marked");
  game[index] = currentLetter;
  mapGameToBoard();
  const win = checkForWin(game);
  const isCatGame = !win && game.every(Boolean);
  if (win || isCatGame) {
    container.removeEventListener("click", onClick);
    if (win) setTimeout(() => alert(`${win} wins!`));
    if (isCatGame) setTimeout(() => alert(`Cat game`));
    return false;
  }

  currentLetter = currentLetter === "x" ? "o" : "x";
  return true;
};

const onClick = (e) => {
  if (e.target.tagName === "BUTTON") {
    const shouldContinue = playTurn(buttons.indexOf(e.target));
    if (artificialOponent && shouldContinue) {
      container.removeEventListener("click", onClick);
      setTimeout(artificialTurn, 1000);
    }
  }
};

const artificialTurn = () => {
  const index = getIndexFromAi(game);
  playTurn(index);
  container.addEventListener("click", onClick);
};

container.addEventListener("click", onClick);

const resetGame = () => {
  game.forEach((v, i) => (game[i] = ""));
  mapGameToBoard();
  container.addEventListener("click", onClick);
  currentLetter = "x";
  if (isArtificialX) artificialTurn();
};

document.querySelector("#reset").addEventListener("click", resetGame);

if (isArtificialX) artificialTurn();
