import { setCurrentEmoji } from "./currentSelectedEmoji.js";
import { PRODUCTION_MODE } from "./config.js";

let lang = getLangCode();

export const openEmojiPicker = function () {
  sideToolSet.classList.add("shown");
};

export const closeEmojiPicker = function () {
  sideToolSet.classList.remove("shown");
};

function getLangCode() {
  const lang = document.querySelector("html").getAttribute("lang");
  return lang;
}

const lastUsedLocal = localStorage.getItem("lastUsedLocal");
if (lastUsedLocal !== lang) {
  indexedDB.deleteDatabase("PicMo-en");
}

localStorage.setItem("lastUsedLocal", lang);

async function getEmojiData() {
  const URL = PRODUCTION_MODE
    ? `/emoji/emojiartgenerator/${lang}/data.json`
    : `./${lang}/data.json`;
  const emojiDataResponse = await fetch(URL);
  const emojiData = await emojiDataResponse.json();
  return emojiData;
}

async function getMessages() {
  const URL = PRODUCTION_MODE
    ? `/emoji/emojiartgenerator/${lang}/messages.json`
    : `./${lang}/messages.json`;
  const messagesResponse = await fetch(URL);
  const messages = await messagesResponse.json();
  return messages;
}

let picker;

export const currentSelection = document.querySelector(
  "#current-selection span"
);

console.log(currentSelection);

const body = document.querySelector("body");

// The picker must have a root element to insert itself into
const sideToolSet = document.querySelector("#side-tool-set");
sideToolSet.addEventListener("click", setCurrentEmoji);

const loading = document.querySelector("#current-selection .loading");

currentSelection.addEventListener("click", () => {
  if (!picker) {
    loading.classList.remove("hide");

    import("./picmo.js").then(async ({ createPicker }) => {
      // Create the picker
      const emojiData = await getEmojiData();

      const messages = await getMessages();

      picker = createPicker({
        rootElement: sideToolSet,
        emojiData,
        messages,
        i18n: "de",
      });
      loading.classList.add("hide");
      // The picker emits an event when an emoji is selected. Do with it as you will!
      picker.addEventListener("emoji:select", (event) => {
        setCurrentEmoji(event.emoji);
      });

      body.addEventListener("click", (e) => {
        if (
          e.target.closest("#side-tool-set") === sideToolSet ||
          e.target.closest("#current-selection span") === currentSelection
        ) {
          return;
        }
        closeEmojiPicker();
      });
    });
  }

  openEmojiPicker();
});
