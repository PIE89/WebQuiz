const circle = document.querySelector(".progress-ring__circle");
const progress = document.querySelector(".progress-ring__success");

let result;
let res;

getResult();
setProgress(res);

function getResult() {
  result = localStorage.getItem("result");
  res = Math.round((result / 3) * 100);
}

function setProgress(res) {
  let offset = 450 - 450 * (result / 3);

  circle.style.setProperty("--offset", offset);
  progress.textContent = `${res}%`;
}

console.log("result", result);
console.log("res", res);
