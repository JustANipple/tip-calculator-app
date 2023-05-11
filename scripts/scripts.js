/* Variables */
const billAndPeople = document.querySelectorAll(".compile_input"); //bill and people inputs
const customTip = document.querySelector(".tip_custom"); //custom tip
const tipBtns = document.querySelectorAll(".tip_percentage"); //tip
const amountTip = document.querySelector(".tip_value .value_number"); //tip amount
const amountTot = document.querySelector(".total_value .value_number"); //total
const resetBtn = document.querySelector(".reset"); //reset

/* Events */
for(const input of billAndPeople) {
    input.addEventListener("input", () => {
        checkInput(input);
        enableReset();
        calculateAmount();
    });
}

customTip.addEventListener("input", () => {
    checkInput(customTip);
    resetButtons();
    enableReset();
    calculateAmount();
})

for(const btn of tipBtns) {
    btn.style.transition = "filter .5s ease-in-out";
    btn.addEventListener("click", (e) => {
        changeStatus(btn, e);
        resetCustom();
        enableReset();
        calculateAmount();
    });
}

resetBtn.addEventListener("click", resetForm);
resetBtn.style.transition = "filter .5s ease-in-out";

/* Functions */
function checkInput(obj) {
    const error = obj.parentElement.parentElement.querySelector(".label_error");
    let cont = obj.parentElement;
    if(!error) {
        cont = obj;
    }
    if(obj.value < 0) {
        obj.setCustomValidity("must be greater than 0");
        cont.setAttribute("id", "error");
    } else if (obj.value === "0") {
        cont.setAttribute("id", "error");
        if(error) {
            error.style.opacity = "1";
            error.style.visibility = "visible";
        }
    } else if (obj.value === "") {
        obj.setCustomValidity("compile this");
        cont.setAttribute("id", "");
        if(error) {
            error.style.opacity = "0";
            error.style.visibility = "hidden";
        }
    } else {
        obj.setCustomValidity("");
        cont.setAttribute("id", "valid");  
        if(error) {
            error.style.opacity = "0";
            error.style.visibility = "hidden";
        }
    }
}

function resetInputs() {
    for(const input of billAndPeople) {
        const error = input.parentElement.parentElement.querySelector(".label_error");
        const inCont = input.parentElement;
        inCont.setAttribute("id", "");
        input.value = "";
        error.style.visibility = "hidden";
        error.style.opacity = "0";
    }
}

function resetButtons() {
    for(const btn of tipBtns) {
        btn.setAttribute("id", "");
    }
}

function resetCustom() {
    customTip.setAttribute("id", "");
    customTip.value = "";
}

function resetAmounts() {
    amountTot.textContent = "0.00";
    amountTip.textContent = "0.00";
}

function changeStatus(btn, e) {
    e.preventDefault();
    resetButtons();
    btn.setAttribute("id", "chosen");
}

function enableReset() {
    resetBtn.disabled = false;
}

function resetForm() {
    resetInputs();
    resetButtons();
    resetCustom();
    resetAmounts();
    resetBtn.disabled = true;
}

function getBill() {
    if(billAndPeople[0].parentElement.getAttribute("id") === "valid") {
        return billAndPeople[0].value;
    } else {
        return 0;
    }
}

function getPeople() {
    if(billAndPeople[1].parentElement.getAttribute("id") === "valid") {
        return billAndPeople[1].value;
    } else {
        return 0;
    }
}

function getTip() {
    for(const btn of tipBtns) {
        if(btn.getAttribute("id") === "chosen") {
            return btn.textContent.replace("%", "");
        } else if (customTip.getAttribute === "valid") {
            return customTip.value;
        }
    }
}

function calculateAmount() {
    const billValue = parseInt(getBill());
    const peopleValue = getPeople();
    const tipValue = getTip();

    if(billValue > 0 && peopleValue > 0 && tipValue > 0) {
        const tipTotal = (billValue / peopleValue / 100 * 15).toFixed(2);
        amountTip.textContent = tipTotal ;
        const totalAmount = ((tipTotal * peopleValue + billValue) / peopleValue).toFixed(2);
        amountTot.textContent = totalAmount;
    } else {
        amountTip.textContent = "0.00";
        amountTot.textContent = "0.00";
    }
}