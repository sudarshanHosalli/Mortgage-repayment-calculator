const checkBoxes = document.querySelectorAll(".single-checkbox");
const checkboxContainers = document.querySelectorAll(".checkbox-container");
const customCheckbox = document.querySelectorAll(".custom-checkbox");
const customCheckboxDot = document.querySelectorAll(".dot");
const resultSection = document.querySelector(".result-section");
const inputs = document.querySelectorAll(".input");
const MortgageAmount = document.querySelector(".Mortgage-Amount");
const MortgageTerm = document.querySelector(".Mortgage-Term");
const InterestRate = document.querySelector(".Interest-Rate");
const calculateBtn = document.querySelector(".calculate-btn");
const formRow = document.querySelectorAll(".form-row");
const checkboxGroup = document.querySelector(".checkbox-group");
const iconsContainer = document.querySelectorAll(".icons");
const clearAllBtn = document.querySelector(".clear-all");

function checkBoxesEvents() {
  checkBoxes.forEach((checkBox, idx) => {
    checkBox.addEventListener("change", () => {
      handleCheckboxChange(idx, checkBox.checked);
    });
  });
}

checkboxContainers.forEach((checkboxContainer, idx) => {
  checkboxContainer.addEventListener("click", () => {
    const checkBox = checkBoxes[idx];
    checkBox.checked = !checkBox.checked;
    handleCheckboxChange(idx, checkBox.checked);
  });
});

function handleCheckboxChange(idx, isChecked) {
  if (isChecked) {
    applyStyleCheckBoxes(idx);
    checkBoxes.forEach((cb, cbIdx) => {
      if (cbIdx !== idx) {
        cb.checked = false;
        removeStyleCheckBoxes(cbIdx);
      }
    });
  } else {
    removeStyleCheckBoxes(idx);
  }
}

function applyStyleCheckBoxes(idx) {
  checkboxContainers[idx].style.outline = "2px solid  hsl(61, 70%, 52%)";
  checkboxContainers[idx].style.background = "rgb(215 218 47 / 25%)";
  customCheckbox[idx].style.outline = "2px solid  hsl(61, 70%, 52%)";
  customCheckboxDot[idx].style.display = "flex";
}

function removeStyleCheckBoxes(idx) {
  checkboxContainers[idx].style.outline = "1.5px solid hsl(186, 15%, 59%)";
  customCheckbox[idx].style.outline = "2px solid  hsl(186, 15%, 59%)";
  checkboxContainers[idx].style.background = "hsl(0, 0%, 100%)";
  customCheckboxDot[idx].style.display = "none";
}

function renderEmptyResultSection() {
  if (!document.querySelector(".empty")) {
    resultSection.innerHTML += `
<div class="empty" >
 <img class="illustration-empty" src="./assets/images/illustration-empty.svg" alt="empty">
 <div class="ResultsShownHere-container">
   <h2>Results shown here</h2>
   <p>Complete the form and click “calculate repayments” to see
    what your monthly repayments would be.
    </p>
 </div>
</div>
    `;
  }
}

function hideEmptyResultSection() {
  const emptySection = document.querySelector(".empty");
  if (emptySection) {
    emptySection.style.display = "none";
  }
}

function showEmptyResultSection() {
  const emptySection = document.querySelector(".empty");
  if (emptySection) {
    emptySection.style.display = "block";
  }
}

function renderResultSection(monthlyRepayments, repayOverTheTerm) {
  if (!document.querySelector(".Results-container")) {
    resultSection.innerHTML += `
            <div class="Results-container">
            <h2>Your results</h2>
            <p>
              Your results are shown below based on the information you provided.
              To adjust the results, edit the form and click “calculate
              repayments” again.
            </p>
            <div class="results">
              <div class="repayments">
                <span>Your monthly repayments</span>
                <p class="monthly-repayments">${monthlyRepayments}</p>
              </div>
              <hr class="hr-class" />
              <div class="total-repay">
                <span>Total you'll repay over the term</span>
                <p class="total-repay-term">${repayOverTheTerm}</p>
              </div>
            </div>
          </div>
    `;
  } else {
    document.querySelector(".monthly-repayments").textContent =
      monthlyRepayments;
    document.querySelector(".total-repay-term").textContent = repayOverTheTerm;
  }
}

