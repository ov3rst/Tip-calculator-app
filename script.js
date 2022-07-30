const d = document,
  $form = d.getElementById("tip-form"),
  $tipAmount = d.getElementById("tip-amount"),
  $personAmount = d.getElementById("person-amount"),
  $tips = d.querySelectorAll("input[disabled]"),
  $number = d.querySelectorAll("input[type='number']"),
  $btn = d.querySelector(".screen-btn");

const validations = () => {
  return (
    !$form.total.value ||
    !$form.person.value ||
    $form.total.value <= 0 ||
    $form.person.value <= 0
  );
};

const selectedTip = (elem) => {
  $tips.forEach((el) => el.classList.remove("active"));
  elem.classList.add("active");
};

const inputValue = () => {
  for (let i = 0; i < $number.length; i++) {
    if ($number[i].value) return false;
  }
  return true;
};

const reset = () => {
  $btn.classList.remove("active");
  $btn.setAttribute("disabled", "true");
  $number.forEach((el) => (el.value = ""));
  $tips.forEach((el) => el.classList.remove("active"));
  $tipAmount.textContent = "0.00";
  $personAmount.textContent = "0.00";
};

const errorMsj = () => {
  d.querySelectorAll("input[placeholder^='0']").forEach((el) => {
    if (!el.value || el.value <= 0) {
      el.closest("div").classList.add("active");
      el.nextElementSibling.classList.add("active");
    }
  });

  setTimeout(() => {
    d.querySelectorAll("input[placeholder^='0']").forEach((el) => {
      el.closest("div").classList.remove("active");
      el.nextElementSibling.classList.remove("active");
    });
  }, 2000);
};

const render = (value) => {
  let tip = $form.total.value * value || ($form.total.value * value) / 100,
    totalPerson = $form.total.value / $form.person.value + tip;

  $tipAmount.textContent = tip.toFixed(2);
  $personAmount.textContent = totalPerson.toFixed(2);
};

d.addEventListener("click", (e) => {
  if (e.target.matches("input[disabled]")) {
    if (validations()) {
      errorMsj();
    } else {
      selectedTip(e.target);
      render(e.target.dataset.value);
    }
  }

  if (e.target === $btn) reset();
});

d.addEventListener("input", (e) => {
  if (e.target.matches("input[type='number']")) {
    $btn.removeAttribute("disabled");
    $btn.classList.add("active");

    if (inputValue()) {
      $btn.setAttribute("disabled", "");
      $btn.classList.remove("active");
    }
  }

  if (e.target.matches("input[name='custom']")) {
    $tips.forEach((el) => el.classList.remove("active"));

    if (!validations()) {
      render(e.target.value / 100);
    } else {
      errorMsj();
    }
  }
});
