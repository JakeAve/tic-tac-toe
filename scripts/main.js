import { resetGame } from "./game.js";
import "./dialogPolyfill.js";

let isArtificialOponent = false;
let isArtificialX = false;
let endLastGame = () => {}; // used to remove event listener on container

const reset = () => {
  endLastGame();
  const { endGame } = resetGame(
    isArtificialOponent,
    isArtificialX,
    onWin,
    onCatsGame
  );
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
      aiLetterToggle.checked = data.shouldArtificialBeX;
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
  for (const [key, value] of formData) {
    if (key === "artificial-oponent" && value === "on")
      shouldUseArtificialOponent = true;
    if (key === "artificial-oponent-letter" && value === "x")
      shouldArtificialBeX = true;
  }
  return { shouldUseArtificialOponent, shouldArtificialBeX };
};

gameSettingsDialog.addEventListener("submit", () => {
  const { shouldUseArtificialOponent, shouldArtificialBeX } = captureFormData();
  isArtificialOponent = shouldUseArtificialOponent;
  isArtificialX = shouldArtificialBeX;

  reset();
});

const aiOnToggle = document.querySelector("#ai-on-toggle");
const aiLetterToggle = document.querySelector("#ai-letter-toggle");
const toggleCheckboxes = [aiOnToggle, aiLetterToggle];

toggleCheckboxes.forEach((cb) =>
  cb.addEventListener("change", (e) => {
    if (e.target.checked)
      e.target.closest(".toggle-wrapper").classList.add("checked");
    else e.target.closest(".toggle-wrapper").classList.remove("checked");

    if (e.target.id === "ai-on-toggle" && e.target.checked) {
      aiLetterToggle.closest(".toggle-wrapper").classList.remove("disabled");
      aiLetterToggle.closest(".switch-and-label").classList.remove("disabled");
      aiLetterToggle.disabled = false;
    }
    if (e.target.id === "ai-on-toggle" && !e.target.checked) {
      aiLetterToggle.closest(".toggle-wrapper").classList.add("disabled");
      aiLetterToggle.closest(".switch-and-label").classList.add("disabled");
      aiLetterToggle.disabled = true;
    }
  })
);

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
