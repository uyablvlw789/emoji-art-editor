import { currentText } from "./text.js";

const copyBtn = document.querySelector("#copy");
copyBtn.addEventListener("click", copyText);

async function copyText(e) {
  e.preventDefault();
  const { clipboard } = navigator;

  await clipboard.writeText(currentText);
}
