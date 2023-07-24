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

export { height, width, setHeight, setWidth };