function hideResultSection() {
  const emptySection = document.querySelector(".Results-container ");
  if (emptySection) {
    emptySection.style.display = "none";
  }
}

function showResultSection() {
  const emptySection = document.querySelector(".Results-container ");
  if (emptySection) {
    emptySection.style.display = "flex";
  }
}

function calculateMortgage(amount, interestRate, mortgageTerm) {
  const monthlyRate = interestRate / 12 / 100;
  const totalPayments = mortgageTerm * 12;

  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);

  const totalRepayment = monthlyPayment * totalPayments;

  // Step 5: Calculate the total interest paid (total repayment - principal)
  const totalInterest = totalRepayment - amount;

  // Step 6: Calculate the interest-only repayment (monthly interest on principal)
  const interestOnlyPayment = amount * monthlyRate;

  return {
    monthlyPayment: monthlyPayment.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    }),
    totalRepayment: totalRepayment.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    }),
    totalInterest: totalInterest.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    }),
    interestOnlyPayment: interestOnlyPayment.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    }),
  };
}

// Example usage:
const amount = 300000; // Loan amount in currency
const interestRate = 5.25; // Annual interest rate in percentage
const mortgageTerm = 25; // Loan term in mortgageTerm

const result = calculateMortgage(amount, interestRate, mortgageTerm);
console.log(`Monthly Payment: ${result.monthlyPayment}`);
console.log(`Total Repayment Over the Term: ${result.totalRepayment}`);
console.log(`Interest-Only Payment: ${result.interestOnlyPayment}`);

function inputValidation() {
  inputs.forEach((input, idx) => {
    const formRowElement = formRow[idx];
    let existingError = formRowElement.querySelector(".error-msg");

    if (existingError) {
      formRowElement.removeChild(existingError);
    }

    const isAnyCheckboxChecked = Array.from(checkBoxes).some(
      (checkbox) => checkbox.checked
    );

    if (!isAnyCheckboxChecked) {
      hasErrors = true;
      if (!document.querySelector(".checkbox-error")) {
        checkboxGroup.insertAdjacentHTML(
          "afterend",
          `<span class="error-msg checkbox-error">This field is required</span>`
        );
      }
    } else {
      document.querySelectorAll(".checkbox-error").forEach((errorMsg) => {
        errorMsg.remove();
      });
    }

    if (!input.value.trim()) {
      const errorElement = document.createElement("span");
      errorElement.classList.add("error-msg");
      errorElement.textContent = "This field is required";
      formRowElement.appendChild(errorElement);
      iconsContainer[idx].style.backgroundColor = "hsl(4, 69%, 50%)";
      input.style.outline = "1.7px solid hsl(4, 69%, 50%)";
    } else {
      iconsContainer[idx].style.backgroundColor = "hsl(202, 86%, 94%)";
      input.style.outline = "1.7px solid hsl(200, 24%, 40%)";
    }
  });
}

function getInputValues() {
  const amount = MortgageAmount.value.trim();
  const term = MortgageTerm.value.trim();
  const rate = InterestRate.value.trim();
  let selectedCheckbox = null;
  checkBoxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedCheckbox = {
        id: checkbox.id,
        checked: checkbox.checked,
      };
    }
  });

  if (!amount || !term || !rate || !selectedCheckbox) {
    console.log("skibidi");
  } else {
    console.log(
      amount,
      term,
      rate,
      selectedCheckbox.id,
      selectedCheckbox.checked,
      hideEmptyResultSection(),
      showResultSection()
    );

    const result = calculateMortgage(amount, rate, term);

    if (selectedCheckbox.id === "Repayment") {
      renderResultSection(result.monthlyPayment, result.totalRepayment);
    } else if (selectedCheckbox.id === "Interest-Only") {
      renderResultSection(result.interestOnlyPayment, result.totalInterest);
    }
  }
}

clearAllBtn.addEventListener("click", () => {
  inputs.forEach((input, idx) => {
    input.value = "";
  });
  checkBoxes.forEach((checkBox, idx) => {
    if (checkBox.checked) {
      checkBox.checked = false;
      removeStyleCheckBoxes(idx);
    }
  });
  showEmptyResultSection();
  hideResultSection();
});

calculateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inputValidation();
  getInputValues();
});

renderEmptyResultSection();
hideResultSection();
