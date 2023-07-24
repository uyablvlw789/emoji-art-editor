import { height, width } from "./controlledInput.js";
// Current emoji art text
export let currentText = "";

// let emojiTextArr = [{ key: null, value: null }];

export function setCurrentText(newText) {
  if (newText) {
    currentText = newText;
  } else {
    currentText = "";
    const tiles = document.querySelectorAll(".tile");
    // console.log(tiles);

    if (tiles) {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          currentText += tiles[i * width + j].textContent;
        }
        currentText += "\n";
      }
    }
    // console.log(currentText);
  }
}
