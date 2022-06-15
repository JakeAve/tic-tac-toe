import { getIndexFromAi } from "./ai.js";

const container = document.querySelector("#tic-tac-toe-container");
const buttons = [...container.querySelectorAll("button")];

const waysToWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkForWin = (arr) => {
  let idxs = [];
  let letter;
  waysToWin.forEach((w) => {
    if (w.every((idx) => arr[idx] === "x")) {
      idxs.push(...w);
      letter = "x";
    }
    if (w.every((idx) => arr[idx] === "o")) {
      idxs.push(...w);
      letter = "o";
    }
  });
  if (!letter) return null;
  return { idxs, letter };
};

const startGame = (isArtificialOponent, isArtificialX, onWin, onCatsGame) => {
  let currentLetter = "x";
  const game = ["", "", "", "", "", "", "", "", ""];
  const mapGameToBoard = () =>
    buttons.forEach((b, i) => {
      b.innerHTML = game[i];
      b.setAttribute("letter", game[i]);
    });

  const playTurn = (index, onNoGameEnd, onGameEnd) => {
    if (index === undefined) throw new Error("No index provided");
    if (game[index] !== "") throw new Error("Space already marked");
    game[index] = currentLetter;
    mapGameToBoard();

    const win = checkForWin(game);
    const isCatGame = !win && game.every(Boolean);
    if (win || isCatGame) return onGameEnd(win, isCatGame);

    currentLetter = currentLetter === "x" ? "o" : "x";
    onNoGameEnd();
  };

  const onClick = (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = buttons.indexOf(e.target);
      playTurn(
        index,
        () => {
          if (isArtificialOponent) artificialTurn();
          // else keep event listener / do nothing
        },
        endGame
      );
    }
  };

  const endGame = (win, isCatGame) => {
    container.removeEventListener("click", onClick);
    if (win) {
      win.idxs.forEach((idx) => buttons[idx].classList.add("win"));
      setTimeout(() => onWin(win.letter), 750);
    }
    if (isCatGame) setTimeout(() => onCatsGame(), 750);
  };

  const artificialTurn = () => {
    container.removeEventListener("click", onClick);
    const index = getIndexFromAi(game);
    setTimeout(() => {
      playTurn(
        index,
        () => container.addEventListener("click", onClick),
        endGame
      );
    }, 1000);
  };

  if (isArtificialX) artificialTurn();
  else container.addEventListener("click", onClick);
  return { endGame };
};

export const resetGame = (
  isArtificialOponent,
  isArtificialX,
  onWin,
  onCatsGame
) => {
  buttons.forEach((b) => {
    b.innerHTML = "";
    b.removeAttribute("letter");
    b.classList.remove("win");
  });
  return startGame(isArtificialOponent, isArtificialX, onWin, onCatsGame);
};
