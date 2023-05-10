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

/*
bill, custom and people patterns
Bill: decimal, not 0, not empty
Custom: int, from 1 to 100, not empty
People: int, not 0, not empty
*/

/* Variables */
let billAndPeople = document.querySelectorAll(".compile_input"); //bill and people inputs
const customTip = document.querySelector(".tip_custom"); //custom tip
const tipBtns = document.querySelectorAll(".tip_percentage"); //tip
const amountTip = document.querySelector(".tip_value .value_number"); //tip amount
const amountTot = document.querySelector(".total_value .value_number"); //total
const resetBtn = document.querySelector(".reset"); //reset

/* Events */
for(const input of billAndPeople) {
    input.addEventListener("input", checkInput);
}
customTip.addEventListener("input", checkInput);

customTip.addEventListener("input", resetButtons);
for(const btn of tipBtns) {
    btn.addEventListener("click", resetCustom);
}




/* Functions */
function checkInput() {
    const error = this.parentElement.parentElement.querySelector(".label_error");
    let cont = this.parentElement;
    if(!error) {
        cont = this;
    }
    if(this.value < 0) {
        this.setCustomValidity("must be greater than 0");
        cont.setAttribute("id", "error");
    } else if (this.value === "0") {
        cont.setAttribute("id", "error");
        if(error) {
            error.style.opacity = "1";
            error.style.visibility = "visible";
        }
    } else if (this.value === "") {
        this.setCustomValidity("compile this");
        cont.setAttribute("id", "");
        if(error) {
            error.style.opacity = "0";
            error.style.visibility = "hidden";
        }
    } else {
        this.setCustomValidity("");
        cont.setAttribute("id", "valid");  
        if(error) {
            error.style.opacity = "0";
            error.style.visibility = "hidden";
        }
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