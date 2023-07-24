import { closeEmojiPicker, currentSelection } from "./emojiPicker.js";

export let currentSelectedEmoji = "😍";

export const setCurrentEmoji = (emoji) => {
  if (typeof emoji !== "string") return;
  closeEmojiPicker();
  currentSelectedEmoji = emoji;

  currentSelection.textContent = currentSelectedEmoji;
};
