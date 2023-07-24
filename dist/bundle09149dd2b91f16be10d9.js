/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PRODUCTION_MODE: () => (/* binding */ PRODUCTION_MODE)
/* harmony export */ });
const PRODUCTION_MODE = false;


/***/ }),

/***/ "./src/controlledInput.js":
/*!********************************!*\
  !*** ./src/controlledInput.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   height: () => (/* binding */ height),
/* harmony export */   setHeight: () => (/* binding */ setHeight),
/* harmony export */   setWidth: () => (/* binding */ setWidth),
/* harmony export */   width: () => (/* binding */ width)
/* harmony export */ });
const heightInput = document.querySelector("#stats input[name=height]");
const widthInput = document.querySelector("#stats input[name=width]");

let height = heightInput.value;
let width = widthInput.value;

const setHeight = function (heightToSet) {
  height = heightToSet;
  renderHeight(height);
};

const setWidth = function (widthToSet) {
  width = widthToSet;
  renderWidth(width);
};

const renderHeight = (newHeight) => {
  heightInput.value = newHeight;
};

const renderWidth = (newWidth) => {
  widthInput.value = newWidth;
};

heightInput.addEventListener("input", (event) => {
  // height = event.target.value > 50 ? 50 : event.target.value;
  setHeight(event.target.value)
  // renderHeight(height);
});

widthInput.addEventListener("input", (event) => {
  // width = event.target.value > 50 ? 50 : event.target.value;
  setWidth(event.target.value)
  // renderWidth(width);
});




/***/ }),

/***/ "./src/copyText.js":
/*!*************************!*\
  !*** ./src/copyText.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text.js */ "./src/text.js");


const copyBtn = document.querySelector("#copy");
copyBtn.addEventListener("click", copyText);

async function copyText(e) {
  e.preventDefault();
  const { clipboard } = navigator;

  await clipboard.writeText(_text_js__WEBPACK_IMPORTED_MODULE_0__.currentText);
}


/***/ }),

/***/ "./src/currentSelectedEmoji.js":
/*!*************************************!*\
  !*** ./src/currentSelectedEmoji.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   currentSelectedEmoji: () => (/* binding */ currentSelectedEmoji),
/* harmony export */   setCurrentEmoji: () => (/* binding */ setCurrentEmoji)
/* harmony export */ });
/* harmony import */ var _emojiPicker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emojiPicker.js */ "./src/emojiPicker.js");


let currentSelectedEmoji = "😍";

const setCurrentEmoji = (emoji) => {
  if (typeof emoji !== "string") return;
  (0,_emojiPicker_js__WEBPACK_IMPORTED_MODULE_0__.closeEmojiPicker)();
  currentSelectedEmoji = emoji;

  _emojiPicker_js__WEBPACK_IMPORTED_MODULE_0__.currentSelection.textContent = currentSelectedEmoji;
};


/***/ }),

/***/ "./src/download.js":
/*!*************************!*\
  !*** ./src/download.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const toPicBtn = document.querySelector("#to-picture");
const loading = document.querySelector("#to-picture .loading");

async function getScreenShot(e) {
  e.preventDefault();

  document.querySelector(".picture")?.remove();
  let c = document.querySelector("#board"); // or document.getElementById('canvas');
  loading.classList.remove("hide");

  __webpack_require__.e(/*! import() */ "src_html2canvas_esm_js").then(__webpack_require__.bind(__webpack_require__, /*! ./html2canvas.esm.js */ "./src/html2canvas.esm.js")).then(async (data) => {
    // console.log(data.default);
    const html2canvas = data.default;
    const canvas = await html2canvas(c);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.setAttribute("download", "emoji-art.png");
    link.setAttribute(
      "href",
      canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    );
    link.click();
    loading.classList.add("hide");
  });
}
toPicBtn.addEventListener("click", getScreenShot);


/***/ }),

/***/ "./src/emojiArtGeneratorState.js":
/*!***************************************!*\
  !*** ./src/emojiArtGeneratorState.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentItem: () => (/* binding */ getCurrentItem),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   redo: () => (/* binding */ redo),
