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

export function setSocialShareMessages(currentText) {
  let msg = encodeURIComponent(`I created an emoji art\n${currentText}`);
  twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=emoji,emojiart`;
  reddit.href = `http://www.reddit.com/submit?title=I created an emoji art&text=${msg}`;
}
