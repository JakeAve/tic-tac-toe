import { resetGame } from "./game.js";
import "./dialogPolyfill.js";

let isArtificialOponent = false;
let isArtificialX = false;
let globalDifficultyLevel = "easy";
let endLastGame = () => {}; // used to remove event listener on container

const reset = () => {
  endLastGame();
  const { endGame } = resetGame({
    isArtificialOponent,
    isArtificialX,
    onWin,
    onCatsGame,
    difficultyLevel: globalDifficultyLevel,
  });
  endLastGame = endGame;
};

const resetGameBtn = document.querySelector("#reset");
resetGameBtn.addEventListener("click", reset);

const gameSettingsDialog = document.querySelector("#game-settings-dialog");

const openSettings = () => {
  gameSettingsDialog.showModal();
  const data = captureFormData();
  cancelSettingsButton.addEventListener(
    "click",
    () => {
      aiOnToggle.checked = data.shouldUseArtificialOponent;
      [aiOnToggle, aiLetterToggle].forEach((t) =>
        t.dispatchEvent(new Event("change"))
      );
      gameSettingsDialog.close();
    },
    { once: true }
  );
};

const openSettingsButton = document.querySelector("#open-settings");
const cancelSettingsButton = document.querySelector("#cancel-settings");
openSettingsButton.addEventListener("click", openSettings);

const gameSettingsForm = document.querySelector("#game-settings-form");

const captureFormData = () => {
  const formData = new FormData(gameSettingsForm);
  let shouldUseArtificialOponent = false;
  let shouldArtificialBeX = false;
  let difficultyLevel = "hard";
  for (const [key, value] of formData) {
    if (key === "artificial-oponent" && value === "on")
      shouldUseArtificialOponent = true;
    if (key === "player-letter" && value === "o") shouldArtificialBeX = true;
    if (key === "difficulty-level") difficultyLevel = value;
  }
  return { shouldUseArtificialOponent, shouldArtificialBeX, difficultyLevel };
};

gameSettingsDialog.addEventListener("submit", () => {
  const { shouldUseArtificialOponent, shouldArtificialBeX, difficultyLevel } =
    captureFormData();
  isArtificialOponent = shouldUseArtificialOponent;
  isArtificialX = shouldArtificialBeX;
  globalDifficultyLevel = difficultyLevel;

  reset();
});

const aiOnToggle = document.querySelector("#ai-on-toggle");

aiOnToggle.addEventListener("change", (e) => {
  if (e.target.checked)
    e.target.closest(".toggle-wrapper").classList.add("checked");
  else e.target.closest(".toggle-wrapper").classList.remove("checked");

  if (e.target.id === "ai-on-toggle" && e.target.checked) {
    gameSettingsForm.querySelectorAll(".radio-btn-group").forEach((div) => {
      div.classList.remove("disabled");
    });
    gameSettingsForm
      .querySelectorAll('input[type="radio"]')
      .forEach((input) => (input.disabled = false));
  }

  if (e.target.id === "ai-on-toggle" && !e.target.checked) {
    gameSettingsForm.querySelectorAll(".radio-btn-group").forEach((div) => {
      div.classList.add("disabled");
    });
    gameSettingsForm
      .querySelectorAll('input[type="radio"]')
      .forEach((input) => (input.disabled = true));
  }
});

const messageDialog = document.querySelector("#message-dialog");
const closeMessageDialogBtn = document.querySelector("#close-message-dialog");

const showMessage = (title, message, closeBtnText = "Close") => {
  messageDialog.querySelector("h2").textContent = title;
  messageDialog.querySelector("p").textContent = message;
  closeMessageDialogBtn.textContent = closeBtnText;
  messageDialog.showModal();
};

const closeMessageDialog = () => messageDialog.close();

closeMessageDialogBtn.addEventListener("click", closeMessageDialog);

const onWin = (letter) => {
  showMessage(`Gotchya 👌`, `${letter.toUpperCase()} wins!`, "Try again");
};

const onCatsGame = () => {
  showMessage("Cat's Game 🐈", "It's a cat's game!", "Keep trying");
};

reset(); // start game
openSettings();