/* harmony export */   renderBoardWithCurrentEmojiText: () => (/* binding */ renderBoardWithCurrentEmojiText),
/* harmony export */   undo: () => (/* binding */ undo),
/* harmony export */   updateHistory: () => (/* binding */ updateHistory)
/* harmony export */ });
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text.js */ "./src/text.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _controlledInput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controlledInput.js */ "./src/controlledInput.js");





let historyData = [];
let currentIndex = 0;

const init = function (initialState) {
  if (!initialState) {
    historyData = [];
  } else {
    historyData = [initialState];
    currentIndex = 0;
  }
};

const updateHistory = function (newState) {
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

const undo = function () {
  if (currentIndex === 0) {
    return "cannot undo anymore, you are in initial position";
  }
  currentIndex--;
};

const redo = function () {
  // 这种情况就是目前为止一直在操作，还没有进行任何undo操作，所以目前的指针在数组的最末尾，所以无法redo
  if (currentIndex === historyData.length - 1) {
    return "cannot redo !!!";
  }

  currentIndex++;
};

const getCurrentItem = function () {
  return historyData[currentIndex];
};

function renderBoardWithCurrentEmojiText() {
  const tiles = Array.from(document.querySelectorAll(".tile"));

  let currentTextArr = _text_js__WEBPACK_IMPORTED_MODULE_0__.currentText.split("\n");
  currentTextArr = currentTextArr.map((arr) => {
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.splitEmoji)(arr);
  });

  if (tiles) {
    for (let i = 0; i < _controlledInput_js__WEBPACK_IMPORTED_MODULE_2__.height; i++) {
      for (let j = 0; j < _controlledInput_js__WEBPACK_IMPORTED_MODULE_2__.width; j++) {
        if (tiles[i * _controlledInput_js__WEBPACK_IMPORTED_MODULE_2__.width + j]) {
          tiles[i * _controlledInput_js__WEBPACK_IMPORTED_MODULE_2__.width + j].textContent = currentTextArr[i][j];
        }
      }
    }
  }
}

const undoBtn = document.querySelector("#undo");
const redoBtn = document.querySelector("#redo");

undoBtn.addEventListener("click", () => {
  undo();
  (0,_text_js__WEBPACK_IMPORTED_MODULE_0__.setCurrentText)(getCurrentItem());
  renderBoardWithCurrentEmojiText();
});

redoBtn.addEventListener("click", () => {
  redo();
  (0,_text_js__WEBPACK_IMPORTED_MODULE_0__.setCurrentText)(getCurrentItem());
  renderBoardWithCurrentEmojiText();
});


/***/ }),

/***/ "./src/emojiPicker.js":
/*!****************************!*\
  !*** ./src/emojiPicker.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeEmojiPicker: () => (/* binding */ closeEmojiPicker),
/* harmony export */   currentSelection: () => (/* binding */ currentSelection),
/* harmony export */   openEmojiPicker: () => (/* binding */ openEmojiPicker)
/* harmony export */ });
/* harmony import */ var _currentSelectedEmoji_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentSelectedEmoji.js */ "./src/currentSelectedEmoji.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.js */ "./src/config.js");



let lang = getLangCode();

const openEmojiPicker = function () {
  sideToolSet.classList.add("shown");
};

const closeEmojiPicker = function () {
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
  const URL = _config_js__WEBPACK_IMPORTED_MODULE_1__.PRODUCTION_MODE
    ? `/emoji/emojiartgenerator/${lang}/data.json`
    : `./${lang}/data.json`;
  const emojiDataResponse = await fetch(URL);
  const emojiData = await emojiDataResponse.json();
  return emojiData;
}

async function getMessages() {
  const URL = _config_js__WEBPACK_IMPORTED_MODULE_1__.PRODUCTION_MODE
    ? `/emoji/emojiartgenerator/${lang}/messages.json`
    : `./${lang}/messages.json`;
  const messagesResponse = await fetch(URL);
  const messages = await messagesResponse.json();
  return messages;
}

let picker;

const currentSelection = document.querySelector(
  "#current-selection span"
);

console.log(currentSelection);

const body = document.querySelector("body");

