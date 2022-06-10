const container = document.querySelector("#tic-tac-toe-container");

const buttons = [...container.querySelectorAll("button")];

const game = ["", "", "", "", "", "", "", "", ""];
let currentLetter = "x";

let artificialOponent = true;

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

const mapToArtificial = () =>
  game.map((v) => {
    if (v === currentLetter) return "a";
    if (v === "") return "";
    return "b";
  });

const areArrsEqual = (arr1, arr2) => {
  let result = true;
  arr1.forEach((v, i) => {
    if (v !== arr2[i]) result = false;
  });

  return result;
};

const artificialTurn = () => {
  const unusedIndexes = [];
  game.forEach((v, i) => {
    if (!v) unusedIndexes.push(i);
  });
  const randomNum = Math.floor(Math.random() * unusedIndexes.length);
  const randIndex = unusedIndexes[randomNum];
  playTurn(randIndex);
  container.addEventListener("click", onClick);
  //   const mappedGame = mapToArtificial();
  //   if (areArrsEqual(mappedGame, ["", "", "", "", "", "", "", "", ""]))
  //     playTurn(4);
  //   if (areArrsEqual(mappedGame, ["b", "", "", "", "", "", "", "", ""]))
  //     playTurn(4);
  //   if (areArrsEqual(mappedGame, ["", "b", "", "", "", "", "", "", ""]))
  //     playTurn(4);
  //   if (areArrsEqual(mappedGame, ["", "", "b", "", "", "", "", "", ""]))
  //     playTurn(4);
  //   if (areArrsEqual(mappedGame, ["", "", "", "b", "", "", "", "", ""]))
  //     playTurn(4);
  //   if (areArrsEqual(mappedGame, ["", "", "", "", "b", "", "", "", ""]))
  //     playTurn(0);
  //   if (areArrsEqual(mappedGame, ["", "", "", "", "", "b", "", "", ""]))
  //     playTurn(4);
  //   if (areArrsEqual(mappedGame, ["", "", "", "", "", "", "", "b", ""]))
  //     playTurn(4);
  //   if (areArrsEqual(mappedGame, ["", "", "", "", "", "", "", "", "b"]))
  //     playTurn(4);

  //   if (areArrsEqual(mappedGame, ["b", "b", "", "", "a", "", "", "", ""]))
  //     playTurn(2);
  //   if (areArrsEqual(mappedGame, ["", "b", "b", "", "a", "", "", "", ""]))
  //     playTurn(0);
  //   if (areArrsEqual(mappedGame, ["", "", "b", "b", "a", "", "", "", ""]))
  //     playTurn(0);
  //   if (areArrsEqual(mappedGame, ["b", "", "", "b", "a", "", "", "", ""]))
  //     playTurn(5);
  //   if (areArrsEqual(mappedGame, ["b", "", "b", "", "a", "", "", "", ""]))
  //     playTurn(1);
  //   if (areArrsEqual(mappedGame, ["", "b", "", "b", "a", "", "", "", ""]))
  //     playTurn(2);
  //   if (areArrsEqual(mappedGame, ["a", "b", "", "", "b", "", "", "", ""]))
  //     playTurn(7);
  //   if (areArrsEqual(mappedGame, ["", "", "b", "", "a", "b", "", "", ""]))
  //     playTurn(0);
  //   if (areArrsEqual(mappedGame, ["", "", "", "b", "a", "b", "", "", ""]))
  //     playTurn(0);
  //   if (areArrsEqual(mappedGame, ["", "", "", "", "a", "", "b", "b", ""]))
  //     playTurn(8);
  //   if (areArrsEqual(mappedGame, ["", "", "", "", "a", "b", "", "b", ""]))
  //     playTurn(0);
  //   if (areArrsEqual(mappedGame, ["", "", "", "", "a", "b", "", "", "b"]))
  //     playTurn(0);
  //   if (areArrsEqual(mappedGame, ["", "", "", "", "a", "", "b", "", "b"]))
  //     playTurn(7);
  //   if (areArrsEqual(mappedGame, ["", "", "", "", "a", "", "", "b", "b"]))
  //     playTurn(6);
};

container.addEventListener("click", onClick);

const resetGame = () => {
  game.forEach((v, i) => (game[i] = ""));
  mapGameToBoard();
  container.addEventListener("click", onClick);
  currentLetter = "x";
};

document.querySelector("#reset").addEventListener("click", resetGame);
