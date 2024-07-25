const cards = document.querySelectorAll(".plate");
const btnsNext = document.querySelectorAll('[data-nav="next"]');
const btnsPrev = document.querySelectorAll('[data-nav="prev"]');
const submitForm = document.querySelector("#submitForm");
const telInput = document.querySelector("#tel");
const policyInput = document.querySelector("#policy");

let quiz = new Map();
quiz.set("correctAnswers", [
  "Hyper Text Markup Language",
  "Сайты для всех браузеров и платформ",
]);

cards.forEach((card) => {
  card.classList.add("none");
});

let currentIndex = 0;

cards[currentIndex].classList.remove("none");
cards[currentIndex].classList.add("visible");

btnsPrev[0].remove();

checkOnAnswers(currentIndex);

progressBarEdit(currentIndex);

mask("#tel");

// прослушки событий (кликов)

btnsNext.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (checkOnAnswers(currentIndex) === true) {
      quiz.set(currentIndex, getAnswers(currentIndex));

      if (currentIndex < 4) {
        currentIndex += 1;
        progressBarEdit(currentIndex);
        setTimeout(() => {
          cards[currentIndex - 1].classList.remove("visible");

          setTimeout(() => {
            cards[currentIndex - 1].classList.add("none");
            cards[currentIndex].classList.remove("none");

            setTimeout(() => {
              cards[currentIndex].classList.add("visible");
            }, 100);
          }, 500);
        }, 500);
      }
    } else {
      cards[currentIndex]
        .querySelector("[data-answers]")
        .classList.add("required");
    }

    if (currentIndex === 3) {
      checkCorrectAnswers(quiz);
    }
  });
});

btnsPrev.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      progressBarEdit(currentIndex);

      setTimeout(() => {
        cards[currentIndex + 1].classList.remove("visible");
        setTimeout(() => {
          cards[currentIndex + 1].classList.add("none");
          cards[currentIndex].classList.remove("none");

          setTimeout(() => {
            cards[currentIndex].classList.add("visible");
          }, 100);
        }, 500);

        cards[currentIndex]
          .querySelector("[data-answers]")
          .classList.remove("required");
      }, 500);
    }
  });
});

submitForm.onclick = function () {
  if (telInput.value === "+" || telInput.value.length < 6) {
    telInput.value = "";
  }
};

policyInput.addEventListener("focus", () => {
  policyInput.closest(".checkbox").classList.add("hovered");
});

policyInput.addEventListener("blur", () => {
  policyInput.closest(".checkbox").classList.remove("hovered");
});

// Функции

function checkOnAnswers(currentIndex) {
  let radioBtns = cards[currentIndex].querySelectorAll("[type='radio']");
  let checkBoxs = cards[currentIndex].querySelectorAll("[type='checkbox']");

  if (radioBtns.length > 0) {
    for (let radioBtn of radioBtns) {
      if (radioBtn.checked === true) {
        return true;
      }
    }
  }

  if (checkBoxs.length > 0) {
    for (let checkBox of checkBoxs) {
      if (checkBox.checked === true) {
        return true;
      }
    }
  }
}

function getAnswers(currentIndex) {
  let radioBtns = cards[currentIndex].querySelectorAll("[type='radio']");
  let checkBoxs = cards[currentIndex].querySelectorAll("[type='checkbox']");

  let result = [];

  if (radioBtns.length > 0) {
    for (let radioBtn of radioBtns) {
      if (radioBtn.checked === true) {
        result.push(radioBtn.value);
      }
    }
  }

  if (checkBoxs.length > 0) {
    for (let checkBox of checkBoxs) {
      if (checkBox.checked === true) {
        result.push(checkBox.name);
      }
    }
  }

  return result;
}

function progressBarEdit(currentIndex) {
  const progressBars = document.querySelectorAll(".progress__line-bar");
  const progressLabels = document.querySelectorAll(".progress__label");

  let result = Math.ceil((currentIndex / (cards.length - 1)) * 100);

  for (let progressBar of progressBars) {
    progressBar.style.width = `${result}%`;
  }

  for (let progressLabel of progressLabels) {
    progressLabel.innerHTML = `Готово: <strong>${result}%</strong>`;
  }
}

function checkCorrectAnswers(quiz) {
  let result = 0;
  for (let i = 0; i < cards.length - 1; i++) {
    let answer = quiz.get(i)[0];

    if (quiz.get("correctAnswers").includes(answer)) {
      result += 1;
    }
  }

  quiz.set("result", result);
  localStorage.setItem("result", JSON.stringify(result));
}