// The picker must have a root element to insert itself into
const sideToolSet = document.querySelector("#side-tool-set");
sideToolSet.addEventListener("click", _currentSelectedEmoji_js__WEBPACK_IMPORTED_MODULE_0__.setCurrentEmoji);

const loading = document.querySelector("#current-selection .loading");

currentSelection.addEventListener("click", () => {
  if (!picker) {
    loading.classList.remove("hide");

    __webpack_require__.e(/*! import() */ "src_picmo_js").then(__webpack_require__.bind(__webpack_require__, /*! ./picmo.js */ "./src/picmo.js")).then(async ({ createPicker }) => {
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
        (0,_currentSelectedEmoji_js__WEBPACK_IMPORTED_MODULE_0__.setCurrentEmoji)(event.emoji);
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


/***/ }),

/***/ "./src/image2emojiart.js":
/*!*******************************!*\
  !*** ./src/image2emojiart.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controlledInput_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controlledInput.js */ "./src/controlledInput.js");
/* harmony import */ var _emojiArtGeneratorState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emojiArtGeneratorState.js */ "./src/emojiArtGeneratorState.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./src/index.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./text.js */ "./src/text.js");






let canvas = document.getElementById("emojify");
let form = document.querySelector("#emojify-form");

// const expandImageToEmojiArtBtn = document.querySelector("#expand-image-to-emoji-art-btn");
const formGroups = document.querySelector(".form-groups");

const activeClassName = "p-ss bg_blue text_white border_none radius_1 w-100 mb_1";

// expandImageToEmojiArtBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   this.className = activeClassName;
//   formGroups.classList.remove("hide");
//   // this.classList.add(activeClassName);
// });

let emojiSize = document.getElementsByName("emoji_size")[0];
let imgUpload = document.getElementsByName("img_upload")[0];
let btn = document.getElementById("emojify-btn");
let c = canvas.getContext("2d");
let W = 300;
let H = 300;
let S = 2;
let uploadFilename = "";
let img = null;

c.fillStyle = "#c7cad1";
c.fillRect(0, 0, W, H);
c.fillStyle = "#8f95a3";
c.font = "28px Hind";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText("Output", W / 2, H / 2);

class emojiSet {
  constructor(hue, emojiLevelArrays) {
    this.hue = hue;
    this.emojiLevelArrays = emojiLevelArrays;
  }
}

const emojiSets = [
  // lightness left-to-right, saturation top-to-bottom
  new emojiSet(0, [
    ["🛢", "🥊", "🌺", "🌺"],
    ["🥀", "🟥", "❤️", "👅"],
  ]),
  new emojiSet(30, [
    ["🟫", "🟫", "🟫", "🟫"],
    ["🟫", "🟫", "🟫", "🟫"],
  ]),
  new emojiSet(60, [
    ["📻", "🐤", "🐤", "📜"],
    ["🍰", "☀️", "🟨", "🏠"],
  ]),
  new emojiSet(90, [
    ["🪀", "🪀", "🪀", "🪀"],
    ["🌿", "🌳", "🤢", "🍏"],
  ]),
  new emojiSet(120, [
    ["🌲", "🇸🇦", "✅", "🍏"],
    ["🌲", "🚛", "🇸🇦", "🇸🇦"],
  ]),
  new emojiSet(150, [
    ["🔋", "🔋", "🥦", "👗"],
    ["🔋", "🔋", "📟", "🥒"],
  ]),
  new emojiSet(180, [
    ["🗣", "👤", "👕", "🤖"],
    ["🦋", "🐳", "🦋", "💧"],
  ]),
  new emojiSet(210, [
    ["📘", "🇸🇴", "🇪🇺", "🟦"],
    ["🟦", "🟦", "🟦", "🟦"],
  ]),
  new emojiSet(240, [
    ["🌑", "🗣", "👤", "🐦"],
    ["🌑", "🔷", "🔷", "🌌"],
  ]),
  new emojiSet(270, [
    ["🔮", "🔮", "🔮", "🔮"],
    ["🔮", "🔮", "🔮", "🔮"],
  ]),
  new emojiSet(300, [
    ["🍆", "🍠", "👚", "🐖"],
    ["📿", "🕺", "🤰🏼", "🦄"],
  ]),
  new emojiSet(330, [
    ["🧞‍♀️", "💗", "🎀", "👩‍🎤"],
    ["🍇", "🧞‍♀️", "💖", "🏩"],
  ]),
];

const adjustCanvasSize = function () {
  // to prevent emojis at right and bottom edges from being cut off
  let imgW = img.width,
    imgH = img.height,
    _imgW = imgW % emojiSize.value,
    _imgH = imgH % emojiSize.value;

  imgW -= _imgW;
  imgH -= _imgH;

  const aspectRatio = imgH / imgW;

  if (imgW > 512) {
    imgW = 512;
    imgH = 512 * aspectRatio;
  }

  canvas.width = imgW;
  canvas.height = imgH;

  c.drawImage(img, 0, 0, imgW, imgH);
  // c.drawImage(img, 0, 0, canvas.width, canvas.height);

  W = canvas.width;
  H = canvas.height;
};
const handleImgUpload = function (e) {
  var reader = new FileReader();

  reader.onload = function (ev) {
    img = new Image();
    img.onload = function () {
      adjustCanvasSize();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
};
const emojifyImage = function (e) {
  e.preventDefault();
  // force invalid input to default for emoji size
  if (emojiSize.value < +emojiSize.min || isNaN(emojiSize.value)) {
    emojiSize.value = +emojiSize.min;
  } else if (emojiSize.value > +emojiSize.max) {
    emojiSize.value = +emojiSize.max;
  }

  btn.disabled = true;
  btn.innerHTML = "Emojifying…";

  // prevent the emojified output from being emojified again
  if (uploadFilename == imgUpload.files[0].name) {
    c.clearRect(0, 0, W, H);
    adjustCanvasSize();
  } else {
    uploadFilename = imgUpload.files[0].name;
  }

  setTimeout(function () {
    let imgData = c.getImageData(0, 0, W, H),
      data = imgData.data,
      eSize = emojiSize.value;

    // c.clearRect(0, 0, W, H);

    c.font = eSize + "px serif";
    c.textAlign = "left";
    c.textBaseline = "top";

    // console.log("H / eSize", H / eSize);
    // console.log("W/ eSize", W / eSize);

    let heightToSet = Math.trunc(H / eSize);

    let widthToSet = Math.trunc(W / eSize);

    (0,_controlledInput_js__WEBPACK_IMPORTED_MODULE_0__.setHeight)(heightToSet);
    (0,_controlledInput_js__WEBPACK_IMPORTED_MODULE_0__.setWidth)(widthToSet);

    (0,_index_js__WEBPACK_IMPORTED_MODULE_2__.createBoard)(heightToSet, widthToSet);

    let newTextToSet = "";

    for (let Yp = 0; Yp < H / eSize; ++Yp) {
      for (let Xp = 0; Xp < W / eSize; ++Xp) {
        // get average color of grouped pixels
        let rs = 0,
          gs = 0,
          bs = 0,
          as = 0;
        for (let yp = 0; yp < eSize; ++yp) {
          for (let xp = 0; xp < eSize * 4; xp += 4) {
            let moveYInPixel = yp * W * 4,
              moveX = Xp * eSize * 4,
              moveY = Yp * W * eSize * 4,
              moveTo = moveYInPixel + moveX + moveY;

            rs += data[xp + moveTo] ** 2;
            gs += data[xp + 1 + moveTo] ** 2;
            bs += data[xp + 2 + moveTo] ** 2;
            as += data[xp + 3 + moveTo] ** 2;
          }
        }
        let ar = Math.round(Math.sqrt(rs / eSize ** 2)),
          ag = Math.round(Math.sqrt(gs / eSize ** 2)),
          ab = Math.round(Math.sqrt(bs / eSize ** 2)),
          aa = Math.round(Math.sqrt(as / eSize ** 2));

        // for better matchmaking, convert RGB to HSL
        let _r = ar / 255,
          _g = ag / 255,
          _b = ab / 255,
          cmax = Math.max(_r, _g, _b),
          cmin = Math.min(_r, _g, _b),
          delta = cmax - cmin;

        let hue = 0,
          sat = 0,
          light = 0;

        // get hue
        if (delta == 0) {
          hue = 0;
        } else if (cmax == _r) {
          hue = ((_g - _b) / delta) % 6;
        } else if (cmax == _g) {
          hue = (_b - _r) / delta + 2;
        } else {
          hue = (_r - _g) / delta + 4;
        }
        hue = Math.round(hue * 60);

        if (hue < 0) {
          hue += 360;
        }

        // get lightness and saturation
        (light = (cmax + cmin) / 2), (sat = delta == 0 ? 0 : delta / (1 - Math.abs(2 * light - 1)));

        sat = Math.round(sat * 100);
        light = Math.round(light * 100);

        // determine emoji closest to average color
        let filteredEmojis = emojiSets.filter((em) => Math.ceil(hue / 30) * 30 == em.hue),
          fltrResult = filteredEmojis.length ? filteredEmojis[0] : emojiSets[0],
          chosenEmoji = "";

        if (aa > 0) {
          if (light <= 0) {
            chosenEmoji = "⬛️";
          } else if (light >= 100) {
            chosenEmoji = "👻";
          } else if (sat <= 0) {
            chosenEmoji = "🌌";
          } else {
            if (sat > 100) {
              sat = 100;
            }
            chosenEmoji =
              fltrResult.emojiLevelArrays[Math.ceil(sat / 50) - 1][Math.ceil(light / 25) - 1];
          }
        }

        // c.fillText(chosenEmoji, eSize * (Xp % (W / eSize)), eSize * (Yp % (H / eSize)));
        newTextToSet += chosenEmoji;
      }
      newTextToSet += "\n";
    }
    // console.log(newTextToSet);
    (0,_text_js__WEBPACK_IMPORTED_MODULE_3__.setCurrentText)(newTextToSet);
    (0,_emojiArtGeneratorState_js__WEBPACK_IMPORTED_MODULE_1__.updateHistory)(_text_js__WEBPACK_IMPORTED_MODULE_3__.currentText);

    (0,_emojiArtGeneratorState_js__WEBPACK_IMPORTED_MODULE_1__.renderBoardWithCurrentEmojiText)();
    btn.disabled = false;
    btn.innerHTML = "Emojify!";
  }, 500);
  e.preventDefault();
};

const validateForm = function (e) {
  if (
    imgUpload.files.length &&
    imgUpload.files[0].type.match("image.*") &&
    emojiSize.value >= +emojiSize.min &&
    !isNaN(emojiSize.value) &&
    emojiSize.value <= +emojiSize.max
  ) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
};

btn.addEventListener("click", emojifyImage);

emojiSize.addEventListener("change", validateForm);
imgUpload.addEventListener("change", function (e) {
  handleImgUpload(e);
  validateForm(e);
});


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBoard: () => (/* binding */ createBoard)
/* harmony export */ });
/* harmony import */ var _controlledInput_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controlledInput.js */ "./src/controlledInput.js");
/* harmony import */ var _emojiPicker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emojiPicker.js */ "./src/emojiPicker.js");
/* harmony import */ var _currentSelectedEmoji_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currentSelectedEmoji.js */ "./src/currentSelectedEmoji.js");
/* harmony import */ var _social_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./social.js */ "./src/social.js");
/* harmony import */ var _image2emojiart_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./image2emojiart.js */ "./src/image2emojiart.js");
/* harmony import */ var _download_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./download.js */ "./src/download.js");
/* harmony import */ var _download_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_download_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _copyText_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./copyText.js */ "./src/copyText.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./text.js */ "./src/text.js");
/* harmony import */ var _emojiArtGeneratorState_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./emojiArtGeneratorState.js */ "./src/emojiArtGeneratorState.js");
// import html2canvas from "html2canvas";















