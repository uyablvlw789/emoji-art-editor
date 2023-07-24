import { currentText, setCurrentText } from "./text.js";
import { splitEmoji } from "./utils.js";

import { height, width } from "./controlledInput.js";

let historyData = [];
let currentIndex = 0;

export const init = function (initialState) {
  if (!initialState) {
    historyData = [];
  } else {
    historyData = [initialState];
    currentIndex = 0;
  }
};

export const updateHistory = function (newState) {
  // debugger;
  // 这种情况就是目前为止一直在操作，没有undo，所以目前的指针在数组的最末尾
  if (currentIndex === historyData.length - 1) {
    historyData.push(newState);
    currentIndex++;
  }
  // 这种情况就是之前有undo过，所以目前的指针不在数组末尾，这个时候要舍弃掉currentIndex之后的部分
  else {
    historyData.length = currentIndex + 1;
    const preservedItems = historyData.length;
    historyData.push(newState);
    currentIndex++;
    console.log(`history rewritten, preserved ${preservedItems} items`);
  }
};

export const undo = function () {
  if (currentIndex === 0) {
    return "cannot undo anymore, you are in initial position";
  }
  currentIndex--;
};

export const redo = function () {
  // 这种情况就是目前为止一直在操作，还没有进行任何undo操作，所以目前的指针在数组的最末尾，所以无法redo
  if (currentIndex === historyData.length - 1) {
    return "cannot redo !!!";
  }

  currentIndex++;
};

export const getCurrentItem = function () {
  return historyData[currentIndex];
};

export function renderBoardWithCurrentEmojiText() {
  const tiles = Array.from(document.querySelectorAll(".tile"));

  let currentTextArr = currentText.split("\n");
  currentTextArr = currentTextArr.map((arr) => {
    return splitEmoji(arr);
  });

  if (tiles) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (tiles[i * width + j]) {
          tiles[i * width + j].textContent = currentTextArr[i][j];
        }
      }
    }
  }
}

const undoBtn = document.querySelector("#undo");
const redoBtn = document.querySelector("#redo");

undoBtn.addEventListener("click", () => {
  undo();
  setCurrentText(getCurrentItem());
  renderBoardWithCurrentEmojiText();
});

redoBtn.addEventListener("click", () => {
  redo();
  setCurrentText(getCurrentItem());
  renderBoardWithCurrentEmojiText();
});
