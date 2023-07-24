import { setWidth, setHeight, height, width } from "./controlledInput.js";
import { renderBoardWithCurrentEmojiText, updateHistory } from "./emojiArtGeneratorState.js";

import { createBoard } from "./index.js";
import { currentText, setCurrentText } from "./text.js";

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

    setHeight(heightToSet);
    setWidth(widthToSet);

    createBoard(heightToSet, widthToSet);

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
    setCurrentText(newTextToSet);
    updateHistory(currentText);

    renderBoardWithCurrentEmojiText();
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