const board = document.querySelector("#board");

const resizeBtn = document.querySelector("#resize");

function createBoard(height, width) {
  _emojiArtGeneratorState_js__WEBPACK_IMPORTED_MODULE_8__.init();

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
  (0,_text_js__WEBPACK_IMPORTED_MODULE_7__.setCurrentText)();
  _emojiArtGeneratorState_js__WEBPACK_IMPORTED_MODULE_8__.init(_text_js__WEBPACK_IMPORTED_MODULE_7__.currentText);
}

createBoard(_controlledInput_js__WEBPACK_IMPORTED_MODULE_0__.height, _controlledInput_js__WEBPACK_IMPORTED_MODULE_0__.width);

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
    targetTile.textContent = _currentSelectedEmoji_js__WEBPACK_IMPORTED_MODULE_2__.currentSelectedEmoji;
  }

  (0,_text_js__WEBPACK_IMPORTED_MODULE_7__.setCurrentText)();
  (0,_social_js__WEBPACK_IMPORTED_MODULE_3__.setSocialShareMessages)(_text_js__WEBPACK_IMPORTED_MODULE_7__.currentText);
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
  _emojiArtGeneratorState_js__WEBPACK_IMPORTED_MODULE_8__.updateHistory(_text_js__WEBPACK_IMPORTED_MODULE_7__.currentText);

  board.removeEventListener("mousemove", setEmojiToTarget);
});

