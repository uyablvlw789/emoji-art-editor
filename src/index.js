// import html2canvas from "html2canvas";
import { height, width } from "./controlledInput.js";
import "./emojiPicker.js";
import {
  currentSelectedEmoji,
  setCurrentEmoji,
} from "./currentSelectedEmoji.js";
import { setSocialShareMessages } from "./social.js";

import "./image2emojiart.js";

import "./download.js";

import "./copyText.js";

import { currentText, setCurrentText } from "./text.js";

import * as emojiArtGeneratorState from "./emojiArtGeneratorState.js";

const board = document.querySelector("#board");

const resizeBtn = document.querySelector("#resize");

export function createBoard(height, width) {
  emojiArtGeneratorState.init();

  board.innerHTML = "";
  board.style.setProperty("--height", height);
  board.style.setProperty("--width", width);

  // if (width > 15) {
  board.style.setProperty("--size", `min(${85 / width}vmin, 2.5rem)`);
  // board.style.fontSize = `${70 / width}vmin`;
  board.style.fontSize = `min(${80 / width}vmin, 2.25rem)`;
  // } else {
  //   board.style.setProperty("--size", `${85 / width}vmin`);
  //   board.style.fontSize = `${80 / width}vmin`;
  // }

  for (let i = 0; i < +height; i++) {
    for (let j = 0; j < +width; j++) {
      const element = document.createElement("div");
      element.textContent = "⬜️";
      element.classList.add("tile");
      const key = i * width + j + 1;
      element.setAttribute("key", key);
      board.appendChild(element);
    }
  }
  setCurrentText();
  emojiArtGeneratorState.init(currentText);
}

createBoard(height, width);

document.querySelector("#main .loading").classList.add("hide");

const setEmojiToTarget = (e) => {
  e.preventDefault();
  let targetTile;
  if (e.touches) {
    targetTile = document
      .elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      .closest(".tile");
  } else {
    targetTile = e.target.closest(".tile");
  }
  if (targetTile) {
    targetTile.textContent = currentSelectedEmoji;
  }

  setCurrentText();
  setSocialShareMessages(currentText);
};

board.addEventListener("click", setEmojiToTarget);

board.addEventListener("mousedown", (e) => {
  e.preventDefault();
  board.addEventListener("mousemove", setEmojiToTarget);
});

board.addEventListener("touchstart", (e) => {
  e.preventDefault();
  setEmojiToTarget(e);
  board.addEventListener("touchmove", setEmojiToTarget);
});

board.addEventListener("mouseup", () => {
  emojiArtGeneratorState.updateHistory(currentText);

  board.removeEventListener("mousemove", setEmojiToTarget);
});

board.addEventListener("mouseleave", () => {
  board.removeEventListener("mousemove", setEmojiToTarget);
});

board.addEventListener("touchend", () => {
  emojiArtGeneratorState.updateHistory(currentText);
  board.removeEventListener("touchmove", setEmojiToTarget);
});

resizeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createBoard(height, width);
});
