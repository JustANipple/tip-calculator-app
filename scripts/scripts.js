/*
TO_DO:
Bill states:
-Border green when pattern is valid
-Border red when pattern is invalid
-Error label shown when pattern is invalid
-Cursor pointer when hovered

Tip buttons states:
-On hover, saturate(.375) brightness(1.375)
-On click, change its color, save its state and reset the custom tip
-On another click, make all btns to default except it

Custom tip states:
-Border green when pattern is valid
-Border red when pattern is invalid
-Cursor pointer when hovered
-On change, reset tip btns

People number states:
-Border green when pattern is valid
-Border red when pattern is invalid
-Error label shown when pattern is invalid
-Cursor pointer when hovered

Reset states:
-Enable it when any input is entered
-On click, make all the inputs reset
-On hover, saturate(.375) brightness(1.375)

Amounts states:
-Amounts update if bill, any tip and people number is compiled and valid
*/

/* === Bill and People number Input === */
const inputElems = document.querySelectorAll(".compile_input");
//if you need to pass an argument to the function you're calling, use the arrow function so that the function doesn't get instantly called
for(const elem of inputElems) {
    elem.addEventListener("input", () => {
        checkInput(elem);
        checkIfEmpty();
    });
}
function checkInput(obj) {
    const errorLabel = obj.parentElement.parentElement.querySelector(".label_error");
    obj.parentElement.style.transition = "all .5s ease-in-out";
    errorLabel.style.transition = "all .5s ease-in-out";
    //to check if element is valid, just pass the element, not his value
    if(obj.checkValidity() && obj.value !== "") {
        obj.parentElement.setAttribute("id", "inputValid");
        errorLabel.style.visibility = "hidden";
        errorLabel.style.opacity = "0";
    } else {
        obj.parentElement.setAttribute("id", "inputInvalid");
        errorLabel.style.visibility = "visible";
        errorLabel.style.opacity = "1";
    }
}

/* === Tip percentage selection, validation === */
/* Percentage buttons */
const percentageElems = document.querySelectorAll(".tip_percentage");
for(const percentage of percentageElems) {
    percentage.style.transition = "all .5s ease-in-out";
    percentage.addEventListener("click", () => {
        changeStatus(percentage);
        checkIfEmpty();
    });
    percentage.addEventListener("mouseover", () => {
        percentage.style.filter = "saturate(.375) brightness(1.375)";
        
    });
    percentage.addEventListener("mouseout", () => {
        percentage.style.filter = "saturate(1) brightness(1)";
    });
}

let chosen;
function changeStatus(obj) {
    obj.setAttribute("id", "chosen");
    if(chosen === obj) {
        chosen = undefined;
        obj.setAttribute("id", "");
    } else if(chosen === undefined) {
        chosen = obj;
    } else {
        chosen.setAttribute("id", "");
        chosen = obj;
    }
}
/* Percentage custom input */
const customPerc = document.querySelector(".tip_custom");
customPerc.addEventListener("input", () => {
    checkCustomPerc(customPerc);
    checkIfEmpty();
});

function checkCustomPerc(obj) {
    obj.style.transition = "all .5s ease-in-out";
    //to check if element is valid, just pass the element, not his value
    if(obj.checkValidity() && obj.value !== "0" && obj.value !== "") {
        obj.setAttribute("id", "inputValid");
    } else if (obj.value === "") {
        obj.setAttribute("id", "");
    } else {
        obj.setAttribute("id", "inputInvalid");
    }
}

/* === Reset button === */
const resetBtn = document.querySelector(".reset");
/* Checking: bill input, numer of people input, buttons checked, custom input */
resetBtn.addEventListener("click", () => {
    for(const elem of inputElems) {
        elem.value = "";
        elem.parentElement.setAttribute("id", "");
    }
    for(const elem of percentageElems) {
        elem.setAttribute("id", "");
    }
    customPerc.value = "";
    customPerc.setAttribute("id", "");
    resetBtn.disabled = true;
});

function checkIfEmpty() {
    let isEmpty = true;
    for(const elem of inputElems) {
        if(elem.value !== "") {
            isEmpty = false;
        }
    }
    for(const elem of percentageElems) {
        if(elem.getAttribute("id") === "chosen") {
            isEmpty = false;
        }
    }
    if(customPerc.value !== "") {
        isEmpty = false;
    }
    if(isEmpty) {
        resetBtn.disabled = true;
    } else {
        resetBtn.disabled = false;
    }
}

resetBtn.addEventListener("mouseover", () => {
    resetBtn.style.filter = "saturate(.375) brightness(1.375)";
    
});
resetBtn.addEventListener("mouseout", () => {
    resetBtn.style.filter = "saturate(1) brightness(1)";
});

/* === Amounts === */
const amounts = document.querySelectorAll(".value_number");

function calculateAmounts() {
    const tipPerc = chosen.textContent.replace("%", "");
    const tipAmount = inputElems[0] / 100 * parseInt(tipPerc);
    if(tipAmount > 0) {
        amounts[0].textContent = tipAmount;
    }
}