board.addEventListener("mouseleave", () => {
  board.removeEventListener("mousemove", setEmojiToTarget);
});

board.addEventListener("touchend", () => {
  _emojiArtGeneratorState_js__WEBPACK_IMPORTED_MODULE_8__.updateHistory(_text_js__WEBPACK_IMPORTED_MODULE_7__.currentText);
  board.removeEventListener("touchmove", setEmojiToTarget);
});

resizeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createBoard(_controlledInput_js__WEBPACK_IMPORTED_MODULE_0__.height, _controlledInput_js__WEBPACK_IMPORTED_MODULE_0__.width);
});


/***/ }),

/***/ "./src/social.js":
/*!***********************!*\
  !*** ./src/social.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setSocialShareMessages: () => (/* binding */ setSocialShareMessages)
/* harmony export */ });
// current url·
const link = encodeURI(window.location.href);

// Select social icons
const fb = document.querySelector(".facebook");
const twitter = document.querySelector(".twitter");
const linkedIn = document.querySelector(".linkedin");
const reddit = document.querySelector(".reddit");

// let msg = encodeURIComponent(`I created an emoji art\n${currentText}`);

const title = encodeURIComponent(document.querySelector("title").textContent);

fb.href = `https://www.facebook.com/share.php?u=${link}`;

linkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;

function setSocialShareMessages(currentText) {
  let msg = encodeURIComponent(`I created an emoji art\n${currentText}`);
  twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=emoji,emojiart`;
  reddit.href = `http://www.reddit.com/submit?title=I created an emoji art&text=${msg}`;
}


/***/ }),

/***/ "./src/text.js":
/*!*********************!*\
  !*** ./src/text.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   currentText: () => (/* binding */ currentText),
/* harmony export */   setCurrentText: () => (/* binding */ setCurrentText)
/* harmony export */ });
/* harmony import */ var _controlledInput_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controlledInput.js */ "./src/controlledInput.js");

// Current emoji art text
let currentText = "";

// let emojiTextArr = [{ key: null, value: null }];

function setCurrentText(newText) {
  if (newText) {
    currentText = newText;
  } else {
    currentText = "";
    const tiles = document.querySelectorAll(".tile");
    // console.log(tiles);

    if (tiles) {
      for (let i = 0; i < _controlledInput_js__WEBPACK_IMPORTED_MODULE_0__.height; i++) {
        for (let j = 0; j < _controlledInput_js__WEBPACK_IMPORTED_MODULE_0__.width; j++) {
          currentText += tiles[i * _controlledInput_js__WEBPACK_IMPORTED_MODULE_0__.width + j].textContent;
        }
        currentText += "\n";
      }
    }
    // console.log(currentText);
  }
}


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   splitEmoji: () => (/* binding */ splitEmoji)
/* harmony export */ });
/**
 *
 * @param {*} string
 * @returns array of characters
 */
const splitEmoji = (string) =>
  [...new Intl.Segmenter().segment(string)].map((x) => x.segment);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle" + __webpack_require__.h() + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("09149dd2b91f16be10d9")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "fabric-test:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkfabric_test"] = self["webpackChunkfabric_test"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle09149dd2b91f16be10d9.js.map