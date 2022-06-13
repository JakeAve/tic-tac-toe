import { getIndexFromAi } from "./ai.js";

const container = document.querySelector("#tic-tac-toe-container");
const buttons = [...container.querySelectorAll("button")];

const getTopRow = (arr) => [arr[0], arr[1], arr[2]];
const getMiddleRow = (arr) => [arr[3], arr[4], arr[5]];
const getBottomRow = (arr) => [arr[6], arr[7], arr[8]];
const getLeftColumn = (arr) => [arr[0], arr[3], arr[6]];
const getMiddleColumn = (arr) => [arr[1], arr[4], arr[7]];
const getRightColumn = (arr) => [arr[2], arr[5], arr[8]];
const getRightDiagonal = (arr) => [arr[0], arr[4], arr[8]];
const getLeftDiagonal = (arr) => [arr[2], arr[4], arr[6]];
const checkFuncs = [
  getTopRow,
  getMiddleRow,
  getBottomRow,
  getLeftColumn,
  getMiddleColumn,
  getRightColumn,
  getLeftDiagonal,
  getRightDiagonal,
];

const checkForWin = (arr) => {
  let win;
  checkFuncs.forEach((f) => {
    if (f(arr).every((v) => v === "x")) win = "x";
    if (f(arr).every((v) => v === "o")) win = "o";
  });
  return win;
};

const startGame = (isArtificialOponent, isArtificialX, onWin, onCatsGame) => {
  let currentLetter = "x";
  const game = ["", "", "", "", "", "", "", "", ""];
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
      endGame(win, isCatGame);
      return false;
    }

    currentLetter = currentLetter === "x" ? "o" : "x";
    return true;
  };

  const onClick = (e) => {
    if (e.target.tagName === "BUTTON") {
      const shouldContinue = playTurn(buttons.indexOf(e.target));
      if (isArtificialOponent && shouldContinue) {
        container.removeEventListener("click", onClick);
        setTimeout(artificialTurn, 1000);
      }
    }
  };

  const endGame = (win, isCatGame) => {
    container.removeEventListener("click", onClick);
    if (win) setTimeout(() => onWin(win), 500);
    if (isCatGame) setTimeout(() => onCatsGame(), 500);
  };

  const artificialTurn = () => {
    const index = getIndexFromAi(game);
    playTurn(index);
    container.addEventListener("click", onClick);
  };

  container.addEventListener("click", onClick);

  if (isArtificialX) artificialTurn();
  return { endGame };
};

export const resetGame = (
  isArtificialOponent,
  isArtificialX,
  onWin,
  onCatsGame
) => {
  buttons.forEach((b) => (b.innerHTML = ""));
  return startGame(isArtificialOponent, isArtificialX, onWin, onCatsGame);
};
